#!/usr/bin/env bash

echo "Provisioning vm in Vagrantfile included script"
set PROJECT_DIR = "/var/www/snails/"

echo "running apt update"
apt-get update && apt-get install -y
apt-get install apt-utils -y

echo "installing build essential, curl, vim, ag etc"
apt-get install build-essential vim curl silversearcher-ag -y > /dev/null

echo "installing git"
apt-get install git -y > /dev/null

echo "installing node"
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get install nodejs -y

echo "running node -v"
node -v
echo "running npm -v"
npm -v

echo "Installing modules in packages.json"
echo "installing without --no-bin-links option so install as admin and change back afterwards"
npm install
npm update
echo "running npm outdated"
npm outdated

echo "set host ip address to snails.app 192.168.34.34 snails.app:3000"
echo "192.168.34.34    snails.app" >> /etc/hosts





