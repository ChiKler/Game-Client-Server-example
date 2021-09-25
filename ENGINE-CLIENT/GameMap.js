import { GameEntityEvent__ID } from "./GameEntityEvent.js";

import { Player } from "./Player.js";

import { Map_by_num, sleep, time_stamp } from "../../vendor/utility/mod.js";





export var GameMap__ID;
(function (GameMap__ID) {
  GameMap__ID[GameMap__ID["Sandbox"] = 0] = "Sandbox";
})(GameMap__ID || (GameMap__ID = {}));


export class GameMap
{
  /*readonly */ID;
  
  /*readonly */Size;
  
  #Players_Map_by_num;

  /*private */ constructor(p__GameMap__Args)
  {
    this.ID = p__GameMap__Args.ID;
    
    this.Size = { X: 3600, Y: 3600 };
    
    this.#Players_Map_by_num = new Map_by_num();
  }


  /*public */connect_Player(Player_to_connect)
  {
    this.#Players_Map_by_num.set(Player_to_connect.eeID, Player_to_connect);
  }

  /*public */disconnect_Player(Player_to_disconnect)
  {
    this.#Players_Map_by_num.delete(Player_to_disconnect.eeID);
  }


  #render__requestAnimationFrame__ReVa = undefined;
  #render(g__cvs, g__ctx, g__Player) {
    {
      g__ctx.setTransform(1, 0, 0, 1, 0, 0);

      g__ctx.clearRect(0, 0, g__cvs.width, g__cvs.height);

      const camX = -g__Player.m__GameObject.Pos.X + g__cvs.width / 2;
      const camY = -g__Player.m__GameObject.Pos.Y + g__cvs.height / 2;

      g__ctx.translate(camX, camY);
    }

    {
      this.#Players_Map_by_num.for_each((Player_to_render) =>
      {
        Player_to_render.m__GameObject.draw(g__cvs, g__ctx, g__Player);
      });

      g__Player.m__GameObject.draw(g__cvs, g__ctx, g__Player);
    }

    this.#render__requestAnimationFrame__ReVa = window.requestAnimationFrame(
      () => { this.#render(g__cvs, g__ctx, g__Player); }
    );
  }

  #update__isLoopRunning = false;
  #update__isLoopCompleted = true;
  /*private */async update(previous_loop_elapsed_ms) {
    this.#update__isLoopCompleted = false;

    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = () => {
      return (- begin_ms + previous_loop_elapsed_ms + time_stamp());
    };
    const delta_time = () => {
      return (elapsed_ms() * 0.001);
    };


    const iterate_through_Players_and_handle_GameEntityEvent = (GameEntityEvent_to_handle__ID) =>
    {
      this.#Players_Map_by_num.for_each((Player_i) =>
      {
        Player_i.GameEntityEvents__handle(GameEntityEvent_to_handle__ID, delta_time());
      });
    }

    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_forward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_backward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_right);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_right);


    if (elapsed_ms() > max_ms) {
      console.warn(
        `The GameMap with ID ${this.ID} took ${(elapsed_ms() -
          max_ms)}ms longer updating than it should have.`,
      );
    } else if (elapsed_ms() < min_ms) {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0) {
        await sleep(sleep_ms);
      }
    }

    this.#update__isLoopCompleted = true;

    return (- previous_loop_elapsed_ms + elapsed_ms());
  }
  /*private */async update__start(g__cvs, g__ctx, g__Player)
  {
    this.#update__isLoopRunning = true;

    this.#render__requestAnimationFrame__ReVa = window.requestAnimationFrame(
      () => {
        this.#render(g__cvs, g__ctx, g__Player);
      },
    );

    let previous_loop_elapsed_ms = 20;

    while (this.#update__isLoopRunning)
    {
      previous_loop_elapsed_ms =
        await this.update(previous_loop_elapsed_ms);
    }
  }
  /*private */async update__stop() {
    if (!this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = false;
    }

    window.cancelAnimationFrame(this.#render__requestAnimationFrame__ReVa);

    while (!this.#update__isLoopCompleted) await sleep(20);
  }


  /*public */static async open_g__GameMap(
    g__GameMap__get,
    g__GameMap__set,
    g__Player__set,
    g__Player__get,
    g__cvs,
    g__ctx,
    GameMap_origin__ID,
    Player_to_connect
  ) {
    g__GameMap__set(new GameMap({ ID: GameMap_origin__ID }));

    g__Player__set(Player_to_connect);

    g__GameMap__get().update__start(g__cvs, g__ctx, g__Player__get());

    g__GameMap__get().connect_Player(g__Player__get());
  }
  /*public */ static async close_g__GameMap(
    g__GameMap__get,
    g__GameMap__set,
    g__Player__set,
  ) {
    await g__GameMap__get().update__stop();

    g__GameMap__set(undefined);

    g__Player__set(undefined);
  }
}