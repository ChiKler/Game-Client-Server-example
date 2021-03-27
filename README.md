# Deno-Game-Client-Server-example

The main purpose of this example is to illustrate a possible bug there is with the WebSocket object in the standard Deno library (work in progress).

## How to replicate the supposed bug:

1. Connect to https://localhost:3000/
2. Select any of the names in the prompt and press accept
3. Open a new tab in the same adress
4. Select any other name but the one you have previously chosen
5. The bug is replicated (sometimes it doesn't work, other times it gives a different error)
