package server

import (
	"analytic/model"
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type Database struct {
	DB *sql.DB
}

func GetDB(dsn string) *Database {
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		fmt.Println(err)
	}
	database := &Database{DB: db}

	err = database.ping()
	if err != nil {
		fmt.Println(err)
	}
	return database
}

func (d *Database) createTables() error {
	query := `CREATE TABLE IF NOT EXISTS template_1 (
		id SERIAL PRIMARY KEY,
		landing_name VARCHAR(255) NOT NULL,
		user_id VARCHAR(255) NOT NULL,
		report_data JSONB NOT NULL,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
	)`

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	_, err := d.DB.ExecContext(ctx, query)
	if err != nil {
		log.Printf("Error %s when creating metrics table", err)
		return err
	}

	log.Println("table created")
	return nil
}

func (d *Database) ping() error {
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	if err := d.DB.PingContext(ctx); err != nil {
		fmt.Println(err)
		return err
	}
	return nil
}

func (d *Database) insertReport(ctx context.Context, landing, userId, data string) error {
	query := `
			INSERT INTO template_1(landing_name, user_id, report_data)
			VALUES ($1, $2, $3)`

	_, err := d.DB.ExecContext(ctx, query, landing, userId, data)
	if err != nil {
		log.Printf("Error %s when adding report", err)
		return err
	}
	return nil
}

func (d *Database) selectAllReports(ctx context.Context) ([]model.ReportOut, error) {
	var reports []model.ReportOut

	rows, err := d.DB.QueryContext(ctx, "SELECT id, landing_name, user_id, report_data, created_at FROM template_1")
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var report model.ReportOut
		err := rows.Scan(&report.ID, &report.Landing, &report.UserID, &report.Data, &report.Time)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		reports = append(reports, report)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		return nil, err
	}

	return reports, nil
}

func (d *Database) selectReports(ctx context.Context, form model.FormData) ([]model.ReportOut, error) {
	var reports []model.ReportOut

	if form.StartTime.IsZero() || form.EndTime.IsZero() {
		form.StartTime = time.Now().AddDate(0, 0, -7)
		form.EndTime = time.Now()
	}

	query := "SELECT id, landing_name, user_id, report_data, created_at FROM template_1 WHERE created_at BETWEEN $1 AND $2"

	var rows *sql.Rows
	var err error

	if form.Landing != "" {
		query += " AND landing_name = $3"
		rows, err = d.DB.QueryContext(ctx, query, form.StartTime, form.EndTime, form.Landing)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		defer rows.Close()
	} else {
		rows, err = d.DB.QueryContext(ctx, query, form.StartTime, form.EndTime)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		defer rows.Close()
	}

	for rows.Next() {
		var report model.ReportOut
		err := rows.Scan(&report.ID, &report.Landing, &report.UserID, &report.Data, &report.Time)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		reports = append(reports, report)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		return nil, err
	}

	return reports, nil
}

func (d *Database) selectAllLandings(ctx context.Context) ([]model.Landing, error) {
	var lands []model.Landing

	rows, err := d.DB.QueryContext(ctx, "SELECT DISTINCT landing_name FROM template_1")
	if err != nil {
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var land model.Landing
		err := rows.Scan(&land.Name)
		if err != nil {
			log.Println(err)
			return nil, err
		}
		lands = append(lands, land)
	}

	if err := rows.Err(); err != nil {
		log.Println(err)
		return nil, err
	}

	return lands, nil
}
