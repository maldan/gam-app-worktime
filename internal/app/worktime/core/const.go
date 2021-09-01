package core

import "time"

var DataDir = ""

type Work struct {
	Id          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Start       time.Time `json:"start"`
	Stop        time.Time `json:"stop"`
}

type Project struct {
	Id           string    `json:"id"`
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	PricePerHour int       `json:"pricePerHour"`
	Created      time.Time `json:"created"`
}
