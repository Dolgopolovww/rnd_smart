package model

import "time"

type ReportHeader struct {
	Landing string `json:"landing"`
	UserID  string `json:"user_id"`
}

type ReportBK struct {
	Header ReportHeader `json:"header"`
	Result []OptionBK   `json:"result"`
}

type OptionBK struct {
	ID   int    `json:"id"`
	Text string `json:"text"`
}

type ReportOut struct {
	ID      int    `json:"id"`
	Landing string `json:"landing_name"`
	UserID  string `json:"user_id"`
	Data    string `json:"report_data"`
	Time    string `json:"created_at"`
}

type Landing struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type LandingsResponse struct {
	Landings []Landing `json:"landings"`
}

type FormData struct {
	StartTime time.Time `json:"fromTime"`
	EndTime   time.Time `json:"toTime"`
	Landing   string    `json:"landingFilter"`
}
