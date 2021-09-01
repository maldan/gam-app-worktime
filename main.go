package main

import (
	"embed"

	helloworld "github.com/maldan/gam-app-worktime/internal/app/worktime"
)

//go:embed frontend/build/*
var frontFs embed.FS

func main() {
	helloworld.Start(frontFs) //
}
