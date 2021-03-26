@ECHO OFF


deno fmt folder ../

deno run --allow-net --allow-read ./scripts/main.ts


PAUSE