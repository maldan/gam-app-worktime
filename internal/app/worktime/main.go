package worktime

import (
	"embed"
	"flag"
	"fmt"

	"github.com/maldan/gam-app-worktime/internal/app/worktime/api"
	"github.com/maldan/gam-app-worktime/internal/app/worktime/core"
	"github.com/maldan/go-restserver"
)

func Start(frontFs embed.FS) {
	// Server
	var host = flag.String("host", "127.0.0.1", "Server Hostname")
	var port = flag.Int("port", 16000, "Server Port")
	_ = flag.Int("clientPort", 8080, "Client Port")

	// Data
	var dataDir = flag.String("dataDir", "db", "Data Directory")
	_ = flag.String("appId", "id", "App id")
	flag.Parse()

	// Set
	core.DataDir = *dataDir

	/*m := make([]core.Work, 0)
	cmhp_file.ReadJSON("./work.json", &m)
	fff := api.WorkApi{}
	for _, xx := range m {
		loc, _ := time.LoadLocation("Europe/Moscow")
		xx.Start = xx.Start.In(loc)
		xx.Stop = xx.Stop.In(loc)
		fff.PostIndex(xx)
	}
	fmt.Println(2)*/

	// Init server
	restserver.Start(fmt.Sprintf("%s:%d", *host, *port), map[string]interface{}{
		"/": restserver.VirtualFs{Root: "frontend/build/", Fs: frontFs},
		"/api": map[string]interface{}{
			"work":   api.WorkApi{},
			"report": api.ReportApi{},
		},
	})
}
