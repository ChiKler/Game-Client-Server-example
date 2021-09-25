// @js-ignore
import {
  GameEntityEvent__ID,
  WS_msg_GameEntity__ID,
} from "../../ENGINE-CLIENT/mod.js";

// @js-ignore
import { g__Player__get, g__ws_player__get } from "./main.js";

// @js-ignore
import { WS_msg } from "./websockets.js";

const controller_key = {
  GameEntityEvent__move_forward: { code: "KeyW" },
  GameEntityEvent__move_backward: { code: "KeyS" },
  GameEntityEvent__move_left: { code: "KeyA" },
  GameEntityEvent__move_right: { code: "KeyD" },
  GameEntityEvent__steer_left: { code: "KeyQ" },
  GameEntityEvent__steer_right: { code: "KeyE" },
};

const controller_mouse = {
  GameEntityEvent__move_towards: { button: 2 },

  GameEntityEvent__target_lock: { button: 0 },
};

/*abstract */ class Player__Controller
{
  static move_forward__begin(evt)
  {
    if (!g__Player__get().Event__move_forward__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_forward.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_forward,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_forward] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static move_forward__close(evt)
  {
    if (!g__Player__get().Event__move_forward__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_forward.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_forward,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_forward] = l__WS_msg__body.GameEntityEvent;
    }
  }

  static move_backward__begin(evt)
  {
    if (!g__Player__get().Event__move_backward__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_backward.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_backward,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_backward] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static move_backward__close(evt)
  {
    if (!g__Player__get().Event__move_backward__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_backward.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_backward,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_backward] = l__WS_msg__body.GameEntityEvent;
    }
  }

  static move_left__begin(evt)
  {
    if (!g__Player__get().Event__move_left__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_left.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_left,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_left] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static move_left__close(evt)
  {
    if (!g__Player__get().Event__move_left__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_left.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_left,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_left] = l__WS_msg__body.GameEntityEvent;
    }
  }

  static move_right__begin(evt)
  {
    if (!g__Player__get().Event__move_right__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_right.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_right,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_right] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static move_right__close(evt)
  {
    if (!g__Player__get().Event__move_right__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__move_right.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.move_right,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.move_right] = l__WS_msg__body.GameEntityEvent;
    }
  }

  static steer_left__begin(evt)
  {
    if (!g__Player__get().Event__steer_left__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__steer_left.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.steer_left,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.steer_left] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static steer_left__close(evt)
  {
    if (!g__Player__get().Event__steer_left__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__steer_left.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.steer_left,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.steer_left] = l__WS_msg__body.GameEntityEvent;
    }
  }

  static steer_right__begin(evt)
  {
    if (!g__Player__get().Event__steer_right__handle_fn__condt__begin) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__steer_right.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.steer_right,
          data: { info: { start: true, pause: false }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.steer_right] = l__WS_msg__body.GameEntityEvent;
    }
  }
  static steer_right__close(evt)
  {
    if (!g__Player__get().Event__steer_right__handle_fn__condt__close) {
      return;
    } else if (evt.code == controller_key.GameEntityEvent__steer_right.code) {
      const l__WS_msg__body = {
        GameEntityEvent: {
          ID: GameEntityEvent__ID.steer_right,
          data: { info: { start: false, pause: true }, args: {} },
        },
      };
      WS_msg.send(
        g__ws_player__get(),
        "WS_msg_GameEntity",
        WS_msg_GameEntity__ID.GameEntityEvent,
        l__WS_msg__body,
      );
      g__Player__get().GameEntityEvents_by_ID[GameEntityEvent__ID.steer_right] = l__WS_msg__body.GameEntityEvent;
    }
  }
  //
  //
  static call_all_begin(evt)
  {
    //Player__Controller.move_towards__begin(evt);
    Player__Controller.move_forward__begin(evt);
    Player__Controller.move_backward__begin(evt);
    Player__Controller.move_left__begin(evt);
    Player__Controller.move_right__begin(evt);
    Player__Controller.steer_left__begin(evt);
    Player__Controller.steer_right__begin(evt);
  }
  static call_all_close(evt)
  {
    //Player__Controller.move_towards__close(evt);
    Player__Controller.move_forward__close(evt);
    Player__Controller.move_backward__close(evt);
    Player__Controller.move_left__close(evt);
    Player__Controller.move_right__close(evt);
    Player__Controller.steer_left__close(evt);
    Player__Controller.steer_right__close(evt);
  }
}

window.addEventListener("mousedown", (evt) => // Update when mouse or player moves (add nested event listener (must be on canvas for mouse relative position))
{
  Player__Controller.call_all_begin(evt);
});
window.addEventListener("mouseup", (evt) =>
{
  Player__Controller.call_all_close(evt);
});

window.addEventListener("keydown", (evt) =>
{
  Player__Controller.call_all_begin(evt);
});
window.addEventListener("keyup", (evt) =>
{
  Player__Controller.call_all_close(evt);
});
