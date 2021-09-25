import { g__ctx, g__cvs } from "./canvas.js";
import { WS__make } from "./websockets.js";
import { WS_msg_Player } from "../../ENGINE-CLIENT/WS_msg_Player.js";





export const g__uuID = window.prompt("uuID", "Jane,John");

export const g__server__address = "localhost:3000";


let g__GameMap = undefined;
export function g__GameMap__get()
{
  return (g__GameMap);
}
export function g__GameMap__set(p__GameMap)
{
  g__GameMap = p__GameMap;
}

// Debugging purposes.
globalThis.g__GameMap = g__GameMap;


let g__Player = undefined;
export function g__Player__get()
{
  return (g__Player);
}
export function g__Player__set(p__Player)
{
  g__Player = p__Player;
}

// Debugging purposes.
globalThis.g__Player = g__Player;


let g__ws_player = undefined;
export function g__ws_player__get()
{
  return (g__ws_player);
}
export async function g__ws_player__set()
{
  g__ws_player = WS__make(g__server__address, g__uuID, "player");

  await Promise.all
  ([
    WS_msg_Player.recv_Connection(
      g__ws_player__get,
      g__GameMap__get,
      g__GameMap__set,
      g__Player__get,
      g__Player__set,
      g__cvs,
      g__ctx
    ),
    WS_msg_Player.recv_Disconnection(
      g__ws_player__get,
      g__GameMap__get,
      g__GameMap__set,
      g__Player__set
    ),
    WS_msg_Player.recv_Sighting(
      g__ws_player__get,
      g__GameMap__get
    ),
    WS_msg_Player.recv_Vanishing(
      g__ws_player__get,
      g__GameMap__get
    ),
    WS_msg_Player.recv_Takedown(
      g__ws_player__get,
      g__GameMap__get
    )
  ]);
}


let g__ws_chat = undefined;
export function g__ws_chat__get()
{
  return (g__ws_chat);
}
export async function g__ws_chat__set()
{
  g__Player = WS__make(g__server__address, g__uuID, "chat");
}


export async function g__connect_User()
{
  return (await fetch(
    `http://${g__server__address}/connect_User?uuID=${g__uuID}`,
  ));
}
export async function g__connect_Player()
{
  return (await fetch(
    `http://${g__server__address}/connect_Player?uuID=${g__uuID}`,
  ));
}
export async function g__disconnect_Player()
{
  return (await fetch(
    `http://${g__server__address}/disconnect_Player?uuID=${g__uuID}`,
  ));
}
export async function g__disconnect_User()
{
  const res = await fetch(
    `http://${g__server__address}/disconnect_User?uuID=${g__uuID}`,
  );

  if (res.status == 200) window.close();

  return (res);
}


// --- BLOCK DRAG --- //

document.oncontextmenu = function()
{
  return (false);
};
// --- BLOCK DRAG --- //

// --- BLOCK RIGHT CLICK --- //
document.onmousedown = function()
{
  // return (
  //   event.preventDefault
  //     ? event.preventDefault()
  //     : (event.returnValue = false)
  // );
  return (false);
};
// --- BLOCK RIGHT CLICK --- //

// --- ALERT ON WINDOW CLOSING --- //
window.onbeforeunload = function()
{
  return ("");
};
window.addEventListener(
  "beforeunload",
  function(evt)
  {
    evt.preventDefault();
    evt.returnValue = "";
  }
);
// --- ALERT ON WINDOW CLOSING --- //
