#!/usr/bin/env bash

read -p 'New Branch Name:' newBranch

git switch -b $newBranch

git add .

git commit -m "Add local changes to new git branch"

git switch main

git clean -f

git switch $newBranch

git push
