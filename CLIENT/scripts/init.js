import { g__canvas__set } from "./canvas.js";

import { g__connect_player, g__connect_user } from "./main.js";

import { sleep } from "../../vendor/utility/mod.js";

async function init() {
  g__canvas__set();
  while (true) {
    const l__ReVa__g__connect_user = await g__connect_user();

    if (l__ReVa__g__connect_user.status == 200) {
      break;
    } else {
      console.log(l__ReVa__g__connect_user);
      console.warn(
        `"g__connect_user" failed with status: `,
        {
          code: l__ReVa__g__connect_user.status,
          text: l__ReVa__g__connect_user.body.statusText,
        },
      );

      await sleep(1000);
    }
  }
  while (true) {
    const l__ReVa__g__connect_player = await g__connect_player();

    if (l__ReVa__g__connect_player.status == 200) {
      break;
    } else {
      console.warn(
        `"g__connect_user" failed with status: `,
        {
          code: l__ReVa__g__connect_player.status,
          text: l__ReVa__g__connect_player.statusText,
        },
      );

      await sleep(1000);
    }
  }
}

window.onload = init();
