import { Player } from "../../ENGINE/mod.js";

import { g__ws_game, g__ws_game__set } from "./main.js";

import { g__canvas__set } from "./canvas.js";

import { ws_msg_recv } from "./websockets.js";

function init() {
  g__canvas__set();

  g__ws_game__set();
}

window.onload = init();
