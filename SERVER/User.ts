// @ts-ignore
import { Player } from "../ENGINE/Player.ts";
// @ts-ignore
import { GameMap_ID, GameMap } from "../ENGINE/GameMap.ts";

// @ts-ignore
import { Status } from 'https://deno.land/std@0.91.0/http/http_status.ts';
// @ts-ignore
import { v4 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";





export class User
{
    readonly uuID : string;
    ssID : string;
    
    player : Player;
    
    
    #isConnected : boolean;
  
  
  constructor(uuID : string, ssID : string, player : Player)
  {
    this.uuID = uuID;
    this.ssID = ssID;
    
    this.player = player;
    
    
    this.#isConnected = false;
  };
  
  
  static connect_player (g_GameMaps : Map<GameMap_ID, GameMap>, p_GameMap_ID : GameMap_ID, g_Users : Map<string, User>, uuID : string) : { status : Status }
  {
    // @ts-ignore
    const ReVa__GameMap__connect_player = GameMap.connect_player(g_GameMaps, p_GameMap_ID, g_Users.get(uuID).player);
    
    if (ReVa__GameMap__connect_player.status == Status.OK)
    {
      // @ts-ignore
      // g_GameMaps.get(GameMap_ID.Sandbox).handle_socket_messages(g_Users.get(uuID));
    };
    
    return ({ status: ReVa__GameMap__connect_player.status });
  };
  static connect(g_GameMaps : Map<GameMap_ID, GameMap>, p_GameMap_ID : GameMap_ID, g_Users : Map<string, User>, uuID : string, player_ws__new : WebSocket) : { status : Status, wasUserAlreadyConnected : boolean, player_ws__old : (WebSocket|undefined) }
  {
    const ssID = v4.generate();
    
    
    // @ts-ignore
    const wasUserAlreadyConnected = ((g_Users.get(uuID) == undefined) ? false : g_Users.get(uuID).#isConnected);
    
    let player : Player;
    let player_ws__old : (WebSocket|undefined);
    
    if (wasUserAlreadyConnected)
    {
      // @ts-ignore
      player = g_Users.get(uuID).player;
      player_ws__old = player.ws;
      player.ws = player_ws__new;
    }
    else
    {
      player_ws__old = undefined;
      player = new Player(uuID, player_ws__new);
    };
    
    g_Users.set(uuID, new User(uuID, ssID, player));
    // @ts-ignore
    g_Users.get(uuID).#isConnected = true;
    
    
    const ReVa__User__connect_player = User.connect_player(g_GameMaps, p_GameMap_ID, g_Users, uuID);
    
    return ({ status: ReVa__User__connect_player.status, wasUserAlreadyConnected, player_ws__old });
  };
  
  static disconnect_player(g_GameMaps : Map<GameMap_ID, GameMap>, g_Users : Map<string, User>, uuID : string) : { status : Status }
  {
    const ReVa__GameMap__disconnect_player = GameMap.disconnect_player(g_GameMaps, uuID);
    
    if (ReVa__GameMap__disconnect_player.status == Status.OK)
    {
      g_Users.delete(uuID);
      // @ts-ignore
      g_Users.get(uuID).#isConnected = false;
    };
    
    return ({ status: ReVa__GameMap__disconnect_player.status });
  };
  static disconnect(g_GameMaps : Map<GameMap_ID, GameMap>, g_Users : Map<string, User>, uuID : string)
  {
    if (g_Users.get(uuID) == undefined)
    {
      return ({ status: Status.NotFound });
    }
    else
    // @ts-ignore
    if (g_Users.get(uuID).#isConnected)
    {
      const ReVa__User__disconnect_player = User.disconnect_player(g_GameMaps, g_Users, uuID);
      
      return ({ status: ReVa__User__disconnect_player.status });
    }
    else
    {
      return ({ status: Status.Conflict });
    };
  };
};