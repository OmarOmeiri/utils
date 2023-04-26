#!/bin/env bash
pkgs=("$@")

PKGS="github:LulloIO/lullo-common-types
github:omaromeiri/devlogger"

function updt() {
  # chmod +x "$SCRIPT_DIR/*.txt"
  local IFS=$'\n'
  local lines=($1)
  local i
  for (( i=0; i<${#lines[@]}; i++ )) ; do
    name="$(echo ${lines[$i]} | sed 's/.*\///')"
    echo -e "\e[35mInstalling: $name"
    npm uninstall "$name"
    npm i "${lines[$i]}"
  done
}

function getPkgByName() {
  name="$1"
  IFS=$'\n';
  a=($(printf '%s\n' "${PKGS[@]}" |sed '/'"$name"'/!d'))
  echo "$a"
}

if [ "${#pkgs[@]}" -eq 0 ]; then
  updt "$PKGS"
else
  for (( i=0; i<${#pkgs[@]}; i++ )) ; do
    pkg="$(getPkgByName "${pkgs[$i]}")"
    if [ ! -z "$pkg" ]; then
      updt "$pkg"
    else
      echo -e "\e[31m[ERROR]\e[35m: No package ${pkgs[$i]} found.\e[0m"
    fi
  done
fi