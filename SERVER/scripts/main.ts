// @ts-ignore
import { GameMap, GameMap__ID } from "../../ENGINE-SERVER/mod.ts";

// @ts-ignore
import { User } from "./User.ts";

import {
  serve,
  ServerRequest,
  // @ts-ignore
} from "https://deno.land/std@0.106.0/http/server.ts";
// @ts-ignore
import { Status } from "https://deno.land/std@0.106.0/http/http_status.ts";

import {
  acceptable,
  acceptWebSocket,
  WebSocket,
  // @ts-ignore
} from "https://deno.land/std@0.106.0/ws/mod.ts";

// @ts-ignore
import { Map_by_num, Map_by_str } from "../../vendor/utility/mod.ts";





const g__Users = new Map_by_str<User>();

const g__GameMaps = new Map_by_num<GameMap>();

const g__server = serve({ port: 3000 });
const g__server__isRunning = true;

async function g__server__handle_requests() {
  const get_uuID_from_req_url = (req_url: string) => {
    for (
      const [key, value] of new URLSearchParams(req_url.split("?")[1]).entries()
    ) {
      if (key == "uuID") return (value);
    }
  };
  const handle_req__connect_User = async (
    req: ServerRequest,
  ) => {
    const uuID = get_uuID_from_req_url(req.url)!;

    const l__User__connect_User__ReVa = await User.connect_User(
      g__Users,
      uuID,
    );

    console.info(
      `"${req.url}": {\n  l__User__connect_User__ReVa: {\n    status: ${l__User__connect_User__ReVa.status}\n    statusText: ${l__User__connect_User__ReVa.statusText}\n  }\n}`,
    );

    req.respond({
      status: l__User__connect_User__ReVa.status,
      statusText: l__User__connect_User__ReVa.statusText,
      body: "",
    });
  };
  const handle_req__ws_player__set = async (
    req: ServerRequest,
  ) => {
    if (acceptable(req)) {
      const ws_player__new = await acceptWebSocket({
        conn: req.conn,
        bufReader: req.r,
        bufWriter: req.w,
        headers: req.headers,
      });

      const uuID = get_uuID_from_req_url(req.url)!;

      const l__User__ws_player__set__ReVa = await User.ws_player__set(
        g__Users,
        uuID,
        ws_player__new,
      );

      console.info(
        `"${req.url}": {\n  l__User__connect_Player__ReVa: {\n    status: ${l__User__ws_player__set__ReVa.status}\n    statusText: ${l__User__ws_player__set__ReVa.statusText}\n  }\n}`,
      );
    }
  };
  const handle_req__connect_Player = async (
    req: ServerRequest,
  ) => {
    const uuID = get_uuID_from_req_url(req.url)!;

    const l__User__connect_Player__ReVa = await User.connect_Player(
      g__GameMaps,
      g__Users,
      uuID,
    );

    console.info(
      `"${req.url}": {\n  l__User__connect_Player__ReVa: {\n    status: ${l__User__connect_Player__ReVa.status}\n    statusText: ${l__User__connect_Player__ReVa.statusText}\n  }\n}`,
    );

    req.respond({
      status: l__User__connect_Player__ReVa.status,
      statusText: l__User__connect_Player__ReVa.statusText,
      body: "",
    });
  };
  const handle_req__disconnect_Player = async (
    req: ServerRequest,
  ) => {
    const uuID = get_uuID_from_req_url(req.url)!;

    const l__User__disconnect_Player__ReVa = await User.disconnect_Player(
      g__GameMaps,
      g__Users,
      uuID,
    );

    console.info(
      `"${req.url}": {\n  l__User__disconnect_Player__ReVa: {\n    status: ${l__User__disconnect_Player__ReVa.status}\n    statusText: ${l__User__disconnect_Player__ReVa.statusText}\n  }\n}`,
    );

    req.respond({
      status: l__User__disconnect_Player__ReVa.status,
      statusText: l__User__disconnect_Player__ReVa.statusText,
      body: "",
    });
  };
  const handle_req__disconnect_User = async (
    req: ServerRequest,
  ) => {
    const uuID = get_uuID_from_req_url(req.url)!;

    const l__User__disconnect_User__ReVa = await User.disconnect_User(
      g__GameMaps,
      g__Users,
      uuID,
    );

    console.info(
      `"${req.url}": {\n  l__User__disconnect_User__ReVa: {\n    status: ${l__User__disconnect_User__ReVa.status}\n    statusText: ${l__User__disconnect_User__ReVa.statusText}\n  }\n}`,
    );

    req.respond({
      status: l__User__disconnect_User__ReVa.status,
      statusText: l__User__disconnect_User__ReVa.statusText,
      body: "",
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

  for await (const req of g__server) {
    if (!g__server__isRunning) break;

    if ((req.method === "GET") && (req.url === "/")) {
      handle_req__GET__file(
        req,
        "text/html",
        "../CLIENT/index.html",
      );
    } else if ((req.method === "GET") && (req.url === "/css/main.css")) {
      handle_req__GET__file(
        req,
        "text/css",
        "../CLIENT/css/main.css",
      );
    } else if ((req.method === "GET") && (req.url === "/css/canvas.css")) {
      handle_req__GET__file(
        req,
        "text/css",
        "../CLIENT/css/canvas.css",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/API/GameObject_Character_Red.png")
    ) {
      handle_req__GET__file(
        req,
        "image/png",
        "../API/GameObject_Character_Red.png",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/API/GameObject_Character_Green.png")
    ) {
      handle_req__GET__file(
        req,
        "image/png",
        "../API/GameObject_Character_Green.png",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/API/GameObject_Character_Blue.png")
    ) {
      handle_req__GET__file(
        req,
        "image/png",
        "../API/GameObject_Character_Blue.png",
      );
    } else if (
      (req.method === "GET") && (req.url.split("?")[0] == "/connect_User")
    ) {
      handle_req__connect_User(req);
    } else if (
      (req.method === "GET") && (req.url.split("?")[0] == "/ws_player__set")
    ) {
      handle_req__ws_player__set(req);
    } else if (
      (req.method === "GET") && (req.url.split("?")[0] == "/connect_Player")
    ) {
      handle_req__connect_Player(req);
    } else if (
      (req.method === "GET") && (req.url.split("?")[0] == "/disconnect_Player")
    ) {
      handle_req__disconnect_Player(req);
    } else if (
      (req.method === "GET") && (req.url.split("?")[0] == "/disconnect_User")
    ) {
      handle_req__disconnect_User(req);
    } else if (
      (req.method === "GET") &&
      ((req.url === "/scripts/canvas.js") ||
        (req.url === "/CLIENT/scripts/canvas.js"))
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/canvas.js",
      );
    } else if (
      (req.method === "GET") &&
      ((req.url === "/scripts/init.js") ||
        (req.url === "/CLIENT/scripts/init.js"))
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/init.js",
      );
    } else if (
      (req.method === "GET") &&
      ((req.url === "/scripts/main.js") ||
        (req.url === "/CLIENT/scripts/main.js"))
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/main.js",
      );
    } else if (
      (req.method === "GET") &&
      ((req.url === "/scripts/Player__Controller.js") ||
        (req.url === "/CLIENT/scripts/Player__Controller.js"))
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/Player__Controller.js",
      );
    } else if (
      (req.method === "GET") &&
      ((req.url === "/scripts/websockets.js") ||
        (req.url === "/CLIENT/scripts/websockets.js"))
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../CLIENT/scripts/websockets.js",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/ENGINE-CLIENT/from_CLIENT_msg_to_CLIENT_obj.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/from_CLIENT_msg_to_CLIENT_obj.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Character.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Character.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Character__from_SERVER_msg.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Character__from_SERVER_msg.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameEntity.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameEntity.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameEntity__from_SERVER_msg.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameEntity__from_SERVER_msg.js",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/ENGINE-CLIENT/GameEntityEvent.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameEntityEvent.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameMap.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameMap.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameMap__QuadTree.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameMap__QuadTree.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameObject.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameObject.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameObject__HitBox.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameObject__HitBox.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/GameObject__from_SERVER_msg.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/GameObject__from_SERVER_msg.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/mod.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/mod.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Player.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Player.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Player__from_SERVER_msg.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Player__from_SERVER_msg.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Shape.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Shape.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Stat.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Stat.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/Stat__from_SERVER_msg.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/Stat__from_SERVER_msg.js",
      );
    } else if (
      (req.method === "GET") &&
      (req.url === "/ENGINE-CLIENT/WS_msg_GameEntity.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/WS_msg_GameEntity.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/ENGINE-CLIENT/WS_msg_Player.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../ENGINE-CLIENT/WS_msg_Player.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/mod.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/mod.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/Mutex.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/Mutex.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/number_to_formatted_string.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/number_to_formatted_string.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/rand_int_between_range.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/rand_int_between_range.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/sleep.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/sleep.js",
      );
    } else if (
      (req.method === "GET") && (req.url === "/vendor/utility/time_stamp.js")
    ) {
      handle_req__GET__file(
        req,
        "text/javascript",
        "../vendor/utility/time_stamp.js",
      );
    } else {
      req.respond({
        status: Status.NotFound,
        statusText: "Request Not Found",
        body: "",
      });
    }
  }
}

// @ts-ignore
await Promise.all([
  g__server__handle_requests(),
  GameMap.g__GameMaps__handler(g__GameMaps, g__server__isRunning),
]);
