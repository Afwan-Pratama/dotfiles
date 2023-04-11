#!/bin/bash

case $1 in

  "userPfp")
    iconPath="/var/lib/AccountsService/icons/$USER"

    userIconPath="$HOME/.config/awesome/src/assets/userpfp/"

    if [[ -f "$userIconPath" ]];
    then
        if [[ -f "$iconPath" ]];
        then
            if ! cmp --silent "$userIconPath.jpg" "$iconPath";
            then
                cp "$iconPath" "$userIconPath$USER.jpg"
            fi
            printf "$userIconPath.jpg"
        else
            printf "$userIconPath.jpg"
        fi
        exit;
    else
        if [[ -f "$iconPath" ]];
        then
            cp "$iconPath" "$userIconPath$USER.jpg"
            printf "$userIconPath$USER.jpg"
            exit;
        fi
    fi
  ;;

  "userName")
    fullname="$(getent passwd `whoami` | cut -d ':' -f 5)"
    user="$(whoami)"
    host="$(hostname)"
    if [[ "$2" == "userhost" ]];
    then
        printf "$user@$host"
    elif [[ "$2" == "fullname" ]];
    then
        printf "$fullname"
    else
        printf "Rick Astley"
    fi
  ;;

esac
