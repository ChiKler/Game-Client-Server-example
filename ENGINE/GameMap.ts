// @ts-ignore
import { Player } from "./Player.ts";

// @ts-ignore
import { time_stamp } from "../vendor/utility/time_stamp.ts";
// @ts-ignore
import { sleep } from "../vendor/utility/sleep.ts";

// @ts-ignore
import { Status } from 'https://deno.land/std@0.91.0/http/http_status.ts';
// @ts-ignore
import { WebSocket, isWebSocketCloseEvent } from "https://deno.land/std@0.91.0/ws/mod.ts";

// @ts-ignore
import { User } from "../SERVER/User.ts";





export enum GameMap_ID
{
  Sandbox,
};

export class GameMap
{
    readonly ID : GameMap_ID;
    
    #isRunning : boolean;
    
    players : Map<string, Player>;
  
  
  constructor(ID : GameMap_ID)
  {
    this.ID = ID;
    
    this.#isRunning = false;
    
    this.players = new Map<string, Player>();
  };
  
  
  static connect_player(g_GameMaps : Map<GameMap_ID, GameMap>, p_GameMap_ID : GameMap_ID, player : Player) : { status : Status }
  {
    if (g_GameMaps.get(p_GameMap_ID) == undefined)
    {
      return ({ status: Status.NotFound });
    }
    else
    {
      //this.players_buffer_in.push(player);
      
      
      return ({ status: Status.NotImplemented });
      return ({ status: Status.OK });
    };
  };
  
  static disconnect_player(g_GameMaps : Map<GameMap_ID, GameMap>, uuID : string) : { status : Status }
  {
    const l_GameMap_IDs = [...g_GameMaps.keys()];
    let l_GameMap_ID : GameMap_ID;
    
    let found = false;
    let i = 0;
    
    while((found == false) && (i < l_GameMap_IDs.length))
    {
      // @ts-ignore
      if (g_GameMaps.get(l_GameMap_IDs[i]).players.get(uuID) == undefined)
      {
        i++;
      }
      else
      {
        found = true;
        l_GameMap_ID = l_GameMap_IDs[i];
        break;
      };
    };
    
    if (found == false)
    {
      return ({ status: Status.NotFound });
    }
    else
    {
      //this.players_buffer_out.push(g_GameMaps.get(l_GameMap_ID).players.get(uuID));
      
      
      return ({ status: Status.NotImplemented });
      return ({ status: Status.OK });
    };
  };
  
  handle_socket_messages = async (user : User) : Promise<void> =>
  {
    for await (const msg_str of user.player.ws)
    {
      if(isWebSocketCloseEvent(msg_str))
      {
        // ...
        
        break;
      }
      else
      {
        // recieve and handle socket messages
      };
    };
  };
  
  
  #update = async () : Promise<void> =>
  {
    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;
    
    const elapsed_ms = () : number => { return (time_stamp()-begin_ms) };
    const delta_time = () : number => { return (elapsed_ms()*0.001) };
    
    
    ///
    
    
    ///
    
    
    if (elapsed_ms() > max_ms)
    {
      console.warn(`The GameMap with ID ${this.ID} took ${(elapsed_ms() - max_ms)}ms longer updating than it should have.`);
    }
    else
    if (elapsed_ms() < min_ms)
    {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0)
      {
        await sleep(sleep_ms);
      };
    };
  };
  run = async () : Promise<void> =>
  {
    if (this.#isRunning)
    {
      return;
    }
    else
    {
      this.#isRunning = true;
    };
    
    
    while (this.#isRunning)
    {
      await this.#update();
    };
  };
  stop = () : void =>
  {
    if (!this.#isRunning)
    {
      return;
    }
    else
    {
      this.#isRunning = false;
    };
  };
};