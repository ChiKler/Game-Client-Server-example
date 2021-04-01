import { Player } from "../../ENGINE-CLIENT/mod.js";

//import { GameMap_ID, GameMap } from "../../ENGINE/mod.js";

import { WS__make } from "./websockets.js";

export const g__uuID = window.prompt("uuID", "Jane,John,Mary");

export const g__server_address = "localhost:3000";

export let g__ws_player;
export function g__ws_player__set() {
  g__ws_player = WS__make("player");
}
export let g__ws_chat;
export function g__ws_chat__set() {
  g__ws_chat = WS__make("chat");
}

export async function g__connect_user() {
  const res = await fetch(
    `http://${g__server_address}/connect_user?uuID=${g__uuID}`,
  );
  return (res);
}
export async function g__connect_player() {
  g__ws_player__set();
  const res = await fetch(
    `http://${g__server_address}/connect_player?uuID=${g__uuID}`,
  );
  return (res);
}

// --- BLOCK DRAG --- //

document.oncontextmenu = function () {
  return false;
};
// --- BLOCK DRAG --- //

// --- BLOCK RIGHT CLICK --- //
document.onmousedown = function () {
  // return event.preventDefault ? event.preventDefault()
  //                             : event.returnValue = false;
  return false;
};
// --- BLOCK RIGHT CLICK --- //

// --- ALERT ON WINDOW CLOSING --- //
window.onbeforeunload = function () {
  return ("");
};
window.addEventListener("beforeunload", function (evt) {
  evt.preventDefault();
  evt.returnValue = "";
});
// --- ALERT ON WINDOW CLOSING --- //
