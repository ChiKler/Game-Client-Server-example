// @ts-ignore
import { Player } from "./Player.js";

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
  } /*private */
  /*private */ update__stop() {
    if (!this.#isRunning) {
      return;
    } else {
      this.#isRunning = false;
    }
  } /*private */

  /*private */ static open(g__GameMap, g__GameMap__set, g__GameMap_ID) {
    g__GameMap__set(new GameMap(g__GameMap_ID));
    console.log(`Opening the GameMap with GameMap_ID ${g__GameMap_ID}`);
  }
  /*private */ static close(g__GameMap) {
    console.log(
      `Closing the GameMap with GameMap_ID ${g__GameMap.#m__GameMap_ID}`,
    );
  }

  static async g__GameMap__handler(g__GameMap, g__GameMap__set, g__GameMap_ID) {
    // while (true)
    // {
    //
    // };

    if (g__GameMap_ID != g__GameMap.#m__GameMap_ID) {
      GameMap.close(g__GameMap);
      GameMap.open(g__GameMap, g__GameMap__set, g__GameMap_ID);
    }
  }
}
