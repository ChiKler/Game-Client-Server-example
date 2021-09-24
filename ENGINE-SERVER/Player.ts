// @ts-ignore
import { GameEntity, GameEntity__Args } from "./GameEntity.ts";

// @ts-ignore
import { GameMap__ID } from "./GameMap.ts";

// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.106.0/ws/mod.ts";





export interface Player__Args
{
  ws_player : WebSocket,

  GameMap_origin__ID : GameMap__ID
}

/**
 * 
 * Must be created from within the "User" class.
 * 
**/
export class Player extends GameEntity
{
  /**
   * Only the owning User must write to this property.
  **/
  ws_player : WebSocket;

  GameMap_origin__ID : GameMap__ID;


  constructor(
    p__GameEntity__Args : GameEntity__Args,
    p__Player__Args : Player__Args,
  ) {
    super(p__GameEntity__Args);

    this.ws_player = p__Player__Args.ws_player;

    this.GameMap_origin__ID = p__Player__Args.GameMap_origin__ID;
  }
}
