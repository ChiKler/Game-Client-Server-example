// @ts-ignore
import { Stat } from "./Stat.ts";

interface GameEntityEvent__Info {
  start: boolean;
  pause: boolean;
}

interface GameEntityEvent__Args {
  //
}

interface GameEntityEvent__Data<
  GameEntityEvent__Args__Ty extends GameEntityEvent__Args,
> {
  info: GameEntityEvent__Info;
  args: GameEntityEvent__Args__Ty;
}

export interface GameEntityEvent__ReTy {
  status: number;
}

export enum GameEntityEvent_ID {
  move_towards,
  move_forward,
  move_backward,
  move_left,
  move_right,
}

interface GameEntityEvent<
  GameEntityEvent__Args__Ty extends GameEntityEvent__Args,
> {
  id: GameEntityEvent_ID;
  data: GameEntityEvent__Data<GameEntityEvent__Args__Ty>;
}

export class GameEntityEvent__Buffer_In {
  #m__GameEntityEvent__Array: Array<GameEntityEvent<GameEntityEvent__Args>>;

  constructor(...args: GameEntityEvent<GameEntityEvent__Args>[]) {
    this.#m__GameEntityEvent__Array = new Array<
      GameEntityEvent<GameEntityEvent__Args>
    >(...args);
  }

  push(p__GameEntityEvent: GameEntityEvent<GameEntityEvent__Args>) {
    for (const i of this.#m__GameEntityEvent__Array.keys()) {
      if (this.#m__GameEntityEvent__Array[i].id == p__GameEntityEvent.id) {
        this.#m__GameEntityEvent__Array.splice(i, 1);
      }
    }

    return (this.#m__GameEntityEvent__Array.push(p__GameEntityEvent));
  }

  forEach(
    callbackfn: (
      value: GameEntityEvent<GameEntityEvent__Args>,
      index: number,
      array: GameEntityEvent<GameEntityEvent__Args>[],
    ) => void,
    thisArg?: any,
  ): void {
    this.#m__GameEntityEvent__Array.forEach(callbackfn, thisArg);
  }
}

function GameEntityEvent__check_props<
  GameEntityEvent__Args__Ty extends GameEntityEvent__Args,
>(
  obj: any,
  p__GameEntityEvent__Args__Ty__check_props: (
    obj: any,
  ) => obj is GameEntityEvent__Args__Ty,
): obj is GameEntityEvent<GameEntityEvent__Args__Ty> {
  return ((Object.keys(obj).length == 2) && (obj.hasOwnProperty("id")) &&
    (typeof obj.id == "number") && (obj.hasOwnProperty("data")) &&
    (typeof obj.data == "object") && (Object.keys(obj.data).length == 2) &&
    (obj.data.hasOwnProperty("info")) && (typeof obj.data.info == "object") &&
    (Object.keys(obj.data.info).length == 2) &&
    (obj.data.info.hasOwnProperty("start")) &&
    (typeof obj.data.info.start == "boolean") &&
    (obj.data.info.hasOwnProperty("pause")) &&
    (typeof obj.data.info.pause == "boolean") &&
    (obj.data.hasOwnProperty("args")) && (typeof obj.data.args == "object") &&
    p__GameEntityEvent__Args__Ty__check_props(obj.args));
}

/**
 * 
 * @returns {EventReTy} with information from the event's call.
 * @returns {null} if the event is cancelled.
 * 
**/
export function GameEntityEvent__handle_fn(
  p__GameEntityEvent__Data: GameEntityEvent__Data<GameEntityEvent__Args>,
  p__GameEntityEvent__handle_fn__condt__begin: (
    args: GameEntityEvent__Args,
    delta_time: number,
  ) => boolean,
  p__GameEntityEvent__handle_fn__condt__close: (
    args: GameEntityEvent__Args,
    delta_time: number,
  ) => boolean,
  p__GameEntityEvent__handle_fn__logic: (
    args: GameEntityEvent__Args,
    delta_time: number,
  ) => GameEntityEvent__ReTy,
  delta_time: number,
): (GameEntityEvent__ReTy | null) {
  let l__ReVa: (GameEntityEvent__ReTy | null);

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

export interface GameEntityEvent__move_forward__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat__speed?: Stat;
}
export interface GameEntityEvent__move_forward__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__move_forward__Status {
  OK,
}

export interface GameEntityEvent__move_forward
  extends GameEntityEvent<GameEntityEvent__move_forward__Args> {
  //
}

function GameEntityEvent__move_forward__Args__check_props(
  obj: any,
): obj is GameEntityEvent__move_forward__Args {
  const check_prop__duration_ms = (): boolean => {
    return ((obj.hasOwnProperty("duration_ms")) &&
      ((typeof obj.elapsed_ms == "undefined") ||
        (typeof obj.duration_ms == "number")));
  };
  const check_prop__Stat__speed = (): boolean => {
    return (
      (obj.hasOwnProperty("Stat__speed")) &&
      ((typeof obj.Stat__speed == "undefined") ||
        ((typeof obj.Stat__speed == "object") &&
          (
            (obj.speed.hasOwnProperty("m__value__base")) &&
            (typeof obj.Stat__speed.m__value__base == "number") &&
            (obj.speed.hasOwnProperty("m__value__base_bonusFLAT")) &&
            (typeof obj.Stat__speed.m__value__base_bonusFLAT == "number") &&
            (obj.speed.hasOwnProperty("m__value__base_bonusPCTG")) &&
            (typeof obj.Stat__speed.m__value__base_bonusPCTG == "number") &&
            (obj.speed.hasOwnProperty("m__value__max")) &&
            (typeof obj.Stat__speed.m__value__max == "number") &&
            (obj.speed.hasOwnProperty("m__value__max_bonusFLAT")) &&
            (typeof obj.Stat__speed.m__value__max_bonusFLAT == "number") &&
            (obj.speed.hasOwnProperty("m__value__max_bonusPCTG")) &&
            (typeof obj.Stat__speed.m__value__max_bonusPCTG == "number") &&
            (obj.speed.hasOwnProperty("m__value__cap")) &&
            (typeof obj.Stat__speed.m__value__cap == "number") &&
            (obj.speed.hasOwnProperty("m__value__curr")) &&
            (typeof obj.Stat__speed.m__value__curr == "number")
          )))
    );
  };

  if (Object.keys(obj).length == 1) {
    return (
      check_prop__duration_ms() ||
      check_prop__Stat__speed()
    );
  } else if (Object.keys(obj).length == 2) {
    return (
      check_prop__duration_ms() &&
      check_prop__Stat__speed()
    );
  } else {
    return (false);
  }
}

export function GameEntityEvent__move_forward__check_props(
  obj: any,
): obj is GameEntityEvent__move_forward {
  return (GameEntityEvent__check_props<GameEntityEvent__move_forward__Args>(
    obj,
    GameEntityEvent__move_forward__Args__check_props,
  ));
}
