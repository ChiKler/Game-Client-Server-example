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
import { Mutex, sleep, time_stamp } from "../vendor/utility/mod.ts";

export enum GameMap__ID {
  Sandbox,
}

export interface GameMap__Args {
  GameMap__ID: GameMap__ID;
}

export class GameMap
{
  static Players_Buffer = class<T>
  {
    #data: Array<T>; // should use ArrayBuffer as buffer and Uint8Array as view
    
    
    constructor()
    {
      this.#data = new Array<T>();
    }
    
    
    pass(t: T) : number
    {
      return (this.#data.push(t));
    }
    
    take() : (T | undefined)
    {
      return (this.#data.pop());
    }
  };
  static Players_BufferIn = class extends GameMap.Players_Buffer<Player> {};
  static Players_BufferOut__data__Ty = class
  {
    Player: Player;
    isToBeDisconnected: boolean;
    GameMap__ID__target: (GameMap__ID | undefined);
    
    
    constructor(
      p__Player: Player,
      p__isToBeDisconnected: boolean,
      p__GameMap__ID__target?: GameMap__ID,
    ) {
      this.Player = p__Player;
      this.isToBeDisconnected = p__isToBeDisconnected;
      
      if (p__isToBeDisconnected) {
        this.GameMap__ID__target = undefined;
      } else {
        if (p__GameMap__ID__target == undefined) {
          try {
            throw new TypeError(
              `Invalid "GameMap.Players_BufferOut__data__Ty" constructor call. The argument "GameMap__ID__target" needs to be provided when the argument "isToBeDisconnected" is false.`,
            );
          } catch (err) {
            console.error(err);
          }
        } else {
          this.GameMap__ID__target = p__GameMap__ID__target;
        }
      }
    }
  };
  // @ts-ignore
  static Players_BufferOut = class extends GameMap.Players_Buffer<GameMap.Players_BufferOut__data__Ty> {};

  static PetitionToDisconnectPlayer = class {
    hasBeenDisconnected : boolean;

    status? : Status;
    statusText? : string;

    constructor() {
      this.hasBeenDisconnected = false;
    }
  };

  readonly m__GameMap__ID: GameMap__ID;
  
  readonly Size : { X : number, Y : number };

  #m__Players: Map<number, Player>;

  // @ts-ignore
  #m__Players_BufferIn: GameMap.Players_BufferIn;
  // @ts-ignore
  #m__Players_BufferOut: GameMap.Players_BufferOut;
  
  // @ts-ignore
  #m__PetitionsToDisconnectPlayer : { [ key : string ] : GameMap.PetitionToDisconnectPlayer };

  private constructor(p__GameMap__Args: GameMap__Args) {
    this.m__GameMap__ID = p__GameMap__Args.GameMap__ID;
    
    this.Size = { X: 3600, Y: 3600 };
    
    this.#m__Players = new Map<number, Player>();

    this.#m__Players_BufferIn = new GameMap.Players_BufferIn();
    this.#m__Players_BufferOut = new GameMap.Players_BufferOut();

    this.#m__PetitionsToDisconnectPlayer = {};
  }

  #connect_Player__calls_in_progress = 0;
  #connect_Player__calls_in_progress__mutex = new Mutex();
  static async connect_Player(
    g__GameMaps: Map<GameMap__ID, GameMap>,
    p__GameMap__ID: GameMap__ID,
    player: Player,
  ) : Promise<{ status : Status; statusText : string }> {
    let l__GameMap : (GameMap | undefined);

    let l__GameMap__connect_Player__calls_in_progress__mutex__unlock :
      ((() => void) | undefined) = undefined;

    let l__GameMap__wasAlreadyClosed = false;

    try {
      l__GameMap = g__GameMaps.get(p__GameMap__ID);

      l__GameMap__connect_Player__calls_in_progress__mutex__unlock =
        await l__GameMap!.#connect_Player__calls_in_progress__mutex.lock();

      if (l__GameMap!.#m__isClosing) {
        l__GameMap__wasAlreadyClosed = true;
        l__GameMap__connect_Player__calls_in_progress__mutex__unlock!();
      }
    } catch(err) {
      console.warn(`The following error could occur when "l__GameMap" is closed (undefined). It might be unrelated:\n${err}`);
      l__GameMap__wasAlreadyClosed = true;
      if (
        l__GameMap__connect_Player__calls_in_progress__mutex__unlock != undefined
      ) {
        l__GameMap__connect_Player__calls_in_progress__mutex__unlock!();
      }
    }

    if (l__GameMap__wasAlreadyClosed) {
      return ({
        status: Status.NotFound,
        statusText:
          `The GameMap with GameMap__ID ${p__GameMap__ID} wasn't found. Could not connect the Player with eeID ${player.eeID}.`,
      });
    } else {
      ++l__GameMap!.#connect_Player__calls_in_progress;
      l__GameMap__connect_Player__calls_in_progress__mutex__unlock!();

      l__GameMap!.#m__Players_BufferIn.pass(player);

      --l__GameMap!.#connect_Player__calls_in_progress;
      return ({
        status: Status.OK,
        statusText:
          `The Player with eeID ${player.eeID} has been connected to the GameMap with GameMap__ID ${p__GameMap__ID}.`,
      });
    }
  }

  #disconnect_Player__calls_in_progress = 0;
  #disconnect_Player__calls_in_progress__mutex = new Mutex();
  static async disconnect_Player(
    g__GameMaps: Map<GameMap__ID, GameMap>,
    eeID: number,
  ) : Promise<{ status : Status; statusText : string }> {
    let l__GameMap : (GameMap | undefined);

    const l__GameMap__IDs = [...g__GameMaps.keys()];
    let l__GameMap__ID : GameMap__ID;

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap__IDs.length)) {
      let l__GameMap__wasAlreadyClosed = false;

      let l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock :
        ((() => void) | undefined) = undefined;

      try {
        l__GameMap = g__GameMaps.get(l__GameMap__IDs[i]);

        l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock =
          await l__GameMap!.#disconnect_Player__calls_in_progress__mutex.lock();

        if (l__GameMap!.#m__isClosing) {
          l__GameMap__wasAlreadyClosed = true;
          l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock!();
          l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock = undefined;
        }
      } catch(err) {
        console.warn(`The following error could occur when "l__GameMap" is closed (undefined). It might be unrelated:\n${err}`);
        l__GameMap__wasAlreadyClosed = true;
        if (
          l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock !=
            undefined
        ) {
          l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock!();
          l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock =
            undefined;
        }
      }

      if (l__GameMap__wasAlreadyClosed) {
        i++;
      } else {
        ++l__GameMap!.#disconnect_Player__calls_in_progress;
        l__GameMap__disconnect_Player__calls_in_progress__mutex__unlock!();

        if (l__GameMap!.#m__Players.get(eeID) == undefined) {
          i++;
        } else {
          found = true;
          l__GameMap__ID = l__GameMap__IDs[i];
          break;
        }
      }
    }

    const eeID_str = eeID + "";

    if (found == false) {
      return ({
        status: Status.NotFound,
        statusText: `The Player with eeID ${eeID} wasn't found on any GameMap.`,
      });
    } else {
      l__GameMap!.#m__PetitionsToDisconnectPlayer[eeID_str] = new GameMap.PetitionToDisconnectPlayer();

      while (
        !(l__GameMap!.#m__PetitionsToDisconnectPlayer[eeID_str]!.hasBeenDisconnected)
      ) {
        await sleep(20); // If possible I'd prefer doing something with a Promise instead of using a while loop.
      }
      
      const l__PetitionToDisconnectPlayer = l__GameMap!.#m__PetitionsToDisconnectPlayer[eeID_str]!;

      delete l__GameMap!.#m__PetitionsToDisconnectPlayer[eeID_str];

      --l__GameMap!.#disconnect_Player__calls_in_progress;
      return ({
        status: l__PetitionToDisconnectPlayer.status!,
        statusText: l__PetitionToDisconnectPlayer.statusText!,
      });
    }
  }

  handle_WS_messages = async (
    g__GameMaps: Map<GameMap__ID, GameMap>,
    p__Player: Player,
    ws_player: WebSocket,
  ) : Promise<void> => {
    try {
      WS_msg_Player.send__Connection(
        p__Player,
        this.m__GameMap__ID,
      );

      this.#m__Players.forEach((l__Player__target: Player) => {
        if (l__Player__target.eeID != p__Player.eeID) {
          WS_msg_Player.send__Sighting(
            p__Player,
            l__Player__target,
          );
        }
      });
    } catch(err) {
      console.warn(`The following error could occur when either WS are closed. It might be unrelated:\n${err}`);
    }

    for await (const msg_str of ws_player) {
      if (isWebSocketCloseEvent(msg_str)) {
        // GameMap.disconnect_Player(g__GameMaps, p__Player.eeID); // this generates an error

        break;
      } else {
        try {
          WS_msg_GameEntity.recv__move_forward(
            p__Player,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_backward(
            p__Player,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_left(
            p__Player,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__move_right(
            p__Player,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__steer_left(
            p__Player,
            <string> msg_str,
          );
          WS_msg_GameEntity.recv__steer_right(
            p__Player,
            <string> msg_str,
          );
        } catch(err) {
          console.warn(`The following error could occur when "ws_player" is closed. It might be unrelated:\n${err}`);
        }
      }
    }
  };

  #update__isLoopRunning = false;
  #update__isLoopCompleted = true;
  private async update(previous_loop_ms : number) {
    this.#update__isLoopCompleted = false;

    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = () : number => {
      return ((time_stamp() - begin_ms) + previous_loop_ms);
    };
    const delta_time = () : number => {
      return (elapsed_ms() * 0.001);
    };


    {
      const m__PetitionsToDisconnectPlayer__keys = Object.keys(this.#m__PetitionsToDisconnectPlayer);

      for (let i = 0; i < m__PetitionsToDisconnectPlayer__keys.length; i++) {
        try {
          const m__PetitionsToDisconnectPlayer__key = m__PetitionsToDisconnectPlayer__keys[i];
          const eeID = +m__PetitionsToDisconnectPlayer__key;

          const l__PetitionToDisconnectPlayer = this.#m__PetitionsToDisconnectPlayer[m__PetitionsToDisconnectPlayer__key]!;

          if (!l__PetitionToDisconnectPlayer.hasBeenDisconnected)
          {
            const l__Player__to_be_disconnected = this.#m__Players.get(eeID)!;
            console.log(l__Player__to_be_disconnected + "");
            this.#m__Players.delete(eeID);
            console.log(l__Player__to_be_disconnected + "");
            this.#m__Players_BufferOut.pass(
              new GameMap.Players_BufferOut__data__Ty(
                l__Player__to_be_disconnected,
                true,
                undefined,
              ),
            );
  
            l__PetitionToDisconnectPlayer.hasBeenDisconnected = true;
            l__PetitionToDisconnectPlayer.status = Status.OK;
            l__PetitionToDisconnectPlayer.statusText =
              `The Player with eeID ${eeID} was disconnected from the GameMap with GameMap__ID ${this.m__GameMap__ID}.`;
          }
        } catch(err) {
          console.warn(
            `The following error could occur when "l__PetitionToDisconnectPlayer" is undefined because it got deleted at "GameMap.disconnect_Player". It might be unrelated:\n${err}`
          );
        }
      }
    }

    const iterate_through_Players_and_handle_GameEntityEvent = (p__GameEntityEvent__ID : GameEntityEvent__ID) =>
    {
      this.#m__Players.forEach((l__Player : Player) => {
        l__Player.GameEntityEvents__handle(p__GameEntityEvent__ID, delta_time());
      });
    }

    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_forward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_backward);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.move_right);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_left);
    iterate_through_Players_and_handle_GameEntityEvent(GameEntityEvent__ID.steer_right);

    this.#m__Players.forEach((l__Player__source : Player) => {
      this.#m__Players.forEach((l__Player__target : Player) => {
        if (l__Player__target.eeID != l__Player__source.eeID) {
          WS_msg_Player.send__Sighting(
            l__Player__source,
            l__Player__target,
          );
        }
      });
    });

    {
      let m__Players_BufferIn__take__ReVa : (Player | undefined);
      while (
        (m__Players_BufferIn__take__ReVa = this.#m__Players_BufferIn.take()) !=
          undefined
      ) {
        const player_that_arrives = m__Players_BufferIn__take__ReVa!;

        this.#m__Players.set(
          player_that_arrives.eeID,
          player_that_arrives,
        );
      }
    }


    if (elapsed_ms() > max_ms) {
      console.warn(
        `The GameMap with ID ${this.m__GameMap__ID} took ${(elapsed_ms() - max_ms)}ms longer updating than it should have.`,
      );
    } else if (elapsed_ms() < min_ms) {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0) {
        await sleep(sleep_ms);
      }
    }

    this.#update__isLoopCompleted = true;

    return (elapsed_ms() - previous_loop_ms);
  }
  private async update__start() {
    if (this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = true;
    }

    let this__update__previous_loop_ms = 20;
    while (this.#update__isLoopRunning) {
      this__update__previous_loop_ms = await this.update(this__update__previous_loop_ms);
    }
  }
  private async update__stop() {
    if (this.#update__isLoopRunning) {
      await sleep(8000); // Wait for this.#m__Players_BufferIn and this.#m__Players_BufferOut to be empty.

      this.#update__isLoopRunning = false;

      while (!this.#update__isLoopCompleted) await sleep(20);
    } else {
      return;
    }
  }

  private static async g__GameMaps__open(
    g__GameMaps: Map<GameMap__ID, GameMap>,
    p__GameMap__ID: GameMap__ID,
  ) : Promise<void> {
    const l__GameMap__IDs = [...g__GameMaps.keys()];

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap__IDs.length)) {
      if (l__GameMap__IDs[i] == p__GameMap__ID) {
        found = true;
        break;
      } else {
        i++;
      }
    }

    if (found == true) {
      try {
        throw new TypeError(
          `Invalid GameMap.open() argument { p__GameMap__ID: ${p__GameMap__ID} } ~ Only one GameMap with the same GameMap__ID can exist at the same time.`,
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      g__GameMaps.set(
        p__GameMap__ID,
        new GameMap({ GameMap__ID: p__GameMap__ID }),
      );

      g__GameMaps.get(p__GameMap__ID)!.update__start();
    }
  }


  #m__isClosing = false;
  /**
   * 
   * Could collapse if several parts of the program try to close the same GameMap at the same time.
   * To fix, add a Mutex GameMap.#m__isClosing__mutex.
   * I don't think it's necessary as of yet.
   * 
  **/
  private static async g__GameMaps__close(
    g__GameMaps: Map<GameMap__ID, GameMap>,
    p__GameMap__ID: GameMap__ID,
  ) : Promise<void> {
    const l__GameMap = g__GameMaps.get(p__GameMap__ID)!;

    l__GameMap.#m__isClosing = true;

    await l__GameMap.#connect_Player__calls_in_progress__mutex.lock();
    while (l__GameMap.#connect_Player__calls_in_progress > 0) await sleep(20);
    while (l__GameMap.#m__Players_BufferIn.length > 0) await sleep(20);

    await l__GameMap.#disconnect_Player__calls_in_progress__mutex.lock();
    while (l__GameMap.#disconnect_Player__calls_in_progress > 0) await sleep(20);
    while (l__GameMap.#m__Players_BufferOut.length > 0) await sleep(20);

    await l__GameMap.update__stop();

    g__GameMaps.delete(p__GameMap__ID);
  }

  static async g__GameMaps__handler(
    g__GameMaps: Map<GameMap__ID, GameMap>,
    g__server__isRunning: boolean,
  ) : Promise<void> {
    (async () : Promise<void> =>
    {
      while (g__server__isRunning)
      {
        const begin_ms = time_stamp();
        const min_ms = 20;
        const max_ms = 40;

        const elapsed_ms = () : number => {
          return (time_stamp() - begin_ms);
        };


        g__GameMaps.forEach((l__GameMap: GameMap) => {
          let l__GameMap__Players_BufferOut__take__ReVa :
            // @ts-ignore
            (GameMap.Players_BufferOut__data__Ty | undefined);
          while (
            (l__GameMap__Players_BufferOut__take__ReVa = l__GameMap.#m__Players_BufferOut.take()) != undefined
          ) {
            if (
              l__GameMap__Players_BufferOut__take__ReVa.isToBeDisconnected
            ) {
              console.log(
                `The Player with eeID ${l__GameMap__Players_BufferOut__take__ReVa.Player.eeID} is to be disconnected from g__GameMaps. This option needs to be implemented.`,
              );
            } else {
              if (
                g__GameMaps.get(
                  l__GameMap__Players_BufferOut__take__ReVa
                    .GameMap__ID__target!,
                )! != undefined
              ) {
                g__GameMaps.get(
                  l__GameMap__Players_BufferOut__take__ReVa
                    .GameMap__ID__target!,
                )!.#m__Players_BufferIn.pass(
                  l__GameMap__Players_BufferOut__take__ReVa.Player,
                );
              }
            }
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


      // Should do this in a for loop for all opened GameMaps.
      await Promise.all([
        GameMap.g__GameMaps__close(g__GameMaps, GameMap__ID.Sandbox),
      ])
    })();


    GameMap.g__GameMaps__open(g__GameMaps, GameMap__ID.Sandbox);
  }
}
