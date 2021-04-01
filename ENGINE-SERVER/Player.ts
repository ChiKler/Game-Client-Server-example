// @ts-ignore
import { GameEntity } from "./mod.ts";

// @ts-ignore
import { Player as CLIENT_Player } from "../ENGINE-CLIENT/mod.js";

// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";

export enum WS_msg_Player_ID {
  Connection,
  Sighting,
  Vanishing,
  Takedown,
}

export class Player extends GameEntity {
  ws: WebSocket;

  constructor(eeID: number, ws: WebSocket) {
    super(eeID);

    this.ws = ws;
  }

  static CLIENT_type_conversion(p__Player: Player): CLIENT_Player {
    let l__CLIENT_Player: CLIENT_Player;

    // @ts-ignore
    l__CLIENT_Player = new CLIENT_Player(p__Player.eeID);

    return (l__CLIENT_Player);
  }
}
