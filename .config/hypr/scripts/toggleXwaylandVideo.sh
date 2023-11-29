#!/bin/bash

check_app=$(pidof xwaylandvideobridge)

if [[ $check_app == "" ]]; then
    xwaylandvideobridge &
    notify-send -a = "Xwayland Video Bridge" "Xwayland Video Bridge is On"
fi
if [[ $check_app != "" ]]; then
    killall xwaylandvideobridge
    notify-send -a = "Xwayland Video Bridge" "Xwayland Video Bridge is Off"
fi
