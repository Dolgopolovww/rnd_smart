// Server get, store and returns metric from agent.
package server

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/mailru/easyjson"

	"analytic/model"
)

// Router - struct for handlers, logging and work with service
type Router struct {
	Router  *chi.Mux //Router chi router
	service *ServerService
	logger  *Logger
}

// NewRouter - create router
func NewRouter(service *ServerService, logger *Logger) *Router {
	r := Router{service: service, logger: logger}
	r.Router = chi.NewRouter()

	r.Router.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	r.Router.Use(logger.LoggingHandle, gzipWriteHandle, gzipReadHandle)

	r.Router.Post("/report", r.ReportHandler())
	r.Router.Get("/reports", r.GetReportHandler())
	r.Router.Post("/reports", r.ReportsFromJSONHandler())
	r.Router.Post("/login", r.LoginHandler())
	r.Router.Get("/templates", r.TemplateHandler())
	r.Router.Get("/landings", r.GetLandings())
	r.Router.Post("/export", r.ExportReport())

	return &r
}

type LoginInfo struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// UpdateHandler - handler for update single metric
func (r *Router) LoginHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {

		res.Header().Set("Content-Type", "application/json")

		var li LoginInfo

		decoder := json.NewDecoder(req.Body)
		if err := decoder.Decode(&li); err != nil {
			log.Printf("Error decoding JSON: %s", err)
			http.Error(res, "Invalid JSON", http.StatusBadRequest)
			return
		}

		if li.Username == "admin" && li.Password == "admin" {
			responseData := map[string]interface{}{
				"success": true,
				"message": "Authentication successful",
			}

			jsonResponse, err := json.Marshal(responseData)
			if err != nil {
				log.Println(err)
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}

			res.WriteHeader(http.StatusOK)
			res.Write(jsonResponse)
			return
		} else {

			responseData := map[string]interface{}{
				"success": false,
				"message": "Invalid credentials",
			}

			jsonResponse, err := json.Marshal(responseData)
			if err != nil {
				log.Println(err)
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}

			res.WriteHeader(http.StatusUnauthorized)
			res.Write(jsonResponse)
		}

	}
}

type Template struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type TemplatesResponse struct {
	Templates []Template `json:"templates"`
}

func (r *Router) TemplateHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {

		templates := []Template{
			{ID: 1, Name: "Template 1"},
			{ID: 2, Name: "Template 2"},
		}

		responseData := TemplatesResponse{
			Templates: templates,
		}

		jsonResponse, err := json.Marshal(responseData)
		if err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}

		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)
		res.Write(jsonResponse)
	}
}

func (r *Router) ReportHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {

		var buf bytes.Buffer

		_, err := buf.ReadFrom(req.Body)
		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		report := model.ReportBK{}

		if err = easyjson.Unmarshal(buf.Bytes(), &report); err != nil {
			log.Println(err)
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		if report.Header.Landing == "" || report.Header.UserID == "" {
			res.WriteHeader(http.StatusBadRequest)
			return
		}

		err = r.service.addReport(report)
		if err != nil {
			res.WriteHeader(http.StatusInternalServerError)
			return
		}

		res.WriteHeader(http.StatusOK)
	}
}

func (r *Router) GetReportHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		reports, err := r.service.getReports()
		if err != nil {
			log.Println(err)
		}

		var jsonDataSlice []string

		for _, report := range reports {
			data, err := easyjson.Marshal(report)
			if err != nil {
				log.Println(err)
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}
			jsonDataSlice = append(jsonDataSlice, string(data))
		}

		jsonData := strings.Join(jsonDataSlice, ",")
		jsonData = fmt.Sprintf("[%s]", jsonData)
		log.Println(jsonData)

		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)
		res.Write([]byte(jsonData))

	}
}

func (r *Router) ReportsFromJSONHandler() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {

		var buf bytes.Buffer

		_, err := buf.ReadFrom(req.Body)
		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		form := model.FormData{}

		if err = json.Unmarshal(buf.Bytes(), &form); err != nil {
			log.Println(err)
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		reports, err := r.service.getReportsForm(form)
		if err != nil {
			log.Println(err)
		}

		var jsonDataSlice []string

		for _, report := range reports {
			data, err := easyjson.Marshal(report)
			if err != nil {
				log.Println(err)
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}
			jsonDataSlice = append(jsonDataSlice, string(data))
		}

		jsonData := strings.Join(jsonDataSlice, ",")
		jsonData = fmt.Sprintf("[%s]", jsonData)
		log.Println(jsonData)

		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)
		res.Write([]byte(jsonData))
	}
}

func (r *Router) GetLandings() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		landings, err := r.service.getLandings()
		if err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		responseData := model.LandingsResponse{
			Landings: landings,
		}

		jsonResponse, err := json.Marshal(responseData)
		if err != nil {
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}

		res.Header().Set("Content-Type", "application/json")
		res.WriteHeader(http.StatusOK)
		res.Write(jsonResponse)
	}
}

func (r *Router) ExportReport() http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		var buf bytes.Buffer

		_, err := buf.ReadFrom(req.Body)
		if err != nil {
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		form := model.FormData{}

		if err = json.Unmarshal(buf.Bytes(), &form); err != nil {
			log.Println(err)
			http.Error(res, err.Error(), http.StatusBadRequest)
			return
		}

		reports, err := r.service.getReportsForm(form)
		if err != nil {
			log.Println(err)
		}

		file, err := os.CreateTemp("", "exported-report-*.csv")
		if err != nil {
			log.Println(err)
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}
		defer os.Remove(file.Name())

		csvWriter := csv.NewWriter(file)

		header := []string{"ID", "Landing Name", "User ID", "Report Data", "Created At"}
		if err := csvWriter.Write(header); err != nil {
			log.Println(err)
			http.Error(res, err.Error(), http.StatusInternalServerError)
			return
		}

		for _, report := range reports {
			row := []string{
				strconv.Itoa(report.ID),
				report.Landing,
				report.UserID,
				report.Data,
				report.Time,
			}
			if err := csvWriter.Write(row); err != nil {
				log.Println(err)
				http.Error(res, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		csvWriter.Flush()
		file.Seek(0, 0)

		res.Header().Set("Content-Type", "text/csv")
		res.Header().Set("Content-Disposition", "attachment; filename=exported-report.csv")

		http.ServeContent(res, req, "exported-report.csv", time.Now(), file)
	}
}
