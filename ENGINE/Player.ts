// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";





export class Player
{
    readonly uuID : string;
    
    ws : WebSocket;
  
  
  constructor(uuID : string, ws : WebSocket)
  {
    this.uuID = uuID;
    
    this.ws = ws;
  };
};