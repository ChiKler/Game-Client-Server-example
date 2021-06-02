// @ts-ignore
import { GameEntity, GameEntity__Args } from "./GameEntity.ts";
// @ts-ignore
import { GameObject } from "./GameObject.ts";

// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.97.0/ws/mod.ts";

export interface Player__Args {
  ws_player: WebSocket;
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

  constructor(
    p__GameEntity__Args: GameEntity__Args,
    p__Player__Args: Player__Args,
  ) {
    super(p__GameEntity__Args);

    this.#ws_player = p__Player__Args.ws_player;
  }
}
