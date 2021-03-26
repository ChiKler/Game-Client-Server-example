import { Player } from "./Player.ts";

import { time_stamp } from "../vendor/utility/time_stamp.ts";
import { sleep } from "../vendor/utility/sleep.ts";

import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";
import { isWebSocketCloseEvent } from "https://deno.land/std@0.91.0/ws/mod.ts";

import { User } from "../SERVER/scripts/User.ts";

export enum GameMap_ID {
  Sandbox,
}

export class GameMap {
  readonly m__GameMap_ID: GameMap_ID;

  #isRunning: boolean;

  m__Players: Map<string, Player>;

  // @ts-ignore
  m__Players_BufferIn: GameMap.Players_BufferIn;
  // @ts-ignore
  m__Players_BufferOut: GameMap.Players_BufferOut;

  constructor(p__GameMap_ID: GameMap_ID) {
    this.m__GameMap_ID = p__GameMap_ID;

    this.#isRunning = false;

    this.m__Players = new Map<string, Player>();

    this.m__Players_BufferIn = new GameMap.Players_BufferIn();
    this.m__Players_BufferOut = new GameMap.Players_BufferOut();
  }

  static Players_BufferIn = class {
    #data: Array<Player>; // should use ArrayBuffer as buffer and Uint8Array as view

    constructor() {
      this.#data = new Array<Player>();
    }

    pass(player: Player): number {
      return (this.#data.push(player));
    }
    take(): Player {
      return (this.#data[this.#data.length - 1]);
    }
    read(): void { // take callback, do forEach
    }
  };
  static Players_BufferOut = class<
    T extends {
      player: Player;
      isToBeDisconnected: boolean;
      GameMap__target: (GameMap_ID | undefined);
    },
  > {
    #data: Array<T>; // should use ArrayBuffer as buffer and Uint8Array as view

    constructor() {
      this.#data = new Array<T>();
    }

    pass(t: T): number {
      return (this.#data.push(t));
    }
    take(): T {
      return (this.#data[this.#data.length - 1]);
    }
    read(): void { // take callback, do forEach
    }
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
      g__GameMaps.get(p__GameMap_ID).m__Players_BufferIn.pass(player);

      return ({ status: Status.OK });
    }
  }

  static disconnect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    uuID: string,
  ): { status: Status } {
    const l__GameMap_IDs = [...g__GameMaps.keys()];
    let l__GameMap_ID: GameMap_ID;

    let found = false;
    let i = 0;

    while ((found == false) && (i < l__GameMap_IDs.length)) {
      if (
        // @ts-ignore
        g__GameMaps.get(l__GameMap_IDs[i]).m__Players.get(uuID) == undefined
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
      g__GameMaps.get(p__GameMap_ID).m__Players_BufferOut.pass({
        // @ts-ignore
        player: this.m__Players.get(uuID).player,
        isToBeDisconnected: true,
        GameMap__target: undefined,
      });

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

    ///

    ///

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
}
