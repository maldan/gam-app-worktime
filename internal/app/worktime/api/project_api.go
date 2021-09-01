package api

import (
	"github.com/maldan/gam-app-worktime/internal/app/worktime/core"
	"github.com/maldan/go-cmhp/cmhp_crypto"
	"github.com/maldan/go-cmhp/cmhp_file"
	"github.com/maldan/go-restserver"
)

type ProjectApi struct {
}

// Get list
func (r ProjectApi) GetList(args ArgsEmpty) []core.Project {
	out := make([]core.Project, 0)
	list, _ := cmhp_file.List(core.DataDir + "/project")
	for _, file := range list {
		project := core.Project{}
		err := cmhp_file.ReadJSON(core.DataDir+"/project/"+file.Name(), &project)
		if err == nil {
			out = append(out, project)
		}
	}
	return out
}

// Get project by id
func (r ProjectApi) GetIndex(args core.Project) core.Project {
	// Get file
	var item core.Project
	err := cmhp_file.ReadJSON(core.DataDir+"/project/"+args.Id+".json", &item)
	if err != nil {
		restserver.Fatal(500, restserver.ErrorType.NotFound, "id", "Project not found!")
	}

	return item
}

// Add new project
func (r ProjectApi) PostIndex(args core.Project) {
	// Set new project id
	args.Id = cmhp_crypto.UID(8)

	// Save project
	cmhp_file.WriteJSON(core.DataDir+"/project/"+args.Id+".json", &args)
}

// Update project
func (r ProjectApi) PatchIndex(args core.Project) {
	// Save project
	cmhp_file.WriteJSON(core.DataDir+"/project/"+args.Id+".json", &args)
}

// Delete project
func (r ProjectApi) DeleteIndex(args core.Work) {
	// Delete task file
	cmhp_file.Delete(core.DataDir + "/project/" + args.Id + ".json")
}
