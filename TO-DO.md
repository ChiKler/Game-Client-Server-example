* Fix bug: Server blocks while requestg /disconnect_user (because GameMap.disconnect_player has a while loop). This shouldn't block the server execution.

* allow players to disconnect

* solve bug: when a player is already in the GameMap and relogs, they don't receive the connection message on the client

* Prevent user from being disconnected while their player is in the process of being connected (could use a custom mutex of some sort)
