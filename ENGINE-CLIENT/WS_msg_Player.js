import {
  from_CLIENT_msg_to_CLIENT_obj__Player,
  GameMap,
  Player,
} from "../../ENGINE-CLIENT/mod.js";

import { WS_msg__recv, WS_msg__send } from "../CLIENT/scripts/websockets.js";

export var WS_msg_Player_ID;
(function (WS_msg_Player_ID) {
  WS_msg_Player_ID[WS_msg_Player_ID["Connection"] = 0] = "Connection";
  WS_msg_Player_ID[WS_msg_Player_ID["Disconnection"] = 1] = "Disconnection";
  WS_msg_Player_ID[WS_msg_Player_ID["Sighting"] = 2] = "Sighting";
  WS_msg_Player_ID[WS_msg_Player_ID["Vanishing"] = 3] = "Vanishing";
  WS_msg_Player_ID[WS_msg_Player_ID["Takedown"] = 4] = "Takedown";
})(WS_msg_Player_ID || (WS_msg_Player_ID = {}));

export class WS_msg_Player {
  static async handle__WS_msg_Player__Connection__recv(
    g__ws_player,
    g__GameMap,
    g__GameMap__set,
    g__Player,
    g__Player__set,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Connection,
      (msg__body) => {
        g__Player__set(undefined);
        GameMap.g__GameMap__open(
          g__GameMap,
          g__GameMap__set,
          g__Player,
          g__Player__set,
          msg__body.p__GameMap_ID,
        );
        g__Player__set(
          from_CLIENT_msg_to_CLIENT_obj__Player(msg__body.p__Player),
        );
      },
    );
  }

  static async handle__WS_msg_Player__Disconnection__recv(
    g__ws_player,
    g__GameMap,
    g__GameMap__set,
    g__Player,
    g__Player__set,
  ) {
    WS_msg__recv(
      g__ws_player,
      "WS_msg_Player",
      WS_msg_Player_ID.Disconnection,
      (msg__body) => {
        GameMap.g__GameMap__close(
          g__GameMap,
          g__GameMap__set,
          g__Player,
          g__Player__set,
          msg__body.p__GameMap_ID,
        );
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
      (msg__body) => {
        console.log(
          {
            kind: "WS_msg_Player",
            id: WS_msg_Player_ID.Sighting,
            msg__body,
          },
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
      (msg__body) => {
        console.log(
          {
            kind: "WS_msg_Player",
            id: WS_msg_Player_ID.Vanishing,
            msg__body,
          },
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
