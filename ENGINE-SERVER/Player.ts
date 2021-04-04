// @ts-ignore
import { GameEntity } from "./mod.ts";

// @ts-ignore
import { Player as CLIENT_Player } from "../ENGINE-CLIENT/mod.js";

// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.92.0/ws/mod.ts";

// @ts-ignore
import { WS_msg__recv, WS_msg__send } from "../SERVER/scripts/websockets.ts";

// @ts-ignore
import { GameMap_ID } from "./mod.ts";

export enum WS_msg_Player_ID {
  Connection,
  Sighting,
  Vanishing,
  Takedown,
}

export class Player extends GameEntity {
  #ws_player: WebSocket;

  /**
   * 
   * USE ONLY WITHIN User CLASS.
   * 
  **/
  set ws_player(ws_player: WebSocket) {
    this.#ws_player = ws_player;
  }

  constructor(eeID: number, ws_player: WebSocket) {
    super(eeID);

    this.#ws_player = ws_player;
  }

  static CLIENT_type_conversion(p__Player: Player): CLIENT_Player {
    let l__CLIENT_Player: CLIENT_Player;

    // @ts-ignore
    l__CLIENT_Player = new CLIENT_Player(p__Player.eeID);

    return (l__CLIENT_Player);
  }

  static async handle__WS_msg_Player__Connection__send(
    p__Player__source: Player,
    p__GameMap_ID: GameMap_ID,
  ): Promise<void> {
    WS_msg__send(p__Player__source.#ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Connection,
      body: {
        p__Player__source: Player.CLIENT_type_conversion(p__Player__source),
        p__GameMap_ID: p__GameMap_ID,
      },
    });
  }

  static async handle__WS_msg_Player__Sighting__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__source.#ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: {
        p__Player__target: Player.CLIENT_type_conversion(p__Player__target),
      },
    });
  }

  static async handle__WS_msg_Player__Vanishing__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__source.#ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Vanishing,
      body: {
        p__Player__target: Player.CLIENT_type_conversion(p__Player__target),
      },
    });
  }

  static async handle__WS_msg_Player__Takedown__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__source.#ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Takedown,
      body: {
        p__Player__target: Player.CLIENT_type_conversion(p__Player__target),
      },
    });
  }
}
