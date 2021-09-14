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

type Todo struct {
	Id          string    `json:"id"`
	Priority    int       `json:"priority"`
	Description string    `json:"description"`
	Created     time.Time `json:"created"`
	Deadline    time.Time `json:"deadline"`
}
