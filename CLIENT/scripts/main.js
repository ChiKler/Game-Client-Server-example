import { GameMap, GameMap_ID, Player } from "../../ENGINE-CLIENT/mod.js";

import { g__ctx, g__cvs } from "./canvas.js";
import { WS__make } from "./websockets.js";
import { WS_msg_Player } from "../../ENGINE-CLIENT/WS_msg_Player.js";

export const g__uuID = window.prompt("uuID", "Jane,John");

export const g__server_address = "localhost:3000";

export const g__GameMap = {
  m__instance: undefined,
  get: function () {
    return this.m__instance;
  },
  set: function (p__instance) {
    this.m__instance = p__instance;
  },
};
globalThis.g__GameMap = g__GameMap;

export const g__Player = {
  m__instance: undefined,
  get: function () {
    return this.m__instance;
  },
  set: function (p__instance) {
    this.m__instance = p__instance;
  },
};
globalThis.g__Player = g__Player;

export const g__ws_player = {
  m__instance: undefined,
  get: function () {
    return this.m__instance;
  },
  set: async function (p__instance) {
    this.m__instance = WS__make(g__server_address, g__uuID, "player");

    await WS_msg_Player.recv__WS_msg_Player__Disconnection(
      g__ws_player,
      g__cvs,
      g__ctx,
      g__GameMap,
      g__Player,
    );
    await WS_msg_Player.recv__WS_msg_Player__Connection(
      g__ws_player,
      g__cvs,
      g__ctx,
      g__GameMap,
      g__Player,
    );
    await WS_msg_Player.recv__WS_msg_Player__Sighting(
      g__ws_player,
      g__GameMap,
    );
    await WS_msg_Player.recv__WS_msg_Player__Vanishing(
      g__ws_player,
      g__GameMap,
    );
    await WS_msg_Player.recv__WS_msg_Player__Takedown(
      g__ws_player,
      g__GameMap,
    );
  },
};

export const g__ws_chat = {
  m__instance: undefined,
  get: function () {
    return this.m__instance;
  },
  set: function (p__instance) {
    this.m__instance = WS__make(g__server_address, g__uuID, "chat");

    //Chat.recv__WS_msg_Chat__Message(g__ws_chat);
  },
};

export async function g__connect_user() {
  return (await fetch(
    `http://${g__server_address}/connect_user?uuID=${g__uuID}`,
  ));
}
export async function g__connect_player() {
  await g__ws_player.set();

  return (await fetch(
    `http://${g__server_address}/connect_player?uuID=${g__uuID}`,
  ));
}
export async function g__disconnect_player() {
  return (await fetch(
    `http://${g__server_address}/disconnect_player?uuID=${g__uuID}`,
  ));
}
export async function g__disconnect_user() {
  const res = await fetch(
    `http://${g__server_address}/disconnect_user?uuID=${g__uuID}`,
  );

  if (res.status == 200) window.close();

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
