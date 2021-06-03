// @js-ignore
import {
  GameEntityEvent_ID,
  WS_msg_GameEntity_ID,
} from "../../ENGINE-CLIENT/mod.js";

// @js-ignore
import { g__Player, g__ws_player } from "./main.js";

// @js-ignore
import { WS_msg } from "./websockets.js";

const controller_key = {
  GameEntityEvent__move_forward: { code: "KeyW" },
  GameEntityEvent__move_backward: { code: "KeyS" },
  GameEntityEvent__move_left: { code: "KeyA" },
  GameEntityEvent__move_right: { code: "KeyD" },
};

const controller_mouse = {
  GameEntityEvent__move_towards: { button: 2 },

  GameEntityEvent__target_lock: { button: 0 },
};

/*abstract */ class Player__Controller {
  static move_forward__begin(evt) {
    if (!g__Player.get().Event__move_forward__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_forward.code) {
      const l__WS_msg__body = {
        id: GameEntityEvent_ID.move_forward,
        data: { info: { start: true, pause: false }, args: {} },
      };
      WS_msg.send(
        g__ws_player.get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity_ID.move_forward,
        l__WS_msg__body,
      );
      g__Player.get().m__GameEntityEvent__Buffer_In.push(
        l__WS_msg__body,
      );
    }
  }
  static move_forward__close(evt) {
    if (!g__Player.get().Event__move_forward__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_forward.code) {
      const l__WS_msg__body = {
        id: GameEntityEvent_ID.move_forward,
        data: { info: { start: false, pause: true }, args: {} },
      };
      WS_msg.send(
        g__ws_player.get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity_ID.move_forward,
        l__WS_msg__body,
      );
      g__Player.get().m__GameEntityEvent__Buffer_In.push(
        l__WS_msg__body,
      );
    }
  }
}

window.addEventListener("mousedown", (evt) => // Update when mouse or player moves (add nested event listener (must be on canvas for mouse relative position))
{
  //Player__Controller.move_towards__begin(evt);
});
window.addEventListener("mouseup", (evt) => {
  //Player__Controller.move_towards__close(evt);
});

window.addEventListener("keydown", (evt) => {
  Player__Controller.move_forward__begin(evt);
});
window.addEventListener("keyup", (evt) => {
  Player__Controller.move_forward__close(evt);
});
