import { g__canvas__set } from "./canvas.js";

import { g__connect_Player, g__connect_User, g__ws_player__set } from "./main.js";

import { sleep } from "../../vendor/utility/mod.js";





async function init()
{
  g__canvas__set();
  
  
  while (true)
  {
    const g__connect_User__ReVa = await g__connect_User();

    if (g__connect_User__ReVa.status == 200)
    {
      break;
    }
    else
    {
      console.warn(
        `"g__connect_User" failed with status: `,
        {
          code: g__connect_User__ReVa.status,
          text: g__connect_User__ReVa.body.statusText,
        },
      );

      await sleep(1000);
    }
  }
  
  await g__ws_player__set();
  
  while (true)
  {
    const g__connect_Player__ReVa = await g__connect_Player();

    if (g__connect_Player__ReVa.status == 200)
    {
      break;
    }
    else
    {
      console.warn(
        `"g__connect_Player" failed with status: `,
        {
          code: g__connect_Player__ReVa.status,
          text: g__connect_Player__ReVa.statusText,
        },
      );

      await sleep(1000);
    }
  }
}


window.onload = init();
