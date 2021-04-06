// @ts-ignore
import { GameMap_ID, Player } from "./mod.ts";
// @ts-ignore
import { WS_msg__recv, WS_msg__send } from "../SERVER/scripts/websockets.ts";

export enum WS_msg_Player_ID {
  Connection,
  Sighting,
  Vanishing,
  Takedown,
}

export class WS_msg_Player {
  static async handle__WS_msg_Player__Connection__send(
    p__Player__source: Player,
    p__GameMap_ID: GameMap_ID,
  ): Promise<void> {
    WS_msg__send(p__Player__source.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Connection,
      body: {
        p__Player__source: Player.from_SERVER_obj_to_SERVER_msg(
          p__Player__source,
        ),
        p__GameMap_ID: p__GameMap_ID,
      },
    });
  }

  static async handle__WS_msg_Player__Sighting__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: {
        p__Player__source: Player.from_SERVER_obj_to_SERVER_msg(
          p__Player__target,
        ),
      },
    });
  }

  static async handle__WS_msg_Player__Vanishing__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: {
        p__Player__source: Player.from_SERVER_obj_to_SERVER_msg(
          p__Player__target,
        ),
      },
    });
  }

  static async handle__WS_msg_Player__Takedown__send(
    p__Player__source: Player,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg__send(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: {
        p__Player__source: Player.from_SERVER_obj_to_SERVER_msg(
          p__Player__target,
        ),
      },
    });
  }
}
