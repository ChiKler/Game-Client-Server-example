// @ts-ignore
import { Status } from "https://deno.land/std@0.92.0/http/http_status.ts";
import {
  isWebSocketCloseEvent,
  WebSocket,
  // @ts-ignore
} from "https://deno.land/std@0.92.0/ws/mod.ts";

// @ts-ignore
import { Player } from "./Player.ts";
// @ts-ignore
import { WS_msg_Player } from "./WS_msg_Player.ts";
// @ts-ignore
import { Mutex, sleep, time_stamp } from "../vendor/utility/mod.ts";

export enum GameMap_ID {
  Sandbox,
}

export class GameMap {
  static Players_Buffer = class<T> {
    #data: Array<T>; // should use ArrayBuffer as buffer and Uint8Array as view

    constructor() {
      this.#data = new Array<T>();
    }

    pass(t: T): number {
      return (this.#data.push(t));
    }
    take(): (T | undefined) {
      return (this.#data.pop());
    }
  };
  static Players_BufferIn = class extends GameMap.Players_Buffer<Player> {
  };
  static Players_BufferOut__data__Ty = class {
    m__Player: Player;
    m__isToBeDisconnected: boolean;
    m__GameMap_ID__target: (GameMap_ID | undefined);

    constructor(
      p__Player: Player,
      p__isToBeDisconnected: boolean,
      p__GameMap_ID__target?: GameMap_ID,
    ) {
      this.m__Player = p__Player;
      this.m__isToBeDisconnected = p__isToBeDisconnected;

      if (p__isToBeDisconnected) {
        this.m__GameMap_ID__target = undefined;
      } else {
        if (p__GameMap_ID__target == undefined) {
          try {
            throw new TypeError(
              `Invalid "GameMap.Players_BufferOut__data__Ty" constructor call. The argument "GameMap_ID__target" needs to be provided when the argument "isToBeDisconnected" is false.`,
            );
          } catch (err) {
            console.error(err);
          }
        } else {
          this.m__GameMap_ID__target = p__GameMap_ID__target;
        }
      }
    }
  };
  static Players_BufferOut = class extends // @ts-ignore
  GameMap.Players_Buffer<GameMap.Players_BufferOut__data__Ty> {
  };

  static PetitionToDisconnectPlayer = class {
    hasBeenDisconnected: boolean;

    status?: Status;
    status_message?: string;

    constructor() {
      this.hasBeenDisconnected = false;
    }
  };

  readonly m__GameMap_ID: GameMap_ID;

  #m__Players_Map: Map<number, Player>;

  // @ts-ignore
  #m__Players_BufferIn: GameMap.Players_BufferIn;
  // @ts-ignore
  #m__Players_BufferOut: GameMap.Players_BufferOut;

  #m__PetitionsToDisconnectPlayer_Map: Map<
    number,
    // @ts-ignore
    GameMap.PetitionToDisconnectPlayer
  >;

  private constructor(p__GameMap_ID: GameMap_ID) {
    this.m__GameMap_ID = p__GameMap_ID;

    this.#m__Players_Map = new Map<number, Player>();

    this.#m__Players_BufferIn = new GameMap.Players_BufferIn();
    this.#m__Players_BufferOut = new GameMap.Players_BufferOut();

    this.#m__PetitionsToDisconnectPlayer_Map = new Map<
      number,
      // @ts-ignore
      GameMap.PetitionToDisconnectPlayer
    >();
  }

  #connect__Player__calls_in_progress = 0;
  #connect__Player__calls_in_progress__mutex = new Mutex();
  static async connect__Player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    player: Player,
  ): Promise<{ status: Status; status_message: string }> {
    let l__GameMap: GameMap;

    let l__GameMap__connect__Player__calls_in_progress__mutex__unlock:
      ((() => void) | undefined) = undefined;

    let l__GameMap__wasAlreadyClosed = false;

    try {
      l__GameMap__connect__Player__calls_in_progress__mutex__unlock =
        await g__GameMaps.get(p__GameMap_ID)!
          .#connect__Player__calls_in_progress__mutex.lock();

      if (g__GameMaps.get(p__GameMap_ID)!.#m__isClosing) {
        l__GameMap__wasAlreadyClosed = true;
        l__GameMap__connect__Player__calls_in_progress__mutex__unlock!();
      } else {
        l__GameMap = g__GameMaps.get(p__GameMap_ID)!;
      }
    } catch {
      l__GameMap__wasAlreadyClosed = true;
      if (
        l__GameMap__connect__Player__calls_in_progress__mutex__unlock !=
          undefined
      ) {
        l__GameMap__connect__Player__calls_in_progress__mutex__unlock!();
      }
    }

    if (l__GameMap__wasAlreadyClosed) {
      return ({
        status: Status.NotFound,
        status_message:
          `The GameMap with GameMap_ID ${p__GameMap_ID} wasn't found. Could not connect the Player with eeID ${player.eeID}.`,
      });
    } else {
      ++l__GameMap!.#connect__Player__calls_in_progress;
      l__GameMap__connect__Player__calls_in_progress__mutex__unlock!();

      l__GameMap!.#m__Players_BufferIn.pass(player);

      --l__GameMap!.#connect__Player__calls_in_progress;
      return ({
        status: Status.OK,
        status_message:
          `The Player with eeID ${player.eeID} has been connected to the GameMap with GameMap_ID ${p__GameMap_ID}.`,
      });
    }
  }

  #disconnect__Player__calls_in_progress = 0;
  #disconnect__Player__calls_in_progress__mutex = new Mutex();
  static async disconnect__Player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    eeID: number,
  ): Promise<{ status: Status; status_message: string }> {
    let l__GameMap: GameMap;

    const l__GameMap_IDs = [...g__GameMaps.keys()];
    let l__GameMap_ID: GameMap_ID;

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap_IDs.length)) {
      let l__GameMap__wasAlreadyClosed = false;

      let l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock:
        ((() => void) | undefined) = undefined;

      try {
        l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock =
          await g__GameMaps.get(l__GameMap_IDs[i])!
            .#disconnect__Player__calls_in_progress__mutex.lock();

        if (g__GameMaps.get(l__GameMap_IDs[i])!.#m__isClosing) {
          l__GameMap__wasAlreadyClosed = true;
          l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock!();
          l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock =
            undefined;
        } else {
          l__GameMap = g__GameMaps.get(l__GameMap_IDs[i])!;
        }
      } catch {
        l__GameMap__wasAlreadyClosed = true;
        if (
          l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock !=
            undefined
        ) {
          l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock!();
          l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock =
            undefined;
        }
      }

      if (!l__GameMap__wasAlreadyClosed) {
        ++l__GameMap!.#disconnect__Player__calls_in_progress;
        l__GameMap__disconnect__Player__calls_in_progress__mutex__unlock!();

        if (
          l__GameMap!.#m__Players_Map.get(eeID) ==
            undefined
        ) {
          i++;
        } else {
          found = true;
          l__GameMap_ID = l__GameMap_IDs[i];
          break;
        }
      }
    }

    if (found == false) {
      return ({
        status: Status.NotFound,
        status_message:
          `The Player with eeID ${eeID} wasn't found on any GameMap.`,
      });
    } else {
      l__GameMap!.#m__PetitionsToDisconnectPlayer_Map.set(
        eeID,
        new GameMap.PetitionToDisconnectPlayer(),
      );

      while (
        !l__GameMap!.#m__PetitionsToDisconnectPlayer_Map
          .get(eeID)!.hasBeenDisconnected
      ) {
        await sleep(20); // if possible I'd prefer doing something with a Promise instead of using a while loop
      }

      const l__PetitionToDisconnectPlayer = l__GameMap!
        .#m__PetitionsToDisconnectPlayer_Map.get(eeID)!;

      l__GameMap!.#m__PetitionsToDisconnectPlayer_Map
        .delete(eeID);

      --l__GameMap!.#disconnect__Player__calls_in_progress;
      return ({
        status: l__PetitionToDisconnectPlayer.status!,
        status_message: l__PetitionToDisconnectPlayer.status_message!,
      });
    }
  }

  handle_socket_messages = async (
    player_that_arrives: Player,
    ws_player: WebSocket,
  ): Promise<void> => {
    try {
      WS_msg_Player.handle__WS_msg_Player__Connection__send(
        player_that_arrives,
        this.m__GameMap_ID,
      );

      this.#m__Players_Map.forEach((player_that_was_already_here: Player) => {
        if (player_that_was_already_here.eeID != player_that_arrives.eeID) {
          WS_msg_Player.handle__WS_msg_Player__Sighting__send(
            player_that_arrives,
            player_that_was_already_here,
          );
        }
      });
    } catch {}

    for await (const msg_str of ws_player) {
      if (isWebSocketCloseEvent(msg_str)) {
        // ...

        break;
      } else {
        // receive and handle socket messages
      }
    }
  };

  #update__isLoopRunning = false;
  #update__isLoopCompleted = true;
  private async update() {
    this.#update__isLoopCompleted = false;

    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = (): number => {
      return (time_stamp() - begin_ms);
    };
    const delta_time = (): number => {
      return (elapsed_ms() * 0.001);
    };

    const m__PetitionsToDisconnectPlayer_Map__keys = [
      ...this.#m__PetitionsToDisconnectPlayer_Map.keys(),
    ];

    for (let i = 0; i < m__PetitionsToDisconnectPlayer_Map__keys.length; i++) {
      try {
        const eeID = m__PetitionsToDisconnectPlayer_Map__keys[i];

        const l__PetitionToDisconnectPlayer = this
          .#m__PetitionsToDisconnectPlayer_Map.get(eeID)!;
        const l__Player__to_be_disconnected = this.#m__Players_Map.get(eeID)!;

        this.#m__Players_Map.delete(eeID);

        this.#m__Players_BufferOut.pass(
          new GameMap.Players_BufferOut__data__Ty(
            l__Player__to_be_disconnected,
            true,
            undefined,
          ),
        );

        l__PetitionToDisconnectPlayer.status = Status.OK;
        l__PetitionToDisconnectPlayer.status_message =
          `The Player with eeID ${eeID} was disconnected from the GameMap with GameMap_ID ${this.m__GameMap_ID}.`;

        l__PetitionToDisconnectPlayer.hasBeenDisconnected = true;
      } catch (err) {
        // this happens when m__PetitionsToDisconnectPlayer_Map.get(eeID)
        // is undefined because it got deleted at GameMap.disconnect_player()
        // (do nothing with the error, just catch it)
      }
    }

    this.#m__Players_Map.forEach((l__Player__source: Player) => {
      this.#m__Players_Map.forEach((l__Player__target: Player) => {
        if (l__Player__target.eeID != l__Player__source.eeID) {
          WS_msg_Player.handle__WS_msg_Player__Sighting__send(
            l__Player__source,
            l__Player__target,
          );
        }
      });
    });

    let m__Players_BufferIn__take__ReVa: (Player | undefined);
    while (
      (m__Players_BufferIn__take__ReVa = this.#m__Players_BufferIn.take()) !=
        undefined
    ) {
      const player_that_arrives = m__Players_BufferIn__take__ReVa!;

      this.#m__Players_Map.set(
        player_that_arrives.eeID,
        player_that_arrives,
      );
    }

    if (elapsed_ms() > max_ms) {
      console.warn(
        `The GameMap with ID ${this.m__GameMap_ID} took ${(elapsed_ms() -
          max_ms)}ms longer updating than it should have.`,
      );
    } else if (elapsed_ms() < min_ms) {
      const sleep_ms = (min_ms - elapsed_ms());
      if (sleep_ms > 0) {
        await sleep(sleep_ms);
      }
    }

    this.#update__isLoopCompleted = true;
  }
  private async update__start() {
    if (this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = true;
    }

    while (this.#update__isLoopRunning) {
      await this.update();
    }
  }
  private async update__stop() {
    if (!this.#update__isLoopRunning) {
      return;
    } else {
      this.#update__isLoopRunning = false;
    }

    while (!this.#update__isLoopCompleted) await sleep(20);

    await sleep(8000); // wait for all the players to be safely moved into this.#m__Players_BufferOut // e.g. a player is still in combat
  }

  private static async g__GameMaps__open(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
  ): Promise<void> {
    const l__GameMap_IDs = [...g__GameMaps.keys()];

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap_IDs.length)) {
      if (l__GameMap_IDs[i] == p__GameMap_ID) {
        found = true;
        break;
      } else {
        i++;
      }
    }

    if (found == true) {
      try {
        throw new TypeError(
          `Invalid GameMap.open() argument { p__GameMap_ID: ${p__GameMap_ID} } ~ Only one GameMap with the same GameMap_ID can exist at the same time.`,
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      g__GameMaps.set(p__GameMap_ID, new GameMap(p__GameMap_ID));
    }
  }

  #m__isClosing = false;
  private static async g__GameMaps__close(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
  ): Promise<void> {
    if (g__GameMaps.get(p__GameMap_ID) == undefined) return;
    const l__GameMap = g__GameMaps.get(p__GameMap_ID)!;

    l__GameMap.#m__isClosing = true;

    await l__GameMap.#connect__Player__calls_in_progress__mutex.lock();
    await l__GameMap.#disconnect__Player__calls_in_progress__mutex.lock();

    while (l__GameMap.#connect__Player__calls_in_progress > 0) {
      await sleep(20);
    }
    while (l__GameMap.#disconnect__Player__calls_in_progress > 0) {
      await sleep(20);
    }

    await l__GameMap.update__stop();

    while (l__GameMap.#m__Players_BufferIn.length > 0) await sleep(20);
    while (l__GameMap.#m__Players_BufferOut.length > 0) await sleep(20);

    g__GameMaps.delete(p__GameMap_ID);
  }

  static async g__GameMaps__handler(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__server__isRunning: boolean,
  ): Promise<void> {
    const handler_loop = async (): Promise<void> => {
      while (g__server__isRunning) {
        const begin_ms = time_stamp();
        const min_ms = 20;
        const max_ms = 40;

        const elapsed_ms = (): number => {
          return (time_stamp() - begin_ms);
        };

        g__GameMaps.forEach((l__GameMap: GameMap) => {
          let l__GameMap__Players_BufferOut__take__ReVa:
            // @ts-ignore
            (GameMap.Players_BufferOut__data__Ty | undefined);
          while (
            (l__GameMap__Players_BufferOut__take__ReVa = l__GameMap
              .#m__Players_BufferOut.take()) !=
              undefined
          ) {
            if (
              l__GameMap__Players_BufferOut__take__ReVa.m__isToBeDisconnected
            ) {
              console.log(
                `The Player with eeID ${l__GameMap__Players_BufferOut__take__ReVa.m__Player.eeID} is to be disconnected from g__GameMaps. This option needs to be implemented.`,
              );
            } else {
              if (
                g__GameMaps.get(
                  l__GameMap__Players_BufferOut__take__ReVa
                    .m__GameMap_ID__target!,
                )! != undefined
              ) {
                g__GameMaps.get(
                  l__GameMap__Players_BufferOut__take__ReVa
                    .m__GameMap_ID__target!,
                )!.#m__Players_BufferIn.pass(
                  l__GameMap__Players_BufferOut__take__ReVa.m__Player,
                );
              }
            }
          }
        });

        if (elapsed_ms() > max_ms) {
          console.warn(
            `GameMap.g__GameMaps__handler took ${(elapsed_ms() -
              max_ms)}ms longer handling than it should have.`,
          );
        } else if (elapsed_ms() < min_ms) {
          const sleep_ms = (min_ms - elapsed_ms());
          if (sleep_ms > 0) {
            await sleep(sleep_ms);
          }
        }
      }
    };

    await Promise.all([
      GameMap.g__GameMaps__open(g__GameMaps, GameMap_ID.Sandbox),
    ]);

    await Promise.all([
      handler_loop(),
      g__GameMaps.get(GameMap_ID.Sandbox)!.update__start(),
    ]);

    // safely close all GameMaps
  }
}
