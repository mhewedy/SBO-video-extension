#!/usr/bin/env bash

mkdir -p dist

rm -rf dist/*

zip SBO-video-extension.zip core/* lib/* main.js manifest.json
mv SBO-video-extension.zip dist/
