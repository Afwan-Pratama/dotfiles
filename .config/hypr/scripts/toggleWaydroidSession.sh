#!/bin/bash
checkWaydroidSession=$(pidof lxc-start)

if [[ $checkWaydroidSession != "" ]]; then
    waydroid session stop &
    notify-send -a = "Waydroid" "Waydroid Session is Stopped"
    exit
fi

waydroid session start &
notify-send -a = "Waydroid" "Waydroid session is Start"
