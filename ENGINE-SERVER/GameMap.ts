// @ts-ignore
import { Status } from "https://deno.land/std@0.106.0/http/http_status.ts";
import {
  isWebSocketCloseEvent,
  WebSocket,
  // @ts-ignore
} from "https://deno.land/std@0.106.0/ws/mod.ts";

// @ts-ignore
import { GameEntity } from "./GameEntity.ts";
// @ts-ignore
import { GameEntityEvent__ID } from "./GameEntityEvent.ts";
// @ts-ignore
import { Player } from "./Player.ts";
// @ts-ignore
import { WS_msg_GameEntity } from "./WS_msg_GameEntity.ts";
// @ts-ignore
import { WS_msg_Player } from "./WS_msg_Player.ts";
// @ts-ignore
import { g__Users__Player_conn__Mutex_by_uuID__Ty } from "../SERVER/scripts/User.ts";
// @ts-ignore
import { Map_by_num, Mutex, sleep, time_stamp } from "../vendor/utility/mod.ts";





export enum GameMap__ID
{
  Sandbox_A,
  Sandbox_B,
}


interface GameMap__PetitionToDisconnectPlayer
{
  hasLeftOriginGameMap : boolean,
  hasBeenDisconnected : boolean,

  status? : Status,
  statusText? : string
}


class GameMap__Players_Buffer<data__value__Ty>
{
  #data = new Array<data__value__Ty>();


  constructor() {}


  public pass(p__data__value : data__value__Ty) : void
  {
    this.#data.push(p__data__value);
  }
  
  public take() : (data__value__Ty | undefined)
  {
    return (this.#data.pop());
  }


  public length()
  {
    return (this.#data.length)
  }


  public for_each(callback_fn : ((p__data__value : data__value__Ty, break_loop : (() => void)) => void)) : void
  {
    let doBreakLoop = false;

    const break_loop = () => doBreakLoop = true;

    for (let i = 0; i < this.#data.length; i++)
    {
      callback_fn(this.#data[i], break_loop);

      if (doBreakLoop) break;
    }
  }
}


interface GameMap__Players_Buffer_In__data__value__Ty
{
  Player_to_connect : Player,
  GameMap_target__coords : { X : number, Y : number }
}


class GameMap__Players_Buffer_In
  extends GameMap__Players_Buffer<GameMap__Players_Buffer_In__data__value__Ty> {}


interface GameMap__Players_Buffer_Out__data__value__Ty
{
  isWarping : boolean,
  Player_to_disconnect : Player,
  PetitionToDisconnectPlayer : GameMap__PetitionToDisconnectPlayer
}


class GameMap__Players_Buffer_Out
  extends GameMap__Players_Buffer<GameMap__Players_Buffer_Out__data__value__Ty> {}


export interface GameMap__Args
{
  ID : GameMap__ID;
}

export class GameMap
{
  readonly ID : GameMap__ID;
  
  readonly Size : { X : number, Y : number };

  #Players_Map_by_num = new Map_by_num<Player>();

  #Players_Buffer_In = new GameMap__Players_Buffer_In();
  #Players_Buffer_Out = new GameMap__Players_Buffer_Out();
  
  #PetitionsToDisconnectPlayer_by_eeID :
    { [ key : number ] : GameMap__PetitionToDisconnectPlayer } = {};
  #PetitionsToWarpPlayer_by_eeID :
    { [ key : number ] : GameMap__PetitionToDisconnectPlayer } = {};


  private constructor(p__GameMap__Args : GameMap__Args) {
    this.ID = p__GameMap__Args.ID;
    
    this.Size = { X: 3600, Y: 3600 };
  }

  #connect_Player__calls_in_progress = 0;
  public static async connect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    Player_to_connect : Player,
    GameMap_target__ID? : GameMap__ID,
    GameMap_target__coords? : { X : number, Y : number }
  )
  : Promise<{ status : Status; statusText : string }>
  {
    GameMap_target__coords =
      (GameMap_target__coords == undefined) ? Player_to_connect.get_coords() : GameMap_target__coords!;

    GameMap_target__ID =
      (GameMap_target__ID == undefined) ? Player_to_connect.GameMap_origin__ID : GameMap_target__ID!;

    const GameMap_target = g__GameMaps.get(GameMap_target__ID);

    const Player_to_connect__eeID = Player_to_connect.eeID;

    try
    {
      // Expected possible error on the following line.
      const GameMap_target__closing_Mutex__unlock =
        // @ts-ignore
        await GameMap_target.#closing_Mutex.lock();

      ++GameMap_target!.#connect_Player__calls_in_progress;

      GameMap_target__closing_Mutex__unlock!();
    }
    catch (err)
    {
      console.warn(
        `The following error could occur when "GameMap_target" is closed (undefined). It might be unrelated:\n${err}`
      );

      return ({
        status: Status.NotFound,
        statusText:
          `Could not connect the Player with eeID ${Player_to_connect__eeID}\
. The GameMap with ID ${GameMap_target__ID} was closed (undefined).`,
      });
    }

    GameMap_target!.#Players_Buffer_In.pass({ Player_to_connect, GameMap_target__coords });

    while (GameMap_target!.#Players_Map_by_num.get(Player_to_connect__eeID) == undefined) await sleep(40);

    --GameMap_target!.#connect_Player__calls_in_progress;
    return ({
      status: Status.OK,
      statusText:
        `The Player with eeID ${Player_to_connect__eeID} has been connected to the GameMap with ID ${GameMap_target__ID}.`,
    });
  }

  #disconnect_Player__calls_in_progress = 0;
  public static async disconnect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    Player_to_disconnect : Player
  )
  : Promise<{ status : Status; statusText : string }>
  {
    const GameMap_origin__ID = Player_to_disconnect.GameMap_origin__ID;

    const GameMap_origin = g__GameMaps.get(GameMap_origin__ID);

    const Player_to_disconnect__eeID = Player_to_disconnect.eeID;

    try
    {
      // Expected possible error on the following line.
      const GameMap_origin__closing_Mutex__unlock =
        // @ts-ignore
        await GameMap_origin.#closing_Mutex.lock();

      ++GameMap_origin!.#disconnect_Player__calls_in_progress;

      GameMap_origin__closing_Mutex__unlock!();
    }
    catch (err)
    {
      console.warn(
        `The following error could occur when "GameMap_origin" is closed (undefined). It might be unrelated:\n${err}`
      );

      return ({
        status: Status.OK,
        statusText:
          `The Player with eeID ${Player_to_disconnect__eeID} was no longer connected\
 to the GameMap with ID ${GameMap_origin__ID} because it got closed.`,
      });
    }

    if (GameMap_origin!.#Players_Map_by_num.get(Player_to_disconnect__eeID) == undefined)
    {
      --GameMap_origin!.#disconnect_Player__calls_in_progress;
      return ({
        status: Status.OK,
        statusText: `The Player with eeID ${Player_to_disconnect__eeID} \
was already disconnected from the GameMap with ID ${GameMap_origin__ID}`,
      });
    }
    else
    {
      GameMap_origin!.#PetitionsToDisconnectPlayer_by_eeID[Player_to_disconnect__eeID] =
        { hasLeftOriginGameMap: false, hasBeenDisconnected: false };

      const PetitionToDisconnectPlayer =
        GameMap_origin!.#PetitionsToDisconnectPlayer_by_eeID[Player_to_disconnect__eeID]!;

      while (!PetitionToDisconnectPlayer.hasLeftOriginGameMap) await sleep(40);

      delete GameMap_origin!.#PetitionsToDisconnectPlayer_by_eeID[Player_to_disconnect__eeID];

      const PetitionToDisconnectPlayer__status = PetitionToDisconnectPlayer.status!;
      const PetitionToDisconnectPlayer__statusText = PetitionToDisconnectPlayer.statusText;
      
      if (PetitionToDisconnectPlayer__status != Status.OK)
      {
        --GameMap_origin!.#disconnect_Player__calls_in_progress;
        return ({
          status: PetitionToDisconnectPlayer__status,
          statusText: PetitionToDisconnectPlayer__statusText!,
        });
      }
      else
      {
        while (true)
        {
          let found = false;
    
          GameMap_origin!.#Players_Buffer_Out.for_each((
            GameMap_origin__Players_Buffer_Out__data__value :
              GameMap__Players_Buffer_Out__data__value__Ty,
            break_loop : (() => void),
          ) =>
          {
            if (
              GameMap_origin__Players_Buffer_Out__data__value.Player_to_disconnect.eeID
              ==
              Player_to_disconnect__eeID
            )
            {
              found = true;
              break_loop();
            }
          });
    
          if (found) {
            await sleep(40);
          } else {
            break;
          }
        }
    
        while (!PetitionToDisconnectPlayer.hasBeenDisconnected) await sleep(40);
    
        --GameMap_origin!.#disconnect_Player__calls_in_progress;
        return ({
          status: PetitionToDisconnectPlayer__status,
          statusText: `The Player with eeID ${Player_to_disconnect__eeID} was\
  disconnected from the GameMap with ID ${GameMap_origin__ID}`,
        });
      }
    }
  }

  public static async warp_Player(
    g__GameMaps : Map_by_num<GameMap>,
    Player_to_warp : Player,
    GameMap_target__ID : GameMap__ID,
    GameMap_target__coords : { X : number, Y : number }
  )
  : Promise<{ status : Status; statusText : string }>
  {
    const GameMap_origin__ID = Player_to_warp.GameMap_origin__ID;

    const Player_to_warp__eeID = Player_to_warp.eeID;

    const GameMap__disconnect_Player__ReVa = await GameMap.disconnect_Player(
      g__GameMaps,
      Player_to_warp
    );

    const GameMap__disconnect_Player__ReVa__status = GameMap__disconnect_Player__ReVa.status;
    const GameMap__disconnect_Player__ReVa__statusText = GameMap__disconnect_Player__ReVa.statusText;

    if (GameMap__disconnect_Player__ReVa__status == Status.OK)
    {
      const GameMap__connect_Player__ReVa = await GameMap.connect_Player(
        g__GameMaps,
        Player_to_warp,
        GameMap_target__ID,
        GameMap_target__coords
      );

      const GameMap__connect_Player__ReVa__status = GameMap__connect_Player__ReVa.status;
      const GameMap__connect_Player__ReVa__statusText = GameMap__connect_Player__ReVa.statusText;

      if (GameMap__connect_Player__ReVa__status == Status.OK)
      {
        return ({
          status: Status.OK,
          statusText: `The Player with eeID ${Player_to_warp__eeID} was warped from the\
 GameMap with ID ${GameMap_origin__ID} to the GameMap with ID ${GameMap_target__ID}.`
        });
      }
      else
      {
        return ({
          status: GameMap__connect_Player__ReVa__status,
          statusText: GameMap__connect_Player__ReVa__statusText,
        });
      }
    }
    else
    {
      return ({
        status: GameMap__disconnect_Player__ReVa__status,
        statusText: GameMap__disconnect_Player__ReVa__statusText,
      });
    }
  }

  #handle_WS_messages__calls_in_progress = 0;
  public static async handle_WS_messages(
    g__GameMaps : Map_by_num<GameMap>,
    Player_source : Player,
    success : { value : (boolean | undefined) },
    ws_player : WebSocket,
    uuID : string,
    g__Users__Player_conn__Mutex_by_uuID : g__Users__Player_conn__Mutex_by_uuID__Ty
  )
  : Promise<({ status: Status, statusText: string } | void)>
  {
    const GameMap_origin__ID = Player_source.GameMap_origin__ID;
    
    const GameMap_origin = g__GameMaps.get(GameMap_origin__ID);

    const Player_source__eeID = Player_source.eeID;

    try
    {
      // Expected possible error on the following line.
      const GameMap_target__closing_Mutex__unlock =
        // @ts-ignore
        await GameMap_origin.#closing_Mutex.lock();

      ++GameMap_origin!.#handle_WS_messages__calls_in_progress;

      GameMap_target__closing_Mutex__unlock!();

      success.value = true;
    }
    catch (err)
    {
      success.value = false;

      console.warn(
        `The following error could occur when "GameMap_origin" is closed (undefined). It might be unrelated:\n${err}`
      );

      return ({
        status: Status.NotFound,
        statusText:
          `Could not handle the WebSocket "ws_player" for the Player with eeID ${Player_source__eeID}\
. The GameMap with ID ${GameMap_origin__ID} was closed (undefined).`,
      });
    }
    
    try
    {
      WS_msg_Player.send__Connection(
        Player_source,
        GameMap_origin__ID,
      );

      GameMap_origin!.#Players_Map_by_num.for_each((Player_target : Player) => {
        if (Player_target.eeID != Player_source__eeID)
        {
          WS_msg_Player.send__Sighting(
            Player_source,
            Player_target,
          );
        }
      });
    }
    catch (err)
    {
      console.warn(`The following error could occur when either WebSockets are closed. It might be unrelated:\n${err}`);
    }

    for await (const msg_str of ws_player)
    {
      if (isWebSocketCloseEvent(msg_str))
      {
        const g__Users__Player_conn__Mutex_by_uuID__unlock =
          await g__Users__Player_conn__Mutex_by_uuID.lock.call(
            g__Users__Player_conn__Mutex_by_uuID,
            uuID
          );

        GameMap.disconnect_Player(g__GameMaps, Player_source);

        g__Users__Player_conn__Mutex_by_uuID__unlock();

        break;
      }
      else
      {
        try
        {
          WS_msg_GameEntity.recv__move_forward(
            Player_source,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_backward(
            Player_source,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_left(
            Player_source,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_right(
            Player_source,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__steer_left(
            Player_source,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__steer_right(
            Player_source,
            <string> msg_str,
          );
        }
        catch (err)
        {
          console.warn(`The following error could occur when "ws_player" is closed. It might be unrelated:\n${err}`);
        }
      }
    }

    --GameMap_origin!.#handle_WS_messages__calls_in_progress;
  };

  #update__isLoopRunning = false;
  #update__isLoopCompleted = true;
  private async update__loop(previous_loop_elapsed_ms : number) {
    this.#update__isLoopCompleted = false;

    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = () : number => {
      return ((time_stamp() - begin_ms) + previous_loop_elapsed_ms);
    };
    const delta_time = () : number => {
      return (elapsed_ms() * 0.001);
    };


    {
      const ks = Object.keys(this.#PetitionsToDisconnectPlayer_by_eeID);

      for (let i = 0; i < ks.length; i++) {
        try
        {
          const k = +ks[i];

          const PetitionToDisconnectPlayer = this.#PetitionsToDisconnectPlayer_by_eeID[k]!;
          
          // Expected possible error on the following line.
          if (!PetitionToDisconnectPlayer.hasLeftOriginGameMap)
          {
            const Player_to_disconnect = this.#Players_Map_by_num.get(k)!;

            this.#Players_Map_by_num.delete(k);
            
            this.#Players_Buffer_Out.pass({
              isWarping: false,
              Player_to_disconnect,
              PetitionToDisconnectPlayer
            });
            
            PetitionToDisconnectPlayer.status = Status.OK;
            PetitionToDisconnectPlayer.hasLeftOriginGameMap = true;
          }
        }
        catch (err)
        {
          console.warn(
            `The following error could occur when "PetitionToDisconnectPlayer" is undefined\
 because it got deleted at "GameMap.disconnect_Player". It might be unrelated:\n${err}`
          );
        }
      }
    }

    const iterate_through_Players_and_handle_GameEntityEvent = (p__GameEntityEvent__ID : GameEntityEvent__ID) =>
    {
      this.#Players_Map_by_num.for_each((Player_i : Player) => {
        Player_i.GameEntityEvents__handle(p__GameEntityEvent__ID, delta_time());
      });
    }

    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_forward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_backward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_right);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_right);

    this.#Players_Map_by_num.for_each((Player_source : Player) => {
      this.#Players_Map_by_num.for_each((Player_target : Player) => {
        if (Player_target.eeID != Player_source.eeID) {
          WS_msg_Player.send__Sighting(
            Player_source,
            Player_target,
          );
        }
      });
    });

    {
      let this__Players_Buffer_In__take__ReVa : (GameMap__Players_Buffer_In__data__value__Ty | undefined);
      while (
        (this__Players_Buffer_In__take__ReVa = this.#Players_Buffer_In.take())
        !=
        undefined
      )
      {
        const Player_to_connect = this__Players_Buffer_In__take__ReVa!.Player_to_connect;

        Player_to_connect.teleport(this__Players_Buffer_In__take__ReVa!.GameMap_target__coords);

        Player_to_connect.GameMap_origin__ID = this.ID;

        this.#Players_Map_by_num.set(
          Player_to_connect.eeID,
          Player_to_connect,
        );
      }
    }


    if (elapsed_ms() > max_ms) {
      console.warn(
        `The GameMap with ID ${this.ID} took ${(elapsed_ms() - max_ms)}ms longer updating than it should have.`,
      );
    } else if (elapsed_ms() < min_ms) {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0) {
        await sleep(sleep_ms);
      }
    }

    this.#update__isLoopCompleted = true;

    return (elapsed_ms() - previous_loop_elapsed_ms);
  }
  private async update__start() {
    if (this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = true;
    }

    let this__update__previous_loop_elapsed_ms = 20;
    while (this.#update__isLoopRunning) {
      this__update__previous_loop_elapsed_ms = await this.update__loop(this__update__previous_loop_elapsed_ms);
    }
  }
  /**
   * 
   * Must only be called from within "GameMap.close_GameMap()".
   * 
  **/
  private async update__stop() {
    if (this.#update__isLoopRunning)
    {
      while (Object.keys(this.#PetitionsToDisconnectPlayer_by_eeID).length > 0) await sleep(40);

      this.#update__isLoopRunning = false;

      while (!this.#update__isLoopCompleted) await sleep(40);
    }
    else
    {
      return;
    }
  }

  private static async open_GameMap(
    g__GameMaps : Map_by_num<GameMap>,
    GameMap_to_open__ID : GameMap__ID,
  ) : Promise<void>
  {
    const g__GameMaps__ks = [...g__GameMaps.keys()];

    const GameMap_to_open__ID__str = GameMap_to_open__ID + "";

    let found = false;
    let i = 0;

    while ((!found) && (i < g__GameMaps__ks.length))
    {
      if (g__GameMaps__ks[i] == GameMap_to_open__ID__str) {
        found = true;
        break;
      } else {
        i++;
      }
    }

    if (found)
    {
      console.warn(`The GameMap with ID ${GameMap_to_open__ID} was already open.`);
    }
    else
    {
      g__GameMaps.set(GameMap_to_open__ID, new GameMap({ ID: GameMap_to_open__ID }));

      g__GameMaps.get(GameMap_to_open__ID)!.update__start();
    }
  }


  #closing_Mutex = new Mutex();
  /**
   * 
   * Could collapse if several parts of the program try to close the same GameMap at the same time.
   * To fix, add a try-catch statement before trying to lock the Mutex.
   * Though I don't think it's necessary to overcomplicate it any further.
   * 
  **/
  private static async close_GameMap(
    g__GameMaps : Map_by_num<GameMap>,
    GameMap_to_close__ID : GameMap__ID,
  ) : Promise<void>
  {
    const GameMap_to_close = g__GameMaps.get(GameMap_to_close__ID)!;

    const GameMap_to_close__closing_Mutex__unlock = await GameMap_to_close.#closing_Mutex.lock();

    while (GameMap_to_close.#connect_Player__calls_in_progress > 0) await sleep(40);
    while (GameMap_to_close.#Players_Buffer_In.length() > 0) await sleep(40);

    while (GameMap_to_close.#disconnect_Player__calls_in_progress > 0) await sleep(40);
    while (GameMap_to_close.#handle_WS_messages__calls_in_progress > 0) await sleep(40);
    while (GameMap_to_close.#Players_Buffer_Out.length() > 0) await sleep(40);

    await GameMap_to_close.update__stop();

    g__GameMaps.delete(GameMap_to_close__ID);

    GameMap_to_close__closing_Mutex__unlock();
  }

  static async g__GameMaps__handler(
    g__GameMaps : Map_by_num<GameMap>,
    g__server__isRunning : boolean,
  )
  : Promise<void>
  {
    (async () =>
    {
      while (g__server__isRunning)
      {
        const begin_ms = time_stamp();
        const min_ms = 20;
        const max_ms = 40;

        const elapsed_ms = () : number => {
          return (time_stamp() - begin_ms);
        };


        g__GameMaps.for_each(async (GameMap_origin : GameMap) =>
        {
          let GameMap_origin__Players_Buffer_Out__take__ReVa :
            (GameMap__Players_Buffer_Out__data__value__Ty | undefined);

          while (
            (GameMap_origin__Players_Buffer_Out__take__ReVa =
              GameMap_origin.#Players_Buffer_Out.take())
            !=
            undefined
          )
          {
            GameMap_origin__Players_Buffer_Out__take__ReVa!.PetitionToDisconnectPlayer.hasBeenDisconnected = true;
          }
        });


        if (elapsed_ms() > max_ms) {
          console.warn(
            `GameMap.g__GameMaps__handler took ${(elapsed_ms() - max_ms)}ms longer handling than it should have.`,
          );
        } else if (elapsed_ms() < min_ms) {
          const sleep_ms = (min_ms - elapsed_ms());
          if (sleep_ms > 0) {
            await sleep(sleep_ms);
          }
        }
      }

      g__GameMaps.for_each((GameMap_to_close : GameMap) => {
        GameMap.close_GameMap(g__GameMaps, GameMap_to_close.ID);
      });
    })();

    GameMap.open_GameMap(g__GameMaps, GameMap__ID.Sandbox_A);
    GameMap.open_GameMap(g__GameMaps, GameMap__ID.Sandbox_B);
  }
}
