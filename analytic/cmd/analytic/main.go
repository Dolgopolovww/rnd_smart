package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	server "analytic/internal"
)

var options struct {
	flagRunAddr     string
	flagDatabaseDsn string
}

func main() {
	l := server.GetLogger()
	defer l.Logger.Sync()

	parseFlags()

	db := server.GetDB(options.flagDatabaseDsn)
	defer db.DB.Close()

	storage := server.NewStorage(db)
	service := server.NewServerService(storage)
	r := server.NewRouter(service, l)

	l.Sl.Infow(
		"Starting server",
		"addr", options.flagRunAddr,
	)

	err := http.ListenAndServe(options.flagRunAddr, r.Router)
	if err != nil {
		panic(err)
	}
}

func parseFlags() {
	flag.StringVar(&options.flagRunAddr, "a", ":8084", "address and port to run server")
	// flag.StringVar(&options.flagDatabaseDsn, "d", "postgres://postgres:postgres@localhost:5432/analytics?sslmode=disable", "database dsn")
	flag.StringVar(&options.flagDatabaseDsn, "d", "postgres://temp_engine:Suwn38dW2idml@database:5432/temp_engine?sslmode=disable", "database dsn")

	flag.Parse()
	if envRunAddr := os.Getenv("ADDRESS"); envRunAddr != "" {
		options.flagRunAddr = envRunAddr
	}
	if envDatabaseDsn := os.Getenv("DATABASE_DSN"); envDatabaseDsn != "" {
		log.Println(envDatabaseDsn)
		options.flagDatabaseDsn = envDatabaseDsn
	}
}
