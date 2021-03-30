import { GameEntity, GameMap, GameMap_ID, Player } from "../../ENGINE/mod.ts";

import { Status } from "https://deno.land/std@0.91.0/http/http_status.ts";
import { v4 } from "https://deno.land/std@0.91.0/uuid/mod.ts";
import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";

export class User {
  readonly uuID: string;
  ssID: string;

  player: Player;

  #isConnected: boolean;

  constructor(uuID: string, ssID: string, player: Player) {
    this.uuID = uuID;
    this.ssID = ssID;

    this.player = player;

    this.#isConnected = false;
  }

  static connect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    g__Users: Map<string, User>,
    uuID: string,
    wasUserAlreadyConnected: boolean,
  ): { status: Status } {
    if (wasUserAlreadyConnected) {
      return ({ status: Status.OK });
    } else {
      // @ts-ignore
      const l__GameMap__connect_player__ReVa = GameMap.connect_player(
        g__GameMaps,
        p__GameMap_ID,
        // @ts-ignore
        g__Users.get(uuID).player,
      );

      if (l__GameMap__connect_player__ReVa.status == Status.OK) {
        // @ts-ignore
        g__GameMaps.get(GameMap_ID.Sandbox).handle_socket_messages(
          // @ts-ignore
          g__Users.get(uuID),
        );
      }

      return ({ status: l__GameMap__connect_player__ReVa.status });
    }
  }
  static async connect(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    p__GameMap_ID: GameMap_ID,
    g__Users: Map<string, User>,
    uuID: string,
    player_ws__new: WebSocket,
  ): Promise<{
    status: Status;
    wasUserAlreadyConnected: boolean;
    player_ws__old: (WebSocket | undefined);
  }> {
    const ssID = v4.generate();

    // @ts-ignore
    const wasUserAlreadyConnected =
      ((g__Users.get(uuID) == undefined) ? false : // @ts-ignore
        g__Users.get(uuID).#isConnected);

    let player: Player;
    let player_ws__old: (WebSocket | undefined);

    if (wasUserAlreadyConnected) {
      // @ts-ignore
      player = g__Users.get(uuID).player;
      player_ws__old = player.ws;
      player.ws = player_ws__new;
    } else {
      player_ws__old = undefined;
      player = new Player(
        await GameEntity.eeID_generate(1),
        player_ws__new,
      );
    }

    g__Users.set(uuID, new User(uuID, ssID, player));

    const l__User__connect_player__ReVa = User.connect_player(
      g__GameMaps,
      p__GameMap_ID,
      g__Users,
      uuID,
      wasUserAlreadyConnected,
    );

    // @ts-ignore
    g__Users.get(uuID).#isConnected = true;

    return ({
      status: l__User__connect_player__ReVa.status,
      wasUserAlreadyConnected,
      player_ws__old,
    });
  }

  static disconnect_player(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ): { status: Status } {
    const l__GameMap__disconnect_player__ReVa = GameMap.disconnect_player(
      g__GameMaps,
      // @ts-ignore
      g__Users.get(uuID).player.eeID,
    );

    if (l__GameMap__disconnect_player__ReVa.status == Status.OK) {
      g__Users.delete(uuID);
      // @ts-ignore
      g__Users.get(uuID).#isConnected = false;
    }

    return ({ status: l__GameMap__disconnect_player__ReVa.status });
  }
  static disconnect(
    g__GameMaps: Map<GameMap_ID, GameMap>,
    g__Users: Map<string, User>,
    uuID: string,
  ) {
    if (g__Users.get(uuID) == undefined) {
      return ({ status: Status.NotFound });
    } // @ts-ignore
    else if (g__Users.get(uuID).#isConnected) {
      const l__User__disconnect_player__ReVa = User.disconnect_player(
        g__GameMaps,
        g__Users,
        uuID,
      );

      return ({ status: l__User__disconnect_player__ReVa.status });
    } else {
      return ({ status: Status.Conflict });
    }
  }
}
