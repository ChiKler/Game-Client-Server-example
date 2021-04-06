import { GameMap, GameMap_ID, Player } from "../../ENGINE-CLIENT/mod.js";

import { WS__make } from "./websockets.js";
import { WS_msg_Player } from "../../ENGINE-CLIENT/WS_msg_Player.js";

export const g__uuID = window.prompt("uuID", "Jane,John");

export const g__server_address = "localhost:3000";

export let g__GameMap;
export function g__GameMap__set(p__GameMap) {
  g__GameMap = p__GameMap;
}
export let g__GameMap_ID;
export function g__GameMap_ID__set(p__GameMap_ID) {
  g__GameMap_ID = p__GameMap_ID;
}

export let g__Player;
export function g__Player__set(p__Player) {
  g__Player = p__Player;
}

let g__ws_player;
function g__ws_player__set() {
  g__ws_player = WS__make("player");

  WS_msg_Player.handle__WS_msg_Player__Connection__recv(g__ws_player);
  WS_msg_Player.handle__WS_msg_Player__Sighting__recv(g__ws_player);
}
let g__ws_chat;
function g__ws_chat__set() {
  g__ws_chat = WS__make("chat");

  //Chat.handle__WS_msg_Chat__Message__recv(g__ws_chat);
}

export async function g__connect_user() {
  return (await fetch(
    `http://${g__server_address}/connect_user?uuID=${g__uuID}`,
  ));
}
export async function g__connect_player() {
  g__ws_player__set();
  return (await fetch(
    `http://${g__server_address}/connect_player?uuID=${g__uuID}`,
  ));
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
