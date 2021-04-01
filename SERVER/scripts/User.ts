import {
  GameEntity,
  GameMap,
  GameMap_ID,
  Player,
  // @ts-ignore
} from "../../ENGINE-SERVER/mod.ts";

// @ts-ignore
import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";
// @ts-ignore
import { v4 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";

export class User {
  readonly uuID: string;
  readonly ssID: string;

  #ws_player?: WebSocket;
  //#ws_chat? : WebSocket;

  #player?: Player;

  #isConnected: boolean;

  private constructor(uuID: string, ssID: string, player?: Player) {
    this.uuID = uuID;
    this.ssID = ssID;

    this.#ws_player = undefined;
    //this.#ws_chat = undefined;

    this.#player = player;

    this.#isConnected = false;
  }

  set ws_player(ws_player: WebSocket) {
    this.#ws_player = ws_player;
  }

  static async connect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID);

    if ((user == undefined) || (!user!.#isConnected)) {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else if (user!.#ws_player == undefined) {
      return ({
        status: Status.Conflict,
        status_message:
          `The User with uuID ${uuID} doesn't have a WebSocket for their Player.`,
      });
    } else {
      if (user!.#player == undefined) {
        user!.#player = new Player(
          await GameEntity.eeID_generate(1),
          user!.#ws_player!,
        );

        const l__GameMap__connect_player__ReVa = GameMap.connect_player(
          g__GameMaps,
          p__GameMap_ID,
          user.#player,
        );

        if (l__GameMap__connect_player__ReVa.status == Status.OK) {
          g__GameMaps.get(GameMap_ID.Sandbox)!.handle_socket_messages(
            user.#player,
          );
        }

        return ({
          status: l__GameMap__connect_player__ReVa.status,
          status_message: l__GameMap__connect_player__ReVa.status_message,
        });
      } else {
        g__GameMaps.get(GameMap_ID.Sandbox)!.handle_socket_messages(
          user.#player,
        );

        return ({
          status: Status.OK,
          status_message:
            `The User with uuID ${uuID} already had their Player connected.`,
        });
      }
    }
  }
  static async connect_user(
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{
    status: Status;
    status_message: string;
    wasUserAlreadyConnected: boolean;
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

    g__Users.set(uuID, new User(uuID, ssID, player));

    g__Users.get(uuID)!.#isConnected = true;

    return ({
      status: Status.OK,
      status_message: `The User with uuID ${uuID} has been connected.`,
      wasUserAlreadyConnected,
    });
  }

  static async disconnect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID)!;

    if (user.#player == undefined) {
      return ({
        status: Status.Conflict,
        status_message:
          `The Player of the User with uuID ${uuID} wasn't connected.`,
      });
    }

    const l__GameMap__disconnect_player__ReVa = await GameMap.disconnect_player(
      g__GameMaps,
      user.#player!.eeID,
    );

    if (l__GameMap__disconnect_player__ReVa.status == Status.OK) {
      g__Users.delete(uuID);
    }

    return ({
      status: l__GameMap__disconnect_player__ReVa.status,
      status_message: l__GameMap__disconnect_player__ReVa.status_message,
    });
  }
  static async disconnect_user(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ): Promise<{ status: Status; status_message: string }> {
    const user = g__Users.get(uuID)!;

    if (user == undefined) {
      return ({
        status: Status.NotFound,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else if (user.#isConnected) {
      const l__User__disconnect_player__ReVa = await User.disconnect_player(
        g__GameMaps,
        g__Users,
        uuID,
      );

      return ({
        status: l__User__disconnect_player__ReVa.status,
        status_message: l__User__disconnect_player__ReVa.status_message,
      });
    } else {
      return ({
        status: Status.Conflict,
        status_message: `The User with uuID ${uuID} wasn't connected.`,
      });
    }
  }
}
