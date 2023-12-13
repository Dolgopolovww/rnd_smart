package server

import (
	"net/http"
	"time"

	"go.uber.org/zap"
)

type Logger struct {
	Sl     *zap.SugaredLogger
	Logger *zap.Logger
}

func GetLogger() *Logger {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}
	sl := logger.Sugar()
	return &Logger{Sl: sl, Logger: logger}
}

func (l *Logger) LoggingHandle(h http.Handler) http.Handler {
	logFn := func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		responseData := &responseData{
			status: 0,
			size:   0,
		}
		lw := loggingResponseWriter{
			ResponseWriter: w,
			responseData:   responseData,
		}
		h.ServeHTTP(&lw, r)

		duration := time.Since(start)

		l.Sl.Infoln(
			"URI", r.RequestURI,
			"method", r.Method,
			"status", responseData.status,
			"duration", duration,
			"size", responseData.size,
		)
	}
	return http.HandlerFunc(logFn)
}

type (
	responseData struct {
		status int
		size   int
	}

	loggingResponseWriter struct {
		http.ResponseWriter
		responseData *responseData
	}
)

func (r *loggingResponseWriter) Write(b []byte) (int, error) {
	size, err := r.ResponseWriter.Write(b)
	r.responseData.size += size
	return size, err
}

func (r *loggingResponseWriter) WriteHeader(statusCode int) {
	r.responseData.status = statusCode
	r.ResponseWriter.WriteHeader(statusCode)
}
