#!/usr/bin/env -S bash

echo "Installing cachyos repo"
curl https://mirror.cachyos.org/cachyos-repo.tar.xz -o cachyos-repo.tar.xz &&
tar xvf cachyos-repo.tar.xz && cd cachyos-repo &&
sudo ./cachyos-repo.sh --remove && cd &&

echo "Installing chaotic aur"
sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com &&
sudo pacman-key --lsign-key 3056513887B78AEB &&

sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst' &&
sudo pacman -U 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst' &&

sudo echo "[chaotic-aur] 
Include = /etc/pacman.d/chaotic-mirrorlist" >> test.sh &&

sudo pacman -Syu &&

echo "Install"
yay -S quickshell gpu-screen-recorder brightnessctl ddcutil cliphist matugen-git cava wlsunset xdg-desktop-portal python3 evolution-data-server
