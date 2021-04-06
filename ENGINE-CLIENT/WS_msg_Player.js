import {
  from_CLIENT_msg_to_CLIENT_obj__Player,
  GameMap,
  Player,
} from "../../ENGINE-CLIENT/mod.js";

import {
  g__GameMap,
  g__GameMap_ID__set,
  g__Player__set,
} from "../CLIENT/scripts/main.js";
import { WS_msg__recv, WS_msg__send } from "../CLIENT/scripts/websockets.js";

export var WS_msg_Player_ID;
(function (WS_msg_Player_ID) {
  WS_msg_Player_ID[WS_msg_Player_ID["Connection"] = 0] = "Connection";
  WS_msg_Player_ID[WS_msg_Player_ID["Sighting"] = 1] = "Sighting";
  WS_msg_Player_ID[WS_msg_Player_ID["Vanishing"] = 2] = "Vanishing";
  WS_msg_Player_ID[WS_msg_Player_ID["Takedown"] = 3] = "Takedown";
})(WS_msg_Player_ID || (WS_msg_Player_ID = {}));

export class WS_msg_Player {
  static async handle__WS_msg_Player__Connection__recv(
    g__ws_player,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Connection,
      (body) => {
        g__Player__set(body.p__Player);
        g__GameMap_ID__set(body.p__GameMap_ID);
      },
    );
  }

  static async handle__WS_msg_Player__Sighting__recv(
    g__ws_player,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Sighting,
      (body) => {
        console.log(
          from_CLIENT_msg_to_CLIENT_obj__Player(body.p__Player__source),
        );
      },
    );
  }

  static async handle__WS_msg_Player__Vanishing__recv(
    g__ws_player,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Vanishing,
      (body) => {
        console.log(
          from_CLIENT_msg_to_CLIENT_obj__Player(body.p__Player__source),
        );
      },
    );
  }

  static async handle__WS_msg_Player__Takedown__recv(
    g__ws_player,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Takedown,
      (body) => {
        console.log(
          from_CLIENT_msg_to_CLIENT_obj__Player(body.p__Player__source),
        );
      },
    );
  }
}
