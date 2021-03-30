import { Player, WS_msg_Player_ID } from "./Player.ts";

import { time_stamp } from "../vendor/utility/time_stamp.ts";
import { sleep } from "../vendor/utility/sleep.ts";

import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";
import { isWebSocketCloseEvent } from "https://deno.land/std@0.91.0/ws/mod.ts";

import { User } from "../SERVER/scripts/User.ts";

import { WS_msg__recv, WS_msg__send } from "../SERVER/scripts/websockets.ts";

export enum GameMap_ID {
  Sandbox,
}

export class GameMap {
  readonly m__GameMap_ID: GameMap_ID;

  #isRunning: boolean;

  #m__Players_Map: Map<number, Player>;

  // @ts-ignore
  #m__Players_BufferIn: GameMap.Players_BufferIn;
  // @ts-ignore
  #m__Players_BufferOut: GameMap.Players_BufferOut;

  constructor(p__GameMap_ID: GameMap_ID) {
    this.m__GameMap_ID = p__GameMap_ID;

    this.#isRunning = false;

    this.#m__Players_Map = new Map<number, Player>();

    this.#m__Players_BufferIn = new GameMap.Players_BufferIn();
    this.#m__Players_BufferOut = new GameMap.Players_BufferOut();
  }

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
              "Invalid GameMap.Players_BufferOut__data__Ty constructor call. The argument GameMap_ID__target needs to be provided when the argument isToBeDisconnected is false.",
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

  static connect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    player: Player,
  ): { status: Status } {
    if (g__GameMaps.get(p__GameMap_ID) == undefined) {
      return ({ status: Status.NotFound });
    } else {
      // @ts-ignore
      g__GameMaps.get(p__GameMap_ID).#m__Players_BufferIn.pass(player);

      return ({ status: Status.OK });
    }
  }

  static disconnect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    eeID: number,
  ): { status: Status } {
    const l__GameMap_IDs = [...g__GameMaps.keys()];
    let l__GameMap_ID: GameMap_ID;

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap_IDs.length)) {
      if (
        // @ts-ignore
        g__GameMaps.get(l__GameMap_IDs[i]).#m__Players_Map.get(eeID) ==
          undefined
      ) {
        i++;
      } else {
        found = true;
        l__GameMap_ID = l__GameMap_IDs[i];
        break;
      }
    }

    if (found == false) {
      return ({ status: Status.NotFound });
    } else {
      // @ts-ignore
      g__GameMaps.get(l__GameMap_ID).#m__Players_BufferOut.pass(
        new GameMap.Players_BufferOut__data__Ty(
          // @ts-ignore
          g__GameMaps.get(l__GameMap_ID).#m__Players_Map.get(eeID).player,
          true,
          undefined,
        ),
      );

      return ({ status: Status.OK });
    }
  }

  handle_socket_messages = async (user: User): Promise<void> => {
    for await (const msg_str of user.player.ws) {
      if (isWebSocketCloseEvent(msg_str)) {
        // ...

        break;
      } else {
        // recieve and handle socket messages
      }
    }
  };

  #update = async (): Promise<void> => {
    const begin_ms = time_stamp();
    const min_ms = 20;
    const max_ms = 40;

    const elapsed_ms = (): number => {
      return (time_stamp() - begin_ms);
    };
    const delta_time = (): number => {
      return (elapsed_ms() * 0.001);
    };

    this.#m__Players_Map.forEach((player_i: Player) => {
      this.#m__Players_Map.forEach((player_j: Player) => {
        if (player_j.eeID != player_i.eeID) {
          WS_msg__send(player_i.ws, {
            kind: "WS_msg_Player",
            id: WS_msg_Player_ID.Sighting,
            body: { p__Player: { eeID: player_j.eeID } },
          });
        }
      });
    });

    let m__Players_BufferIn__take__ReVa: (Player | undefined);
    while (
      (m__Players_BufferIn__take__ReVa = this.#m__Players_BufferIn.take()) !=
        undefined
    ) {
      const player_that_arrives = m__Players_BufferIn__take__ReVa;

      this.#m__Players_Map.set(
        player_that_arrives.eeID,
        player_that_arrives,
      );
      WS_msg__send(player_that_arrives.ws, {
        kind: "WS_msg_Player",
        id: WS_msg_Player_ID.Connection,
        body: {
          p__Player: { eeID: player_that_arrives.eeID },
          p__GameMap_ID: this.m__GameMap_ID,
        },
      });
      this.#m__Players_Map.forEach((player_that_was_already_here: Player) => {
        if (player_that_was_already_here.eeID != player_that_arrives.eeID) {
          WS_msg__send(player_that_was_already_here.ws, {
            kind: "WS_msg_Player",
            id: WS_msg_Player_ID.Sighting,
            body: { p__Player: { eeID: player_that_arrives.eeID } },
          });
        }
      });
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
  };
  run = async (): Promise<void> => {
    if (this.#isRunning) {
      return;
    } else {
      this.#isRunning = true;
    }

    while (this.#isRunning) {
      await this.#update();
    }
  };
  stop = (): void => {
    if (!this.#isRunning) {
      return;
    } else {
      this.#isRunning = false;
    }
  };

  static async g__GameMaps__handler(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__server__isRunning: boolean,
  ): Promise<void> {
    g__GameMaps.set(GameMap_ID.Sandbox, new GameMap(GameMap_ID.Sandbox));

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
          if (l__GameMap__Players_BufferOut__take__ReVa.m__isToBeDisconnected) {
            console.log(
              `The Player with eeID ${l__GameMap__Players_BufferOut__take__ReVa.m__Player.eeID} is to be disconnected from g__GameMaps. This option needs to be implemented.`,
            );
          } else {
            if (
              g__GameMaps.get(
                // @ts-ignore
                l__GameMap__Players_BufferOut__take__ReVa.m__GameMap_ID__target,
              ) != undefined
            ) {
              // @ts-ignore
              g__GameMaps.get(
                // @ts-ignore
                l__GameMap__Players_BufferOut__take__ReVa.m__GameMap_ID__target,
              ).#m__Players_BufferIn.pass(
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
    // safely close all GameMaps
  }
}
