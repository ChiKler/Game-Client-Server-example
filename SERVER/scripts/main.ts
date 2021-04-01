// @ts-ignore
import { GameMap, GameMap_ID } from "../../ENGINE-SERVER/mod.ts";

// @ts-ignore
import { User } from "./User.ts";

import {
  serve,
  ServerRequest,
  // @ts-ignore
} from "https://deno.land/std@0.91.0/http/server.ts";
// @ts-ignore
import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";

import {
  acceptable,
  acceptWebSocket,
  WebSocket,
  // @ts-ignore
} from "https://deno.land/std@0.91.0/ws/mod.ts";

const g__Users = new Map<string, User>();

const g__GameMaps = new Map<GameMap_ID, GameMap>();

const g__server = serve({ port: 3000 });
const g__server__isRunning = true;

async function g__server__handle_requests() {
  const handle_req__connect_user = async (
    req: ServerRequest,
    uuID: string,
  ) => {
    const l__User__connect_user__ReVa = await User.connect_user(
      g__Users,
      uuID,
    );

    console.info(
      `Connection attempt: {\n  uuID: ${uuID},\n  l__User__connect_user__ReVa: {\n    status: ${l__User__connect_user__ReVa.status}\n    status_message: ${l__User__connect_user__ReVa.status_message}\n    wasUserAlreadyConnected: ${l__User__connect_user__ReVa.wasUserAlreadyConnected}\n  }\n}`,
    );

    req.respond({
      status: l__User__connect_user__ReVa.status,
      body: JSON.stringify({
        status_message: l__User__connect_user__ReVa.status_message,
      }),
    });
  };
  const handle_req__ws_player__set = async (
    req: ServerRequest,
    uuID: string,
  ) => {
    if (acceptable(req)) {
      const ws_player__new = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      });

      if (g__Users.get(uuID) != undefined) {
        g__Users.get(uuID)!.ws_player = ws_player__new;
      }
    }
  };
  const handle_req__connect_player = async (
    req: ServerRequest,
    uuID: string,
  ) => {
    const l__User__connect_player__ReVa = await User.connect_player(
      g__GameMaps,
      GameMap_ID.Sandbox,
      g__Users,
      uuID,
    );

    console.info(
      `Connection attempt: {\n  uuID: ${uuID},\n  l__User__connect_player__ReVa: {\n    status: ${l__User__connect_player__ReVa.status}\n    status_message: ${l__User__connect_player__ReVa.status_message}\n  }\n}`,
    );

    req.respond({
      status: l__User__connect_player__ReVa.status,
      body: JSON.stringify({
        status_message: l__User__connect_player__ReVa.status_message,
      }),
    });
  };

  const handle_req__GET__file = async (
    req: ServerRequest,
    content_type: string,
    file_path: string,
  ): Promise<void> => {
    const headers = new Headers();
    headers.set("Content-Type", content_type);
    req.respond({
      status: Status.OK,
      headers,
      // @ts-ignore
      body: await Deno.open(file_path),
    });
  };
  // @ts-ignore
  for await (const req: ServerRequest of g__server) {
    if (!g__server__isRunning) break;

    if (req.url === "/connect_user?uuID=Jane") {
      handle_req__connect_user(req, "Jane");
    } else if (req.url === "/connect_user?uuID=John") {
      handle_req__connect_user(req, "John");
    } else if (req.url === "/connect_user?uuID=Mary") {
      handle_req__connect_user(req, "Mary");
    } else if (req.url === "/ws_player__set?uuID=Jane") {
      handle_req__ws_player__set(req, "Jane");
    } else if (req.url === "/ws_player__set?uuID=John") {
      handle_req__ws_player__set(req, "John");
    } else if (req.url === "/ws_player__set?uuID=Mary") {
      handle_req__ws_player__set(req, "Mary");
    } else if (req.url === "/connect_player?uuID=Jane") {
      handle_req__connect_player(req, "Jane");
    } else if (req.url === "/connect_player?uuID=John") {
      handle_req__connect_player(req, "John");
    } else if (req.url === "/connect_player?uuID=Mary") {
      handle_req__connect_player(req, "Mary");
    } else if (req.method === "GET" && req.url === "/") {
      handle_req__GET__file(
        req,
        "text/html",
        "../CLIENT/index.html",
      );
    } else if (req.method === "GET" && req.url === "/css/main.css") {
      handle_req__GET__file(
        req,
        "text/css",
        "../CLIENT/css/main.css",
      );
    } else if (req.method === "GET" && req.url === "/scripts/canvas.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/canvas.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/init.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/init.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/main.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/main.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/mod.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/mod.js",
      );
    } else if (req.method === "GET" && req.url === "/scripts/websockets.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/websockets.js",
      );
    } else if (
      req.method === "GET" && req.url === "/ENGINE-CLIENT/GameEntity.js"
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameEntity.js",
      );
    } else if (
      req.method === "GET" && req.url === "/ENGINE-CLIENT/GameMap.js"
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameMap.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE-CLIENT/Player.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Player.js",
      );
    } else if (req.method === "GET" && req.url === "/ENGINE-CLIENT/mod.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/mod.js",
      );
    } else if (req.method === "GET" && req.url === "/vendor/utility/mod.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/mod.js",
      );
    } else if (req.method === "GET" && req.url === "/vendor/utility/Mutex.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/Mutex.js",
      );
    } else if (req.method === "GET" && req.url === "/vendor/utility/sleep.js") {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/sleep.js",
      );
    } else if (
      req.method === "GET" && req.url === "/vendor/utility/time_stamp.js"
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/time_stamp.js",
      );
    } else {
      req.respond({
        status: Status.NotFound,
        body: JSON.stringify({ status_message: "Request Not Found" }),
      });
    }
  }
}

// @ts-ignore
await Promise.all([
  g__server__handle_requests(),
  GameMap.g__GameMaps__handler(g__GameMaps, g__server__isRunning),
]);
