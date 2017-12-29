#!/bin/bash
gnome-terminal --window-with-profile=Luis -e "bash -c 'cd api-server;node server;bash script2.sh exec $SHELL'"
#cd api-server
#node server