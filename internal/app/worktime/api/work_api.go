package api

import (
	"sort"
	"time"

	"github.com/maldan/gam-app-worktime/internal/app/worktime/core"
	"github.com/maldan/go-cmhp/cmhp_crypto"
	"github.com/maldan/go-cmhp/cmhp_file"
	"github.com/maldan/go-cmhp/cmhp_time"
	"github.com/maldan/go-restserver"
)

type WorkApi struct {
}

// Add new task
func (r WorkApi) PostIndex(args core.Work) {
	// Set new task id
	args.Id = cmhp_crypto.UID(8)

	// Save task
	cmhp_file.WriteJSON(core.DataDir+"/work/item/"+args.Id+".json", &args)

	// Save id list
	var idList = make([]string, 0)
	cmhp_file.ReadJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(args.Start, "YYYY-MM-DD")+".json", &idList)
	idList = append(idList, args.Id)
	cmhp_file.WriteJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(args.Start, "YYYY-MM-DD")+".json", &idList)
}

// Get by id
func (r WorkApi) GetByDay(args ArgsDate) []core.Work {
	var idList = make([]string, 0)
	cmhp_file.ReadJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(args.Date, "YYYY-MM-DD")+".json", &idList)

	out := make([]core.Work, 0)
	for _, id := range idList {
		task := core.Work{}
		err := cmhp_file.ReadJSON(core.DataDir+"/work/item/"+id+".json", &task)
		if err == nil {
			out = append(out, task)
		}
	}

	// Sort items by date
	sort.SliceStable(out, func(i, j int) bool {
		return out[i].Start.Unix() < out[j].Start.Unix()
	})

	return out
}

// Get by id
func (r WorkApi) GetTotalHourByDay(args ArgsDate) int64 {
	list := r.GetByDay(args)
	var out int64
	for _, task := range list {
		out += task.Stop.Unix() - task.Start.Unix()
	}
	return out
}

// Get year calory stat
func (f WorkApi) GetYearMap(args ArgsDate) map[string]interface{} {
	out := map[string]interface{}{}
	t1 := time.Date(args.Date.Year(), time.January, 1, 0, 0, 0, 0, time.UTC)

	for i := 0; i < 366; i++ {
		t2 := t1.AddDate(0, 0, i)
		out[cmhp_time.Format(t2, "YYYY-MM-DD")] = f.GetTotalHourByDay(ArgsDate{Date: t2})
	}

	return out
}

// Get by id
func (r WorkApi) GetIndex(args core.Work) core.Work {
	// Get file
	var item core.Work
	err := cmhp_file.ReadJSON(core.DataDir+"/work/item/"+args.Id+".json", &item)
	if err != nil {
		restserver.Fatal(500, restserver.ErrorType.NotFound, "id", "Task not found!")
	}

	return item
}

// Delete
func (r WorkApi) DeleteIndex(args core.Work) {
	// Get task
	item := r.GetIndex(args)

	// Read stat
	var idList = make([]string, 0)
	cmhp_file.ReadJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(item.Start, "YYYY-MM-DD")+".json", &idList)

	// Filter task list
	var outList = make([]string, 0)
	for _, id := range idList {
		if id == item.Id {
			continue
		}
		outList = append(outList, id)
	}

	// Save stat
	cmhp_file.WriteJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(item.Start, "YYYY-MM-DD")+".json", &outList)

	// Delete task file
	cmhp_file.Delete(core.DataDir + "/work/item/" + args.Id + ".json")
}

// Update
func (r WorkApi) PatchIndex(args core.Work) {
	// Delete previous item
	r.DeleteIndex(args)

	// Save new task
	cmhp_file.WriteJSON(core.DataDir+"/work/item/"+args.Id+".json", &args)

	// Save id list
	var idList = make([]string, 0)
	cmhp_file.ReadJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(args.Start, "YYYY-MM-DD")+".json", &idList)
	idList = append(idList, args.Id)
	cmhp_file.WriteJSON(core.DataDir+"/work/stat/"+cmhp_time.Format(args.Start, "YYYY-MM-DD")+".json", &idList)
}
