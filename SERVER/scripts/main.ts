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

async function g__server__handle_requests() {
  const handle_user_connection = async (
    uuID: string,
    player_ws__new: WebSocket,
  ) => {
    const l__User__connect__ReVa = await User.connect(
      g__GameMaps,
      GameMap_ID.Sandbox,
      g__Users,
      uuID,
      player_ws__new,
    );

    console.log(
      `Connection attempt: {\n  uuID: ${uuID},\n  l__User__connect__ReVa: {\n    status: ${l__User__connect__ReVa.status}\n    wasUserAlreadyConnected: ${l__User__connect__ReVa.wasUserAlreadyConnected}\n    player_ws__old: ${l__User__connect__ReVa.player_ws__old}\n  }\n}`,
    );
  };

  const handle_get_file_request = async (
    req: ServerRequest,
    content_type: string,
    file_path: string,
  ): Promise<void> => {
    const headers = new Headers();
    headers.set("Content-Type", content_type);
    req.respond({
      status: 200,
      headers,
      body: await Deno.open(file_path),
    });
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
      handle_get_file_request(
        req,
        "text/html",
        "../CLIENT/index.html",
      );
    } else if (req.method === "GET" && req.url === "/css/main.css") {
      handle_get_file_request(
        req,
        "text/css",
        "../CLIENT/css/main.css",
      );
    } else if (req.method === "GET" && req.url === "/scripts/canvas.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../CLIENT/scripts/canvas.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/init.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../CLIENT/scripts/init.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/main.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../CLIENT/scripts/main.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/mod.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../CLIENT/scripts/mod.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/websockets.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../CLIENT/scripts/websockets.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE/GameEntity.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../ENGINE/GameEntity.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE/GameMap.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../ENGINE/GameMap.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE/Player.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../ENGINE/Player.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE/mod.js") {
      handle_get_file_request(
        req,
        "text/javascript",
        "../ENGINE/mod.js",
      );
    } else {
      req.respond({
        status: Status.NotFound,
        body: JSON.stringify({ message: "Error 404 (Request Not Found)" }),
      });
    }
  }
}

await Promise.all([
  g__server__handle_requests(),
  GameMap.g__GameMaps__handler(g__GameMaps, g__server__isRunning),
  // @ts-ignore
  g__GameMaps.get(GameMap_ID.Sandbox).run(),
]);
