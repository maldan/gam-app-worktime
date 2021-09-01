package api

import "time"

type ArgsEmpty struct {
}

type ArgsDate struct {
	Date time.Time `json:"date"`
}

type ArgsDeleteTask struct {
	TaskId string    `json:"taskId"`
	Date   time.Time `json:"date"`
}

type ArgsReportSearch struct {
	Name        string    `json:"name"`
	Description string    `json:"description"`
	FromDate    time.Time `json:"fromDate"`
	ToDate      time.Time `json:"toDate"`
}
