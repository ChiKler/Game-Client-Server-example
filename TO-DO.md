- Fix bug: When a player is already in the GameMap and relogs, they don't
  receive websocket messages. This also happens after they get disconnected and reconnect.
  
- Fix bug: requesting "/disconnect_user" after "/connect_user" returns { status_message: "the user wasn't connected" }.


- Use URLSearchParams
