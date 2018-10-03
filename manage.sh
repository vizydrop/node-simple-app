#!/usr/bin/env bash

case "$1" in
  run-server)
    pm2 start simple-custom-app.js --no-daemon --max-memory-restart 300M --name "node-simple-app"
    ;;

  run-fake-auth-server)
    pm2 start fake-auth-app.js --no-daemon --max-memory-restart 300M --name "fake-auth-app"
    ;;

  *)

    echo "Usage: manage.sh {run-server|run-fake-auth-server}"
    exit 1
esac

exit 0
