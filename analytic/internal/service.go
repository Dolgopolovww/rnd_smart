package server

import (
	"analytic/model"
)

type ServerService struct {
	storage *Storage
}

func NewServerService(storage *Storage) *ServerService {

	service := &ServerService{storage: storage}
	return service
}

func (s *ServerService) pingDB() error {
	err := s.storage.pingDB()
	if err != nil {
		return err
	}
	return nil
}

func (s ServerService) addReport(rep model.ReportBK) error {

	err := s.storage.addReport(rep)
	if err != nil {
		return err
	}
	return nil
}

func (s ServerService) getReports() ([]model.ReportOut, error) {

	reports, err := s.storage.getReports()
	if err != nil {
		return nil, err
	}
	return reports, nil
}

func (s ServerService) getLandings() ([]model.Landing, error) {

	lands, err := s.storage.getLandings()
	if err != nil {
		return nil, err
	}

	return lands, nil
}

func (s ServerService) getReportsForm(data model.FormData) ([]model.ReportOut, error) {

	reports, err := s.storage.getReportsForm(data)
	if err != nil {
		return nil, err
	}
	return reports, nil
}
