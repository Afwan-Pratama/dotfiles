#!/bin/bash
checkWaydroidSession=$(pidof lxc-start)

if [[ $checkWaydroidSession != "" ]]; then
    waydroid show-full-ui
    exit
fi

notify-send -a = "Waydroid" "Waydroid session is not started"
