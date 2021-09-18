// @ts-ignore
import { GameEntity } from "./GameEntity.ts";

import {
  GameEntity__SERVER_msg,
  GameEntity__to_SERVER_msg
}
// @ts-ignore
from "./GameEntity__to_SERVER_msg.ts";

// @ts-ignore
import { GameMap_ID } from "./GameMap.ts";

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
  m__Player__source: Player__SERVER_msg;
  m__GameMap_ID: GameMap_ID;
}
interface WS_msg_Player__body__Disconnection extends WS_msg_Player__body {
  m__GameMap_ID?: GameMap_ID;
}
interface WS_msg_Player__body__Sighting extends WS_msg_Player__body {
  m__GameEntity__source: GameEntity__SERVER_msg;
}
interface WS_msg_Player__body__Vanishing extends WS_msg_Player__body {
  m__GameEntity__source: GameEntity__SERVER_msg;
}
interface WS_msg_Player__body__Takedown extends WS_msg_Player__body {
  m__GameEntity__source: GameEntity__SERVER_msg;
}

export class WS_msg_Player<WS_msg_Player__body__Ty extends WS_msg_Player__body>
  extends WS_msg<WS_msg_Player__body__Ty> {
  static async send__Connection(
    p__Player__source: Player,
    p__GameMap_ID: GameMap_ID,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Connection,
      WS_msg_Player<WS_msg_Player__body__Connection>
    >(p__Player__source.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Connection,
      body: {
        m__Player__source: Player__to_SERVER_msg(
          p__Player__source,
        ),
        m__GameMap_ID: p__GameMap_ID,
      },
    });
  }
  static async send__Disconnection(
    p__Player__source: Player,
    p__GameMap_ID?: GameMap_ID,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Disconnection,
      WS_msg_Player<WS_msg_Player__body__Disconnection>
    >(p__Player__source.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Disconnection,
      body: { m__GameMap_ID: p__GameMap_ID },
    });
  }

  static async send__Sighting(
    p__GameEntity__source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Sighting,
      WS_msg_Player<WS_msg_Player__body__Sighting>
    >(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Sighting,
      body: {
        m__GameEntity__source: GameEntity__to_SERVER_msg(
          p__GameEntity__source,
        ),
      },
    });
  }

  static async send__Vanishing(
    p__GameEntity__source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Vanishing,
      WS_msg_Player<WS_msg_Player__body__Vanishing>
    >(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Vanishing,
      body: {
        m__GameEntity__source: GameEntity__to_SERVER_msg(
          p__GameEntity__source,
        ),
      },
    });
  }

  static async send__Takedown(
    p__GameEntity__source: GameEntity,
    p__Player__target: Player,
  ): Promise<void> {
    WS_msg.send<
      WS_msg_Player__body__Takedown,
      WS_msg_Player<WS_msg_Player__body__Takedown>
    >(p__Player__target.ws_player, {
      kind: "WS_msg_Player",
      id: WS_msg_Player_ID.Takedown,
      body: {
        m__GameEntity__source: GameEntity__to_SERVER_msg(
          p__GameEntity__source,
        ),
      },
    });
  }
}
