import { GameEntity__from_SERVER_msg } from "./GameEntity__from_SERVER_msg.js";

import { GameMap } from "./GameMap.js";

import { Player } from "./Player.js";

import { Player__from_SERVER_msg } from "./Player__from_SERVER_msg.js";

import { WS_msg } from "../CLIENT/scripts/websockets.js";





export var WS_msg_Player_ID;
(function (WS_msg_Player_ID) {
  WS_msg_Player_ID[WS_msg_Player_ID["Connection"] = 0] = "Connection";
  WS_msg_Player_ID[WS_msg_Player_ID["Disconnection"] = 1] = "Disconnection";
  WS_msg_Player_ID[WS_msg_Player_ID["Sighting"] = 2] = "Sighting";
  WS_msg_Player_ID[WS_msg_Player_ID["Vanishing"] = 3] = "Vanishing";
  WS_msg_Player_ID[WS_msg_Player_ID["Takedown"] = 4] = "Takedown";
})(WS_msg_Player_ID || (WS_msg_Player_ID = {}));

export class WS_msg_Player {
  static async recv_Connection(
    g__ws_player__get,
    g__GameMap__get,
    g__GameMap__set,
    g__Player__get,
    g__Player__set,
    g__cvs,
    g__ctx
  ) {
    WS_msg.recv(
      g__ws_player__get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Connection,
      (msg__body) =>
      {
        GameMap.open_g__GameMap(
          g__GameMap__get,
          g__GameMap__set,
          g__Player__set,
          g__Player__get,
          g__cvs,
          g__ctx,
          msg__body.GameMap_origin__ID,
          Player__from_SERVER_msg(msg__body.Player_source)
        );
      },
    );
  }

  static async recv_Disconnection(
    g__ws_player__get,
    g__GameMap__get,
    g__GameMap__set,
    g__Player__set
  ) {
    WS_msg.recv(
      g__ws_player__get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Disconnection,
      (msg__body) =>
      {
        GameMap.close_g__GameMap(
          g__GameMap__get,
          g__GameMap__set,
          g__Player__set
        );
      },
    );
  }

  static async recv_Sighting(
    g__ws_player__get,
    g__GameMap__get,
  ) {
    WS_msg.recv(
      g__ws_player__get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Sighting,
      (msg__body) =>
      {
        const GameEntity_source =
          GameEntity__from_SERVER_msg(msg__body.GameEntity_source);
        
        if (GameEntity_source instanceof Player) {
          g__GameMap__get().connect_Player(GameEntity_source);
        } else {
          throw (new TypeError());
        }
      },
    );
  }

  static async recv_Vanishing(
    g__ws_player__get,
    g__GameMap__get,
  ) {
    WS_msg.recv(
      g__ws_player__get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Vanishing,
      (msg__body) =>
      {
        const GameEntity_source =
          GameEntity__from_SERVER_msg(msg__body.GameEntity_source);

        if (GameEntity_source instanceof Player) {
          g__GameMap__get().disconnect_Player(GameEntity_source);
        } else {
          throw (new TypeError());
        }
      },
    );
  }

  static async recv_Takedown(
    g__ws_player__get,
    g__GameMap__get,
  ) {
    WS_msg.recv(
      g__ws_player__get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Takedown,
      (msg__body) => {
        console.log(
          {
            kind: "WS_msg_Player",
            id: WS_msg_Player_ID.Takedown,
            msg__body,
          },
        );
      },
    );
  }
}
