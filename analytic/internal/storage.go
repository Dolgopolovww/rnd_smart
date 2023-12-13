package server

import (
	"analytic/model"
	"context"
	"fmt"
	"log"
	"strings"
	"sync"
	"time"

	"github.com/mailru/easyjson"
)

type Storage struct {
	gauge      map[string]float64
	counter    map[string]int64
	writeMutex sync.RWMutex
	db         *Database
	isDB       bool
}

func NewStorage(db *Database) *Storage {
	storage := new(Storage)
	storage.gauge = make(map[string]float64)
	storage.counter = make(map[string]int64)

	// DATABASE
	storage.db = db

	err := db.createTables()
	if err != nil {
		log.Println(err)
	}

	if err := db.ping(); err == nil {
		storage.isDB = true
	}

	storage.writeMutex = sync.RWMutex{}

	return storage
}

func (m *Storage) addReport(report model.ReportBK) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var jsonDataSlice []string

	for _, option := range report.Result {
		json, err := easyjson.Marshal(option)
		if err != nil {
			return err
		}
		jsonDataSlice = append(jsonDataSlice, string(json))
	}

	jsonData := strings.Join(jsonDataSlice, ",")
	jsonData = fmt.Sprintf("[%s]", jsonData)
	log.Println(jsonData)

	err := m.db.insertReport(ctx, report.Header.Landing, report.Header.UserID, jsonData)
	if err != nil {
		return err
	}

	return nil
}

func (m *Storage) getReports() ([]model.ReportOut, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	reports, err := m.db.selectAllReports(ctx)
	if err != nil {
		return nil, err
	}

	return reports, nil
}

func (m *Storage) getReportsForm(form model.FormData) ([]model.ReportOut, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	reports, err := m.db.selectReports(ctx, form)
	if err != nil {
		return nil, err
	}

	return reports, nil
}

func (m *Storage) getLandings() ([]model.Landing, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	lands, err := m.db.selectAllLandings(ctx)
	if err != nil {
		return nil, err
	}

	return lands, nil
}

func (m *Storage) pingDB() error {
	if err := m.db.ping(); err != nil {
		return err
	}
	return nil
}
