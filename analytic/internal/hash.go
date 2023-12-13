package server

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
)

type hashHandler struct {
	keySha []byte
}

func NewHashHandler(key []byte) *hashHandler {
	return &hashHandler{keySha: key}
}

func (hh hashHandler) hashHandle(h http.Handler) http.Handler {
	hashFn := func(w http.ResponseWriter, r *http.Request) {
		if r.Header.Get("HashSHA256") == "" || hh.keySha == nil {
			h.ServeHTTP(w, r)
		} else {
			responseHashData := &responseHashData{}
			hw := hashResponseWriter{
				ResponseWriter: w, // incept original http.ResponseWriter
				responseData:   responseHashData,
			}
			h.ServeHTTP(&hw, r) //  http.ResponseWriter

			hash := hash(hw.responseData.body, hh.keySha)
			hashHex := hex.EncodeToString(hash)
			fmt.Println(hashHex)
			r.Header.Add("HashSHA256", hashHex)
		}
	}
	return http.HandlerFunc(hashFn)
}

type (
	responseHashData struct {
		body []byte
	}

	hashResponseWriter struct {
		http.ResponseWriter
		responseData *responseHashData
	}
)

func (s hashResponseWriter) Write(b []byte) (int, error) {
	size, err := s.ResponseWriter.Write(b)
	s.responseData.body = b
	return size, err
}

func hash(value, key []byte) []byte {

	h := hmac.New(sha256.New, key)
	h.Write(value)
	dst := h.Sum(nil)

	return dst
}
