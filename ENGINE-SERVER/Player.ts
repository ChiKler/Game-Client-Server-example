// @ts-ignore
import { GameEntity } from "./GameEntity.ts";
// @ts-ignore
import { GameObject } from "./GameObject.ts";

// @ts-ignore
import type { GameObject__SERVER_msg } from "../ENGINE-SERVER/GameObject.ts";

// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.92.0/ws/mod.ts";

export interface Player__SERVER_msg {
  type: string;
  args: {
    eeID: number;
    GameObject: GameObject__SERVER_msg;
  };
}

export class Player extends GameEntity {
  #ws_player: WebSocket;

  get ws_player(): WebSocket {
    return this.#ws_player;
  }
  /**
   * 
   * USE ONLY FROM WITHIN THE "User" CLASS.
   * 
  **/
  set ws_player(ws_player: WebSocket) {
    this.#ws_player = ws_player;
  }

  constructor(eeID: number, p__GameObject: GameObject, ws_player: WebSocket) {
    super(eeID, p__GameObject);

    this.#ws_player = ws_player;
  }

  static from_SERVER_obj_to_SERVER_msg(
    p__Player: Player,
  ): Player__SERVER_msg {
    let l__Player__SERVER_msg: Player__SERVER_msg;

    l__Player__SERVER_msg = {
      type: "Player",
      args: {
        // @ts-ignore
        eeID: p__Player.eeID,
        GameObject: GameObject.from_SERVER_obj_to_SERVER_msg(
          // @ts-ignore
          p__Player.m__GameObject,
        ),
      },
    };

    return (l__Player__SERVER_msg);
  }
}
