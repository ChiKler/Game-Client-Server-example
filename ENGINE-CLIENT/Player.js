import { GameEntity } from "./GameEntity.js";

export var WS_msg_Player_ID;
(function (WS_msg_Player_ID) {
  WS_msg_Player_ID[WS_msg_Player_ID["Connection"] = 0] = "Connection";
  WS_msg_Player_ID[WS_msg_Player_ID["Sighting"] = 1] = "Sighting";
  WS_msg_Player_ID[WS_msg_Player_ID["Vanishing"] = 2] = "Vanishing";
  WS_msg_Player_ID[WS_msg_Player_ID["Takedown"] = 3] = "Takedown";
})(WS_msg_Player_ID || (WS_msg_Player_ID = {}));

export class Player extends GameEntity {
  constructor(eeID) {
    super(eeID);
  }
}
