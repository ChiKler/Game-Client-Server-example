import { Player } from "../../ENGINE/mod.js";

//import { GameMap_ID, GameMap } from "../../ENGINE/mod.js";

import { ws_make } from "./websockets.js";

export const g__server_address = "localhost:3000";

export let g__ws_game;
export function g__ws_game__set() {
  g__ws_game = ws_make();
}
export let g__ws_chat;
export function g__ws_chat__set() {
  g__ws_chat = ws_make();
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
