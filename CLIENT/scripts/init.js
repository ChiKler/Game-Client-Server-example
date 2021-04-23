import { g__canvas__set } from "./canvas.js";

import { g__connect_player, g__connect_user } from "./main.js";

import { sleep } from "../../vendor/utility/mod.js";

async function init() {
  g__canvas__set();
  while ((await g__connect_user()).status != 200) {
    await sleep(5000);
  }
  while ((await g__connect_player()).status != 200) {
    await sleep(5000);
  }
}

window.onload = init();
