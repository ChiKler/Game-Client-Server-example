import { GameEntity } from "./GameEntity.ts";

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
}
