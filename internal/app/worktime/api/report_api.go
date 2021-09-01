package api

import (
	"strings"

	"github.com/maldan/gam-app-worktime/internal/app/worktime/core"
)

type ReportApi struct {
}

// Get by id
func (r ReportApi) GetSearch(args ArgsReportSearch) []core.Work {
	rr := WorkApi{}

	out := make([]core.Work, 0)
	for i := 0; i < 10000; i++ {
		fromDate := args.FromDate.AddDate(0, 0, i)
		if fromDate.Format("2006-01-02") == args.ToDate.Format("2006-01-02") {
			break
		}

		workList := rr.GetByDay(ArgsDate{Date: fromDate})
		for _, work := range workList {
			if args.Name != "" {
				if !strings.Contains(work.Name, args.Name) {
					continue
				}
			}
			if args.Description != "" {
				if !strings.Contains(work.Description, args.Description) {
					continue
				}
			}

			out = append(out, work)
		}
	}

	return out
}
