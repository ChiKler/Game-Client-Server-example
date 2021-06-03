import { Player } from "./Player.js";

import { Mutex, sleep, time_stamp } from "../vendor/utility/mod.js";

export var GameMap_ID;
(function (GameMap_ID) {
  GameMap_ID[GameMap_ID["Sandbox"] = 0] = "Sandbox";
})(GameMap_ID || (GameMap_ID = {}));

export class GameMap {
  #m__GameMap_ID;

  #m__Players_Map;

  /*private */ constructor(p__GameMap__Args) {
    this.#m__GameMap_ID = p__GameMap__Args.GameMap_ID;

    this.#m__Players_Map = new Map();
  }

  connect__Player(p__Player) {
    this.#m__Players_Map.set(p__Player.eeID, p__Player);
  }
  disconnect__Player(p__Player) {
    this.#m__Players_Map.delete(p__Player.eeID);
  }

  #render__requestAnimationFrame__ReVa = undefined;
  #render(g__cvs, g__ctx, g__Player) {
    {
      g__ctx.setTransform(1, 0, 0, 1, 0, 0);

      g__ctx.clearRect(0, 0, g__cvs.width, g__cvs.height);

      const camX = -g__Player.get().m__GameObject.posX + g__cvs.width / 2;
      const camY = -g__Player.get().m__GameObject.posY + g__cvs.height / 2;

      g__ctx.translate(camX, camY);
    }

    {
      this.#m__Players_Map.forEach((l__Player) => {
        l__Player.m__GameObject.draw(g__cvs, g__ctx, g__Player);
      });

      g__Player.get().m__GameObject.draw(g__cvs, g__ctx, g__Player);
    }

    this.#render__requestAnimationFrame__ReVa = window.requestAnimationFrame(
      () => {
        this.#render(g__cvs, g__ctx, g__Player);
      },
    );
  }

  #update__isLoopRunning = false;
  #update__isLoopCompleted = true;
  /*private*/ async update(previous_loop_ms) {
    this.#update__isLoopCompleted = false;

    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = () => {
      return ((time_stamp() - begin_ms) + previous_loop_ms);
    };
    const delta_time = () => {
      return (elapsed_ms() * 0.001);
    };

    this.#m__Players_Map.forEach((l__Player) => {
      l__Player.Events__handle(delta_time());
    });

    if (elapsed_ms() > max_ms) {
      console.warn(
        `The GameMap with ID ${this.#m__GameMap_ID} took ${(elapsed_ms() -
          max_ms)}ms longer updating than it should have.`,
      );
    } else if (elapsed_ms() < min_ms) {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0) {
        await sleep(sleep_ms);
      }
    }

    this.#update__isLoopCompleted = true;

    return (elapsed_ms() - previous_loop_ms);
  }
  /*private*/ async update__start(g__cvs, g__ctx, g__Player) {
    if (this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = true;
    }

    this.#render__requestAnimationFrame__ReVa = window.requestAnimationFrame(
      () => {
        this.#render(g__cvs, g__ctx, g__Player);
      },
    );

    let update__previous_loop_ms = 20;
    while (this.#update__isLoopRunning) {
      update__previous_loop_ms = await this.update(update__previous_loop_ms);
    }
  }
  /*private*/ async update__stop() {
    if (!this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = false;
    }

    window.cancelAnimationFrame(this.#render__requestAnimationFrame__ReVa);

    while (!this.#update__isLoopCompleted) await sleep(20);
  }

  /*private*/ static g__GameMap__isOpened = false;
  /*private*/ static g__GameMap__isOpened__mutex = new Mutex();

  /*private */ static async g__GameMap__open(
    g__cvs,
    g__ctx,
    g__GameMap,
    g__Player,
    p__GameMap_ID,
    p__Player,
  ) {
    const l__GameMap__g__GameMap__isOpened__mutex__unlock = await GameMap
      .g__GameMap__isOpened__mutex.lock();
    if (GameMap.g__GameMap__isOpened) {
      l__GameMap__g__GameMap__isOpened__mutex__unlock();
      return;
    } else {
      g__GameMap.set(new GameMap({ GameMap_ID: p__GameMap_ID }));

      if (p__Player != undefined) {
        g__Player.set(p__Player);
        g__GameMap.get().connect__Player(g__Player.get());
      }

      g__GameMap.get().update__start(g__cvs, g__ctx, g__Player);

      GameMap.g__GameMap__isOpened = true;

      l__GameMap__g__GameMap__isOpened__mutex__unlock();
    }
  }
  /*private */ static async g__GameMap__close(
    g__cvs,
    g__ctx,
    g__GameMap,
    g__Player,
    p__GameMap_ID,
  ) {
    const l__GameMap__g__GameMap__isOpened__mutex__unlock = await GameMap
      .g__GameMap__isOpened__mutex.lock();
    if (GameMap.g__GameMap__isOpened) {
      await g__GameMap.get().update__stop();

      g__GameMap.set(undefined);

      if (p__GameMap_ID != undefined) {
        GameMap.open(
          g__cvs,
          g__ctx,
          g__GameMap,
          g__Player,
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
