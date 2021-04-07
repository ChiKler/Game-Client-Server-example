import { Player } from "./Player.js";

import { Mutex, sleep, time_stamp } from "../vendor/utility/mod.js";

export var GameMap_ID;
(function (GameMap_ID) {
  GameMap_ID[GameMap_ID["Sandbox"] = 0] = "Sandbox";
})(GameMap_ID || (GameMap_ID = {}));

export class GameMap {
  #m__GameMap_ID;

  #isRunning;

  #m__Players_Map;

  /*private */ constructor(p__GameMap_ID) {
    this.#m__GameMap_ID = p__GameMap_ID;

    this.#isRunning = false;

    this.#m__Players_Map = new Map();
  }

  /*private */ render(g__cvs, g__ctx, g__Player) {
    if (!this.#isRunning) return;

    {
      g__ctx.setTransform(1, 0, 0, 1, 0, 0);

      g__ctx.clearRect(0, 0, g__cvs.width, g__cvs.height);

      const camX = -g__Player.m__GameObject.posX + g__cvs.width / 2;
      const camY = -g__Player.m__GameObject.posY + g__cvs.height / 2;

      g__ctx.translate(camX, camY);
    }

    {
      g__Player.m__GameObject.draw(g__cvs, g__ctx, g__Player);

      this.#m__Players_Map.forEach((l__Player) => {
        l__Player.m__GameObject.draw(g__cvs, g__ctx, g__Player);
      });
    }

    window.requestAnimationFrame(this.render);
  }
  /*private */ async update() {
  }
  /*private */ async update__start() {
    if (this.#isRunning) {
      return;
    } else {
      this.#isRunning = true;
    }

    window.requestAnimationFrame(this.render);

    while (this.#isRunning) {
      await this.update();
    }
  }
  /*private */ update__stop() {
    if (!this.#isRunning) {
      return;
    } else {
      this.#isRunning = false;
    }
  }

  /*private*/ static g__GameMap__isOpened = false;
  /*private*/ static g__GameMap__isOpened__mutex = new Mutex();

  /*private */ static async g__GameMap__open(
    g__GameMap,
    g__GameMap__set,
    g__Player,
    g__Player__set,
    p__GameMap_ID,
  ) {
    const l__GameMap__g__GameMap__isOpened__mutex__unlock = await GameMap
      .g__GameMap__isOpened__mutex.lock();
    if (GameMap.g__GameMap__isOpened) {
      l__GameMap__g__GameMap__isOpened__mutex__unlock();
      return;
    } else {
      console.log(`Opening the GameMap with GameMap_ID ${p__GameMap_ID}`);

      while (g__Player == undefined) await sleep(20);

      g__GameMap__set(new GameMap(p__GameMap_ID));

      GameMap.g__GameMap__isOpened = true;

      l__GameMap__g__GameMap__isOpened__mutex__unlock();
    }
  }
  /*private */ static async g__GameMap__close(
    g__GameMap,
    g__GameMap__set,
    g__Player,
    g__Player__set,
    p__GameMap_ID,
  ) {
    const l__GameMap__g__GameMap__isOpened__mutex__unlock = await GameMap
      .g__GameMap__isOpened__mutex.lock();
    if (GameMap.g__GameMap__isOpened) {
      console.log(
        `Closing the GameMap with GameMap_ID ${g__GameMap.#m__GameMap_ID}`,
      );

      // AWAIT FOR THE GAMEMAP
      // UPDATE TO STOP RUNNING
      g__GameMap__set(undefined);

      if (p__GameMap_ID != undefined) {
        GameMap.open(
          g__GameMap,
          g__GameMap__set,
          g__Player,
          g__Player__set,
          p__GameMap_ID,
        );
      }

      GameMap.g__GameMap__isOpened = false;

      l__GameMap__g__GameMap__isOpened__mutex__unlock();
    } else {
      l__GameMap__g__GameMap__isOpened__mutex__unlock();
      return;
    }
  }
}
