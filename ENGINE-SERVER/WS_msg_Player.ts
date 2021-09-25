// @ts-ignore
import { GameEntity } from "./GameEntity.ts";

import {
  GameEntity__SERVER_msg,
  GameEntity__to_SERVER_msg
}
// @ts-ignore
from "./GameEntity__to_SERVER_msg.ts";

// @ts-ignore
import { GameMap__ID } from "./GameMap.ts";

// @ts-ignore
import { Player } from "./Player.ts";

import {
  Player__SERVER_msg,
  Player__to_SERVER_msg
}
// @ts-ignore
from "./Player__to_SERVER_msg.ts";

// @ts-ignore
import { WS_msg, WS_msg__body } from "../SERVER/scripts/websockets.ts";





export enum WS_msg_Player_ID {
  Connection,
  Disconnection,
  Sighting,
  Vanishing,
  Takedown,
}

interface WS_msg_Player__body extends WS_msg__body {}

interface WS_msg_Player__body__Connection extends WS_msg_Player__body {
  Player_source : Player__SERVER_msg,
  GameMap_origin__ID : GameMap__ID
}
interface WS_msg_Player__body__Disconnection extends WS_msg_Player__body {}
interface WS_msg_Player__body__Sighting extends WS_msg_Player__body {
  GameEntity_source : GameEntity__SERVER_msg
}
interface WS_msg_Player__body__Vanishing extends WS_msg_Player__body {
  GameEntity_source : GameEntity__SERVER_msg
}
interface WS_msg_Player__body__Takedown extends WS_msg_Player__body {
  GameEntity_source : GameEntity__SERVER_msg
}

export class WS_msg_Player<WS_msg_Player__body__Ty extends WS_msg_Player__body>
  extends WS_msg<WS_msg_Player__body__Ty>
{
  static async send_Connection(
    Player_source : Player,
    GameMap_origin__ID : GameMap__ID,
  )
  : Promise<void>
  {
    WS_msg.send<
      WS_msg_Player__body__Connection,
      WS_msg_Player<WS_msg_Player__body__Connection>
    >(Player_source.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Connection,
      body: {
        Player_source: Player__to_SERVER_msg(
          Player_source,
        ),
        GameMap_origin__ID,
      },
    });
  }
  static async send_Disconnection(
    Player_source : Player
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Disconnection,
      WS_msg_Player<WS_msg_Player__body__Disconnection>
    >(
      Player_source.ws_player,
      {
        kind: "WS_msg_Player",
        id: WS_msg_Player_ID.Disconnection,
        body: {}
      }
    );
  }

  static async send_Sighting(
    GameEntity_source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Sighting,
      WS_msg_Player<WS_msg_Player__body__Sighting>
    >(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: { GameEntity_source: GameEntity__to_SERVER_msg(GameEntity_source) }
    });
  }

  static async send_Vanishing(
    GameEntity_source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Vanishing,
      WS_msg_Player<WS_msg_Player__body__Vanishing>
    >(
      p__Player__target.ws_player,
      {
        kind: "WS_msg_Player",
        id: WS_msg_Player_ID.Vanishing,
        body: { GameEntity_source: GameEntity__to_SERVER_msg(GameEntity_source) }
      }
    );
  }

  static async send_Takedown(
    GameEntity_source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Takedown,
      WS_msg_Player<WS_msg_Player__body__Takedown>
    >(
      p__Player__target.ws_player,
      {
        kind: "WS_msg_Player",
        id: WS_msg_Player_ID.Takedown,
        body: { GameEntity_source: GameEntity__to_SERVER_msg(GameEntity_source) }
      }
    );
  }
}
