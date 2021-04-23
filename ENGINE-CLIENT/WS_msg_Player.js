import {
  from_CLIENT_msg_to_CLIENT_obj__GameEntity,
  from_CLIENT_msg_to_CLIENT_obj__Player,
  GameMap,
  Player,
} from "../../ENGINE-CLIENT/mod.js";

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
  static async recv__WS_msg_Player__Connection(
    g__ws_player,
    g__cvs,
    g__ctx,
    g__GameMap,
    g__Player,
  ) {
    WS_msg.recv(
      g__ws_player.get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Connection,
      (msg__body) => {
        GameMap.g__GameMap__open(
          g__cvs,
          g__ctx,
          g__GameMap,
          g__Player,
          msg__body.m__GameMap_ID,
          from_CLIENT_msg_to_CLIENT_obj__Player(msg__body.m__Player__source),
        );
      },
    );
  }

  static async recv__WS_msg_Player__Disconnection(
    g__ws_player,
    g__cvs,
    g__ctx,
    g__GameMap,
    g__Player,
  ) {
    WS_msg.recv(
      g__ws_player.get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Disconnection,
      (msg__body) => {
        GameMap.g__GameMap__close(
          g__cvs,
          g__ctx,
          g__GameMap,
          g__Player,
          msg__body.m__GameMap_ID,
        );
      },
    );
  }

  static async recv__WS_msg_Player__Sighting(
    g__ws_player,
    g__GameMap,
  ) {
    WS_msg.recv(
      g__ws_player.get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Sighting,
      (msg__body) => {
        const l__GameEntity__source = from_CLIENT_msg_to_CLIENT_obj__GameEntity(
          msg__body.m__GameEntity__source,
        );
        if (l__GameEntity__source instanceof Player) {
          g__GameMap.get().connect__Player(l__GameEntity__source);
        } else {
          throw new TypeError();
        }
      },
    );
  }

  static async recv__WS_msg_Player__Vanishing(
    g__ws_player,
    g__GameMap,
  ) {
    WS_msg.recv(
      g__ws_player.get(),
      "WS_msg_Player",
      WS_msg_Player_ID.Vanishing,
      (msg__body) => {
        const l__GameEntity__source = from_CLIENT_msg_to_CLIENT_obj__GameEntity(
          msg__body.m__GameEntity__source,
        );
        if (l__GameEntity__source instanceof Player) {
          g__GameMap.get().disconnect__Player(l__GameEntity__source);
        } else {
          throw new TypeError();
        }
      },
    );
  }

  static async recv__WS_msg_Player__Takedown(
    g__ws_player,
    g__GameMap__get,
  ) {
    WS_msg.recv(
      g__ws_player.get(),
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
