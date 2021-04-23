- Fix bug: WS_msg.send() doesn't seem to work at "CLIENT/scripts/websockets.js".

- Fix bug: Connection is too slow since commit
  "91e84a4df6d8719f3e7358832390c776d9d20249".

- Fix bug: The request "/ws_player__set?uuID=" gets processed or requested after
  "/connect_player?uuID=" for an unknown reason, causing the CLIENT to request
  both of them one additional time.

- Build a router.

- Build a test client.
