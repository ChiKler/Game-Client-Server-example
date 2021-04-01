import { Player, WS_msg_Player_ID } from "../../ENGINE-CLIENT/mod.js";

import {
  g__connect_player,
  g__connect_user,
  g__uuID,
  g__ws_player,
} from "./main.js";

import { g__canvas__set } from "./canvas.js";

import { WS_msg__recv } from "./websockets.js";

import { sleep } from "../../vendor/utility/mod.js";

async function init() {
  g__canvas__set();
  while ((await g__connect_user()).status != 200) {
    await sleep(1000);
  }
  while ((await g__connect_player()).status != 200) {
    await sleep(1000);
  }

  WS_msg__recv(
    g__ws_player,
    "WS_msg_Player",
    WS_msg_Player_ID.Connection,
    (body) => {
      // ...
    },
  );
  WS_msg__recv(
    g__ws_player,
    "WS_msg_Player",
    WS_msg_Player_ID.Sighting,
    (body) => {
      // ...
    },
  );
}

window.onload = init();
