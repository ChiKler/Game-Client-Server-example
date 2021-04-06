import {
  Character,
  GameEntity,
  GameMap,
  GameMap_ID,
  Player,
  // @ts-ignore
} from "../../ENGINE-SERVER/mod.ts";

// @ts-ignore
import { Status } from "https://deno.land/std@0.92.0/http/http_status.ts";
// @ts-ignore
import { v4 } from "https://deno.land/std@0.92.0/uuid/mod.ts";
// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.92.0/ws/mod.ts";

// @ts-ignore
import { Mutex } from "../../vendor/utility/mod.ts";

export class User {
  readonly uuID: string;
  readonly ssID: string;

  #ws_player?: WebSocket;
  //#ws_chat? : WebSocket;

  #player?: Player;

  #isConnected: boolean;
  #isConnected__mutex: Mutex;

  private constructor(uuID: string, ssID: string, player?: Player) {
    this.uuID = uuID;
    this.ssID = ssID;

    this.#ws_player = undefined;
    //this.#ws_chat = undefined;

    this.#player = player;

    this.#isConnected = false;
    this.#isConnected__mutex = new Mutex();
  }

  static async connect_user(
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{
    status: Status;
    status_message: string;
  }> {
    const ssID = v4.generate();

    const wasUserAlreadyConnected =
      ((g__Users.get(uuID) == undefined)
        ? false
        : g__Users.get(uuID)!.#isConnected);

    let player: (Player | undefined);

    if (wasUserAlreadyConnected) {
      player = g__Users.get(uuID)!.#player!;
    } else {
      player = undefined;
    }

    const user = new User(uuID, ssID, player);

    const user__isConnected__mutex__unlock = await user.#isConnected__mutex
      .lock();

    g__Users.set(uuID, user);

    user.#isConnected = true;

    user__isConnected__mutex__unlock();

    if (wasUserAlreadyConnected) {
      return ({
        status: Status.OK,
        status_message:
          `The User with uuID ${uuID} had already been connected.`,
      });
    } else {
      return ({
        status: Status.OK,
        status_message: `The User with uuID ${uuID} has been connected.`,
      });
    }
  }

  static async ws_player__set(
    g__Users: Map<string, User>,
    uuID: string,
    ws_player__new: WebSocket,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID);

    if (user == undefined) {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      let user__isConnected__mutex__unlock: () => void;
      try {
        user__isConnected__mutex__unlock = await user.#isConnected__mutex
          .lock();
      } catch {
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      }

      user!.#ws_player = ws_player__new;

      user__isConnected__mutex__unlock();
      return ({
        status: Status.OK,
        status_message:
          `The User with uuID ${uuID} has been assigned a WebSocket to its "ws_player" property.`,
      });
    }
  }
  static async connect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID);

    if (user == undefined) {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      let user__isConnected__mutex__unlock: () => void;
      try {
        user__isConnected__mutex__unlock = await user.#isConnected__mutex
          .lock();
      } catch {
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      }

      if (!user!.#isConnected) {
        user__isConnected__mutex__unlock();
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      } else if (user!.#ws_player == undefined) {
        user__isConnected__mutex__unlock();
        return ({
          status: Status.Conflict,
          status_message:
            `The User with uuID ${uuID} doesn't have a WebSocket for their Player.`,
        });
      } else {
        const l__GameMap = g__GameMaps.get(GameMap_ID.Sandbox)!;

        if (user!.#player == undefined) {
          user!.#player = new Player(
            await GameEntity.eeID_generate(1),
            new Character(
              0,
              0,
              0,
              (
                (uuID == "Jane") ? "Red" : ((uuID == "John") ? "Green" : "Blue")
              ),
            ),
            user!.#ws_player!,
          );

          const l__GameMap__connect_player__ReVa = GameMap.connect_player(
            g__GameMaps,
            p__GameMap_ID,
            user!.#player!,
          );

          if (l__GameMap__connect_player__ReVa.status == Status.OK) {
            l__GameMap.handle_socket_messages(
              user!.#ws_player!,
            );
          }

          user__isConnected__mutex__unlock();
          return ({
            status: l__GameMap__connect_player__ReVa.status,
            status_message: l__GameMap__connect_player__ReVa.status_message,
          });
        } else {
          user!.#player!.ws_player = user!.#ws_player!;

          l__GameMap.handle_socket_messages(
            user!.#ws_player!,
          );

          user__isConnected__mutex__unlock();
          return ({
            status: Status.OK,
            status_message:
              `The User with uuID ${uuID} already had their Player connected.`,
          });
        }
      }
    }
  }

  static async disconnect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID);

    if (user == undefined) {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      let user__isConnected__mutex__unlock: () => void;
      try {
        user__isConnected__mutex__unlock = await user.#isConnected__mutex
          .lock();
      } catch {
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      }

      if (!user!.#isConnected) {
        user__isConnected__mutex__unlock();
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      } else if (user!.#player == undefined) {
        user__isConnected__mutex__unlock();
        return ({
          status: Status.Conflict,
          status_message:
            `The Player of the User with uuID ${uuID} wasn't connected.`,
        });
      } else {
        const l__GameMap__disconnect_player__ReVa = await GameMap
          .disconnect_player(
            g__GameMaps,
            user!.#player!.eeID,
          );

        user__isConnected__mutex__unlock();
        return ({
          status: l__GameMap__disconnect_player__ReVa.status,
          status_message: l__GameMap__disconnect_player__ReVa.status_message,
        });
      }
    }
  }
  static async disconnect_user(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID);

    if (user == undefined) {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      let user__isConnected__mutex__unlock: () => void;
      try {
        user__isConnected__mutex__unlock = await user.#isConnected__mutex
          .lock();
      } catch {
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      }

      if (!user!.#isConnected) {
        user__isConnected__mutex__unlock();
        return ({
          status: Status.Conflict,
          status_message: `The User with uuID ${uuID} wasn't connected.`,
        });
      } else {
        user__isConnected__mutex__unlock();
        const l__User__disconnect_player__ReVa = await User.disconnect_player(
          g__GameMaps,
          g__Users,
          uuID,
        );
        user__isConnected__mutex__unlock = await user.#isConnected__mutex
          .lock();

        if (
          (l__User__disconnect_player__ReVa.status == Status.OK) ||
          (l__User__disconnect_player__ReVa.status == Status.Conflict)
        ) {
          g__Users.delete(uuID);
          user__isConnected__mutex__unlock();
          return ({
            status: Status.OK,
            status_message: `The User with uuID ${uuID} has been disconnected.`,
          });
        } else {
          user__isConnected__mutex__unlock();
          return ({
            status: l__User__disconnect_player__ReVa.status,
            status_message: l__User__disconnect_player__ReVa.status_message,
          });
        }
      }
    }
  }
}
