- Fix bug: when a player reconnects, g__GameMap is not defined at
  "/ENGINE-CLIENT/WS_msg_Player.js:80".

- Fix bug: "/ws_player__set?uuID=" gets requested one extra time after the
  Player has been connected.

- Build a test client.
