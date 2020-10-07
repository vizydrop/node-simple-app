#!/usr/bin/env bash

case "$1" in
  run-server)
    exec node ./simple-custom-app.js
    ;;

  run-fake-auth-server)
    exec node ./fake-auth-app/index.js
    ;;

    run-sync-data-server)
    exec node ./sync-data-app/index.js
    ;;

  *)

    echo "Usage: manage.sh {run-server|run-fake-auth-server|run-sync-data-server}"
    exit 1
esac

exit 0
