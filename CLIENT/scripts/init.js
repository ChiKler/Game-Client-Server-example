import { g__canvas__set } from "./canvas.js";

import {
  g__connect_player,
  g__connect_user,
  g__GameMap,
  g__GameMap__set,
  g__GameMap_ID,
} from "./main.js";

import { sleep } from "../../vendor/utility/mod.js";
import { GameMap } from "../../ENGINE-CLIENT/GameMap.js";

async function init() {
  g__canvas__set();
  while ((await g__connect_user()).status != 200) {
    await sleep(1000);
  }
  while ((await g__connect_player()).status != 200) {
    await sleep(1000);
  }

  //GameMap.g__GameMap__handler(g__GameMap, g__GameMap__set, g__GameMap_ID);
}

window.onload = init();
