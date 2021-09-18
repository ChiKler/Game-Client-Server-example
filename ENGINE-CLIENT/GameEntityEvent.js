export var GameEntityEvent__ID;
(function (GameEntityEvent__ID) {
  GameEntityEvent__ID[GameEntityEvent__ID["move_towards"] = 0] = "move_towards";
  GameEntityEvent__ID[GameEntityEvent__ID["move_forward"] = 1] = "move_forward";
  GameEntityEvent__ID[GameEntityEvent__ID["move_backward"] = 2] =
    "move_backward";
  GameEntityEvent__ID[GameEntityEvent__ID["move_left"] = 3] = "move_left";
  GameEntityEvent__ID[GameEntityEvent__ID["move_right"] = 4] = "move_right";
  "move_backward";
  GameEntityEvent__ID[GameEntityEvent__ID["steer_left"] = 5] = "steer_left";
  GameEntityEvent__ID[GameEntityEvent__ID["steer_right"] = 6] = "steer_right";
})(GameEntityEvent__ID || (GameEntityEvent__ID = {}));

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

export var GameEntityEvent__move_forward__begin__Status;
(function (GameEntityEvent__move_forward__begin__Status) {
  GameEntityEvent__move_forward__begin__Status[
    GameEntityEvent__move_forward__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_forward__begin__Status ||
    (GameEntityEvent__move_forward__begin__Status = {}),
);
export var GameEntityEvent__move_forward__close__Status;
(function (GameEntityEvent__move_forward__close__Status) {
  GameEntityEvent__move_forward__close__Status[
    GameEntityEvent__move_forward__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_forward__close__Status ||
    (GameEntityEvent__move_forward__close__Status = {}),
);
export var GameEntityEvent__move_forward__logic__Status;
(function (GameEntityEvent__move_forward__logic__Status) {
  GameEntityEvent__move_forward__logic__Status[
    GameEntityEvent__move_forward__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_forward__logic__Status ||
    (GameEntityEvent__move_forward__logic__Status = {}),
);

export var GameEntityEvent__move_backward__begin__Status;
(function (GameEntityEvent__move_backward__begin__Status) {
  GameEntityEvent__move_backward__begin__Status[
    GameEntityEvent__move_backward__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_backward__begin__Status ||
    (GameEntityEvent__move_backward__begin__Status = {}),
);
export var GameEntityEvent__move_backward__close__Status;
(function (GameEntityEvent__move_backward__close__Status) {
  GameEntityEvent__move_backward__close__Status[
    GameEntityEvent__move_backward__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_backward__close__Status ||
    (GameEntityEvent__move_backward__close__Status = {}),
);
export var GameEntityEvent__move_backward__logic__Status;
(function (GameEntityEvent__move_backward__logic__Status) {
  GameEntityEvent__move_backward__logic__Status[
    GameEntityEvent__move_backward__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_backward__logic__Status ||
    (GameEntityEvent__move_backward__logic__Status = {}),
);

export var GameEntityEvent__move_left__begin__Status;
(function (GameEntityEvent__move_left__begin__Status) {
  GameEntityEvent__move_left__begin__Status[
    GameEntityEvent__move_left__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_left__begin__Status ||
    (GameEntityEvent__move_left__begin__Status = {}),
);
export var GameEntityEvent__move_left__close__Status;
(function (GameEntityEvent__move_left__close__Status) {
  GameEntityEvent__move_left__close__Status[
    GameEntityEvent__move_left__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_left__close__Status ||
    (GameEntityEvent__move_left__close__Status = {}),
);
export var GameEntityEvent__move_left__logic__Status;
(function (GameEntityEvent__move_left__logic__Status) {
  GameEntityEvent__move_left__logic__Status[
    GameEntityEvent__move_left__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_left__logic__Status ||
    (GameEntityEvent__move_left__logic__Status = {}),
);

export var GameEntityEvent__move_right__begin__Status;
(function (GameEntityEvent__move_right__begin__Status) {
  GameEntityEvent__move_right__begin__Status[
    GameEntityEvent__move_right__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_right__begin__Status ||
    (GameEntityEvent__move_right__begin__Status = {}),
);
export var GameEntityEvent__move_right__close__Status;
(function (GameEntityEvent__move_right__close__Status) {
  GameEntityEvent__move_right__close__Status[
    GameEntityEvent__move_right__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_right__close__Status ||
    (GameEntityEvent__move_right__close__Status = {}),
);
export var GameEntityEvent__move_right__logic__Status;
(function (GameEntityEvent__move_right__logic__Status) {
  GameEntityEvent__move_right__logic__Status[
    GameEntityEvent__move_right__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__move_right__logic__Status ||
    (GameEntityEvent__move_right__logic__Status = {}),
);

export var GameEntityEvent__steer_left__begin__Status;
(function (GameEntityEvent__steer_left__begin__Status) {
  GameEntityEvent__steer_left__begin__Status[
    GameEntityEvent__steer_left__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_left__begin__Status ||
    (GameEntityEvent__steer_left__begin__Status = {}),
);
export var GameEntityEvent__steer_left__close__Status;
(function (GameEntityEvent__steer_left__close__Status) {
  GameEntityEvent__steer_left__close__Status[
    GameEntityEvent__steer_left__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_left__close__Status ||
    (GameEntityEvent__steer_left__close__Status = {}),
);
export var GameEntityEvent__steer_left__logic__Status;
(function (GameEntityEvent__steer_left__logic__Status) {
  GameEntityEvent__steer_left__logic__Status[
    GameEntityEvent__steer_left__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_left__logic__Status ||
    (GameEntityEvent__steer_left__logic__Status = {}),
);

export var GameEntityEvent__steer_right__begin__Status;
(function (GameEntityEvent__steer_right__begin__Status) {
  GameEntityEvent__steer_right__begin__Status[
    GameEntityEvent__steer_right__begin__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_right__begin__Status ||
    (GameEntityEvent__steer_right__begin__Status = {}),
);
export var GameEntityEvent__steer_right__close__Status;
(function (GameEntityEvent__steer_right__close__Status) {
  GameEntityEvent__steer_right__close__Status[
    GameEntityEvent__steer_right__close__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_right__close__Status ||
    (GameEntityEvent__steer_right__close__Status = {}),
);
export var GameEntityEvent__steer_right__logic__Status;
(function (GameEntityEvent__steer_right__logic__Status) {
  GameEntityEvent__steer_right__logic__Status[
    GameEntityEvent__steer_right__logic__Status["OK"] = 0
  ] = "OK";
})(
  GameEntityEvent__steer_right__logic__Status ||
    (GameEntityEvent__steer_right__logic__Status = {}),
);
