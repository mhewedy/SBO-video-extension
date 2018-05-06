#!/usr/bin/env bash

mkdir dist

zip SBO-video-extension.zip core docs lib main.js manifest.json
mv SBO-video-extension.zip dist/
