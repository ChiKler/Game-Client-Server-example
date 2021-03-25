// @ts-ignore
import { GameMap_ID, GameMap } from "../ENGINE/GameMap.ts";

// @ts-ignore
import { User } from "./User.ts";


// @ts-ignore
import { serve, ServerRequest } from "https://deno.land/std@0.91.0/http/server.ts";
// @ts-ignore
import { Status }from 'https://deno.land/std@0.91.0/http/http_status.ts';

// @ts-ignore
import { WebSocket, acceptable, acceptWebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";





const g_Users = new Map<string, User>();

const g_GameMaps = new Map<GameMap_ID, GameMap>
([
  [ GameMap_ID.Sandbox, new GameMap(GameMap_ID.Sandbox) ],
]);


const g_server = serve({ port: 3000 });


async function handle_requests()
{
  const handle_user_connection = (uuID : string, player_ws__new : WebSocket) =>
  {
    const ReVa__User__connect = User.connect(g_GameMaps, GameMap_ID.Sandbox, g_Users, uuID, player_ws__new);
    
    console.log(`Connection attempt: { uuID: ${uuID},\n${ReVa__User__connect}\n} }`);
  };
  
  
  // @ts-ignore
  for await (const req : ServerRequest of g_server)
  {
    if (req.url === `/ws?uuID=Jane`)
    {
      if(acceptable(req))
      {
        handle_user_connection("Jane", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers}));
      };
    }
    else
    if (req.url === `/ws?uuID=John`)
    {
      if(acceptable(req))
      {
        handle_user_connection("John", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers}));
      };
    }
    else
    if (req.url === `/ws?uuID=Mary`)
    {
      if(acceptable(req))
      {
        handle_user_connection("Mary", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers}));
      };
    }
    else
    if (req.method === "GET" && req.url === "/ENGINE/GameMap.js")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../ENGINE/GameMap.js") });
    }
    else
    if (req.method === "GET" && req.url === "/ENGINE/Player.js")
    {
      const headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../ENGINE/Player.js") });
    }
    else
    {
      req.respond({ status: Status.NotFound, body: JSON.stringify({ message: "Request Not Found" }) });
    };
  };
};


// @ts-ignore
await Promise.all
([
  handle_requests(),
  g_GameMaps.get(GameMap_ID.Sandbox)?.run(),
]);