- Fix bug: When a CLIENT disconnects through /disconnect_User and reconnects, they aren't given control of their old Player back, and a new one is created instead.

- Fix bug: When a CLIENT disconnects through /disconnect_Player and reconnects, their Player is undefined although they can see it (but are unable to move it).

- When a Player is disconnected from the GameMap, the CLIENT isn't updated (use WS_msg_Player_Vanishing to fix this).


- Rename all the variables to something readable.


- Build a router.

- Build a test client.
