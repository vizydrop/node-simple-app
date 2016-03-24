#!/usr/bin/env bash

case "$1" in
  run-server)
    pm2 start simple-custom-app.js --no-daemon --max-memory-restart 300M --name "node-simple-app"
    ;;

*)

    echo "Usage: manage.sh {run-server|run-server-watch}"
    exit 1
esac

exit 0
