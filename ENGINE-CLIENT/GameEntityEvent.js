export var GameEntityEvent_ID;
(function (GameEntityEvent_ID) {
  GameEntityEvent_ID[GameEntityEvent_ID["move_towards"] = 0] = "move_towards";
  GameEntityEvent_ID[GameEntityEvent_ID["move_forward"] = 1] = "move_forward";
  GameEntityEvent_ID[GameEntityEvent_ID["move_backward"] = 2] = "move_backward";
  GameEntityEvent_ID[GameEntityEvent_ID["move_left"] = 3] = "move_left";
  GameEntityEvent_ID[GameEntityEvent_ID["move_right"] = 4] = "move_right";
})(GameEntityEvent_ID || (GameEntityEvent_ID = {}));

export class GameEntityEvent__Buffer_In {
  #m__GameEntityEvent__Array;

  constructor(...args) {
    this.#m__GameEntityEvent__Array = new Array(...args);
  }

  push(p__GameEntityEvent) {
    for (const i of this.#m__GameEntityEvent__Array.keys()) {
      if (this.#m__GameEntityEvent__Array[i].id == p__GameEntityEvent.id) {
        this.#m__GameEntityEvent__Array.splice(i, 1);
      }
    }

    return (this.#m__GameEntityEvent__Array.push(p__GameEntityEvent));
  }

  forEach(
    callbackfn,
    thisArg,
  ) {
    this.#m__GameEntityEvent__Array.forEach(callbackfn, thisArg);
  }
}

/**
 * 
 * @returns {EventReTy} with information from the event's call.
 * @returns {null} if the event is cancelled.
 * 
**/
export function GameEntityEvent__handle_fn(
  p__GameEntityEvent__Data,
  p__GameEntityEvent__handle_fn__condt__begin,
  p__GameEntityEvent__handle_fn__condt__close,
  p__GameEntityEvent__handle_fn__logic,
  delta_time,
) {
  let l__ReVa;

  if (!p__GameEntityEvent__Data.info.start) {
    if (
      p__GameEntityEvent__handle_fn__condt__close(
        p__GameEntityEvent__Data.args,
        delta_time,
      )
    ) {
      l__ReVa = null;
    } else {
      l__ReVa = p__GameEntityEvent__handle_fn__logic(
        p__GameEntityEvent__Data.args,
        delta_time,
      );
    }
  } else if (!p__GameEntityEvent__Data.info.pause) {
    if (
      p__GameEntityEvent__handle_fn__condt__begin(
        p__GameEntityEvent__Data.args,
        delta_time,
      )
    ) {
      l__ReVa = p__GameEntityEvent__handle_fn__logic(
        p__GameEntityEvent__Data.args,
        delta_time,
      );
    } else {
      l__ReVa = null;
    }
  } else {
    if (
      p__GameEntityEvent__handle_fn__condt__close(
        p__GameEntityEvent__Data.args,
        delta_time,
      )
    ) {
      l__ReVa = null;
    } else {
      l__ReVa = p__GameEntityEvent__handle_fn__logic(
        p__GameEntityEvent__Data.args,
        delta_time,
      );
    }
  }

  return (l__ReVa);
}

export var GameEntityEvent__move_forward__Status;
(function (GameEntityEvent__move_forward__Status) {
  GameEntityEvent__move_forward__Status[
    GameEntityEvent__move_forward__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_forward__Status ||
    (GameEntityEvent__move_forward__Status = {}),
);
