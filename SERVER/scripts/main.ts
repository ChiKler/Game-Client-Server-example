import { GameMap, GameMap_ID } from "../../ENGINE/GameMap.ts";

import { User } from "./User.ts";

import {
  serve,
  ServerRequest,
} from "https://deno.land/std@0.91.0/http/server.ts";
import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";

import {
  acceptable,
  acceptWebSocket,
  WebSocket,
} from "https://deno.land/std@0.91.0/ws/mod.ts";

const g__Users = new Map<string, User>();

const g__GameMaps = new Map<GameMap_ID, GameMap>();

const g__server = serve({ port: 3000 });
const g__server__isRunning = true;

async function handle_requests() {
  const handle_user_connection = (uuID: string, player_ws__new: WebSocket) => {
    const l__User__connect__ReVa = User.connect(
      g__GameMaps,
      GameMap_ID.Sandbox,
      g__Users,
      uuID,
      player_ws__new,
    );

    console.log(
      `Connection attempt: {\n  uuID: ${uuID},\n  l__User__connect__ReVa: {\n    ${l__User__connect__ReVa.status}\n    ${l__User__connect__ReVa.wasUserAlreadyConnected}\n    ${l__User__connect__ReVa.player_ws__old}\n  }\n}`,
    );
  };

  // @ts-ignore
  for await (const req: ServerRequest of g__server) {
    if (!g__server__isRunning) break;

    if (req.url === "/ws?uuID=Jane") {
      if (acceptable(req)) {
        handle_user_connection(
          "Jane",
          await acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers,
          }),
        );
      }
    } else if (req.url === "/ws?uuID=John") {
      if (acceptable(req)) {
        handle_user_connection(
          "John",
          await acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers,
          }),
        );
      }
    } else if (req.url === "/ws?uuID=Mary") {
      if (acceptable(req)) {
        handle_user_connection(
          "Mary",
          await acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers,
          }),
        );
      }
    } else if (req.method === "GET" && req.url === "/") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/html");
      req.respond({
        status: 200,
        body: await Deno.open("../CLIENT/index.html"),
      });
    } else if (req.method === "GET" && req.url === "/css/main.css") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/css");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/css/main.css"),
      });
    } else if (req.method === "GET" && req.url === "/scripts/canvas.js") {
      const headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/scripts/canvas.js"),
      });
    } else if (req.method === "GET" && req.url === "/scripts/init.js") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/scripts/init.js"),
      });
    } else if (req.method === "GET" && req.url === "/scripts/main.js") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/scripts/main.js"),
      });
    } else if (req.method === "GET" && req.url === "/scripts/mod.js") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/scripts/mod.js"),
      });
    } else if (req.method === "GET" && req.url === "/scripts/websockets.js") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../CLIENT/scripts/websockets.js"),
      });
    } else if (req.method === "GET" && req.url === "/ENGINE/Player.js") {
      const headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../ENGINE/Player.js"),
      });
    } else if (req.method === "GET" && req.url === "/ENGINE/GameMap.js") {
      const headers: Headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../ENGINE/GameMap.js"),
      });
    } else if (req.method === "GET" && req.url === "/ENGINE/mod.js") {
      const headers = new Headers();
      headers.set("Content-Type", "text/javascript");
      req.respond({
        status: 200,
        headers,
        body: await Deno.open("../ENGINE/mod.js"),
      });
    } else {
      req.respond({
        status: Status.NotFound,
        body: JSON.stringify({ message: "Error 404 (Request Not Found)" }),
      });
    }
  }
}

await Promise.all([
  handle_requests(),
  GameMap.g__GameMaps__handler(g__GameMaps, g__server__isRunning),
  // @ts-ignore
  g__GameMaps.get(GameMap_ID.Sandbox).run(),
]);
