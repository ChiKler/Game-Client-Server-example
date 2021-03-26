// @ts-ignore
import { GameMap_ID, GameMap } from "../../ENGINE/GameMap.ts";

// @ts-ignore
import { User } from "./User.ts";


// @ts-ignore
import { serve, ServerRequest } from "https://deno.land/std@0.91.0/http/server.ts";
// @ts-ignore
import { Status }from 'https://deno.land/std@0.91.0/http/http_status.ts';

// @ts-ignore
import { WebSocket, acceptable, acceptWebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";





const g__Users = new Map<string, User>();

const g__GameMaps = new Map<GameMap_ID, GameMap>
([
  [ GameMap_ID.Sandbox, new GameMap(GameMap_ID.Sandbox) ],
]);


const g__server = serve({ port: 3000 });


async function handle_requests()
{
  const handle_user_connection = (uuID : string, player_ws__new : WebSocket) =>
  {
    const l__User__connect__ReVa = User.connect(g__GameMaps, GameMap_ID.Sandbox, g__Users, uuID, player_ws__new);
    
    console.log(`Connection attempt: { uuID: ${uuID},\n${l__User__connect__ReVa}\n} }`);
  };
  
  
  // @ts-ignore
  for await (const req : ServerRequest of g__server)
  {
    if (req.url === `/ws?uuID=Jane`)
    {
      if(acceptable(req))
      {
        handle_user_connection("Jane", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers }));
      };
    }
    else
    if (req.url === `/ws?uuID=John`)
    {
      if(acceptable(req))
      {
        handle_user_connection("John", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers }));
      };
    }
    else
    if (req.url === `/ws?uuID=Mary`)
    {
      if(acceptable(req))
      {
        handle_user_connection("Mary", await acceptWebSocket({ conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers }));
      };
    }
    
    
    else
    if (req.method === "GET" && req.url === "/")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/html");
      req.respond({ status:200, body: await Deno.open("../CLIENT/index.html") });
    }
    
    else
    if (req.method === "GET" && req.url === "/css/main.css")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/css");
      req.respond({ status:200, headers, body: await Deno.open("../CLIENT/css/main.css") });
    }
    
    else
    if (req.method === "GET" && req.url === "/scripts/canvas.js")
    {
      const headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../CLIENT/scripts/canvas.js") });
    }
    else
    if (req.method === "GET" && req.url === "/scripts/main.js")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../CLIENT/scripts/main.js") });
    }
    else
    if (req.method === "GET" && req.url === "/scripts/mod.js")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../CLIENT/scripts/mod.js") });
    }
    
    
    else
    if (req.method === "GET" && req.url === "/ENGINE/Player.js")
    {
      const headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../ENGINE/Player.js") });
    }
    else
    if (req.method === "GET" && req.url === "/ENGINE/GameMap.js")
    {
      const headers : Headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../ENGINE/GameMap.js") });
    }
    else
    if (req.method === "GET" && req.url === "/ENGINE/mod.js")
    {
      const headers = new Headers(); headers.set("Content-Type", "text/javascript");
      req.respond({ status:200, headers, body: await Deno.open("../ENGINE/mod.js") });
    }
    
    
    else
    {
      req.respond({ status: Status.NotFound, body: JSON.stringify({ message: "Error 404 (Request Not Found)" }) });
    };
  };
};


// @ts-ignore
await Promise.all
([
  handle_requests(),
  g__GameMaps.get(GameMap_ID.Sandbox)?.run(),
]);