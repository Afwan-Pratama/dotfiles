#!/bin/bash
PID_MPVPAPER=$(pidof mpvpaper)

if [[ $PID_MPVPAPER != "" ]]; then
    pkill mpvpaper
    hyprpaper &
    notify-send -a = "Toggle Wallpaper" "Change wallpaper to Hyprpaper"
fi
if [[ $PID_MPVPAPER == "" ]]; then
    pkill hyprpaper
    mpvpaper -o "no-audio loop" HDMI-A-1 ~/.config/hypr/wallpaper/wallpaper.mp4 &
    notify-send -a = "Toggle Wallpaper" "Change wallpaper to Mpvpaper"
fi
