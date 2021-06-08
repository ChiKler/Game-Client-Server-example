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

export enum GameEntityEvent__ID {
  move_towards,
  move_forward,
  move_backward,
  move_left,
  move_right,
  steer_left,
  steer_right,
}

interface GameEntityEvent<
  GameEntityEvent__Args__Ty extends GameEntityEvent__Args,
> {
  id: GameEntityEvent__ID;
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
  obj: object,
  p__GameEntityEvent__Args__Ty__check_props: (
    obj: object,
  ) => obj is GameEntityEvent__Args__Ty,
): obj is GameEntityEvent<GameEntityEvent__Args__Ty> {
  return ((Object.keys(obj).length == 2) && (obj.hasOwnProperty("id")) &&
    // @ts-ignore
    ((typeof obj.id) == "number") && (obj.hasOwnProperty("data")) &&
    // @ts-ignore
    ((obj.data != null) && ((typeof obj.data) == "object")) &&
    // @ts-ignore
    (Object.keys(obj.data).length == 2) &&
    // @ts-ignore
    (obj.data.hasOwnProperty("info")) &&
    // @ts-ignore
    ((obj.data.info != null) && ((typeof obj.data.info) == "object")) &&
    // @ts-ignore
    (Object.keys(obj.data.info).length == 2) &&
    // @ts-ignore
    (obj.data.info.hasOwnProperty("start")) &&
    // @ts-ignore
    ((typeof obj.data.info.start) == "boolean") &&
    // @ts-ignore
    (obj.data.info.hasOwnProperty("pause")) &&
    // @ts-ignore
    ((typeof obj.data.info.pause) == "boolean") &&
    // @ts-ignore
    (obj.data.hasOwnProperty("args")) &&
    // @ts-ignore
    ((obj.data.args != null) && ((typeof obj.data.args) == "object")) &&
    // @ts-ignore
    p__GameEntityEvent__Args__Ty__check_props(obj.data.args));
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
  ) => { success: boolean; status: number },
  p__GameEntityEvent__handle_fn__condt__close: (
    args: GameEntityEvent__Args,
    delta_time: number,
  ) => { success: boolean; status: number },
  p__GameEntityEvent__handle_fn__logic: (
    args: GameEntityEvent__Args,
    delta_time: number,
  ) => GameEntityEvent__ReTy,
  delta_time: number,
): (GameEntityEvent__ReTy | null) {
  let l__ReVa: (GameEntityEvent__ReTy | null);

  if (!p__GameEntityEvent__Data.info.start) {
    const l__p__GameEntityEvent__handle_fn__condt__close__ReVa =
      p__GameEntityEvent__handle_fn__condt__close(
        p__GameEntityEvent__Data.args,
        delta_time,
      );

    if (
      l__p__GameEntityEvent__handle_fn__condt__close__ReVa.success
    ) {
      l__ReVa = null;

      // send info "l__p__GameEntityEvent__handle_fn__condt__close__ReVa.status" to the respective GameEntity
    } else {
      l__ReVa = p__GameEntityEvent__handle_fn__logic(
        p__GameEntityEvent__Data.args,
        delta_time,
      );
    }
  } else if (!p__GameEntityEvent__Data.info.pause) {
    const l__p__GameEntityEvent__handle_fn__condt__begin__ReVa =
      p__GameEntityEvent__handle_fn__condt__begin(
        p__GameEntityEvent__Data.args,
        delta_time,
      );

    if (
      l__p__GameEntityEvent__handle_fn__condt__begin__ReVa.success
    ) {
      l__ReVa = p__GameEntityEvent__handle_fn__logic(
        p__GameEntityEvent__Data.args,
        delta_time,
      );

      // send info "l__p__GameEntityEvent__handle_fn__condt__begin__ReVa.status" to the respective GameEntity
    } else {
      l__ReVa = null;
    }
  } else {
    const l__p__GameEntityEvent__handle_fn__condt__close__ReVa =
      p__GameEntityEvent__handle_fn__condt__close(
        p__GameEntityEvent__Data.args,
        delta_time,
      );

    if (
      l__p__GameEntityEvent__handle_fn__condt__close__ReVa.success
    ) {
      l__ReVa = null;

      // send info "l__p__GameEntityEvent__handle_fn__condt__close__ReVa.status" to the respective GameEntity
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
  Stat_MovementSpeed?: Stat;
}
export interface GameEntityEvent__move_forward__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__move_forward__begin__Status {
  OK,
}
export enum GameEntityEvent__move_forward__close__Status {
  OK,
}
export enum GameEntityEvent__move_forward__logic__Status {
  OK,
}
export interface GameEntityEvent__move_forward
  extends GameEntityEvent<GameEntityEvent__move_forward__Args> {
  //
}
function GameEntityEvent__move_forward__Args__check_props(
  obj: object,
): obj is GameEntityEvent__move_forward__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__move_forward__check_props(
  obj: object,
): obj is GameEntityEvent__move_forward {
  return (GameEntityEvent__check_props<GameEntityEvent__move_forward__Args>(
    obj,
    GameEntityEvent__move_forward__Args__check_props,
  ));
}

export interface GameEntityEvent__move_backward__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat_MovementSpeed?: Stat;
}
export interface GameEntityEvent__move_backward__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__move_backward__begin__Status {
  OK,
}
export enum GameEntityEvent__move_backward__close__Status {
  OK,
}
export enum GameEntityEvent__move_backward__logic__Status {
  OK,
}
export interface GameEntityEvent__move_backward
  extends GameEntityEvent<GameEntityEvent__move_backward__Args> {
  //
}
function GameEntityEvent__move_backward__Args__check_props(
  obj: object,
): obj is GameEntityEvent__move_backward__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__move_backward__check_props(
  obj: object,
): obj is GameEntityEvent__move_backward {
  return (GameEntityEvent__check_props<GameEntityEvent__move_backward__Args>(
    obj,
    GameEntityEvent__move_backward__Args__check_props,
  ));
}

export interface GameEntityEvent__move_left__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat_MovementSpeed?: Stat;
}
export interface GameEntityEvent__move_left__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__move_left__begin__Status {
  OK,
}
export enum GameEntityEvent__move_left__close__Status {
  OK,
}
export enum GameEntityEvent__move_left__logic__Status {
  OK,
}
export interface GameEntityEvent__move_left
  extends GameEntityEvent<GameEntityEvent__move_left__Args> {
  //
}
function GameEntityEvent__move_left__Args__check_props(
  obj: object,
): obj is GameEntityEvent__move_left__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__move_left__check_props(
  obj: object,
): obj is GameEntityEvent__move_left {
  return (GameEntityEvent__check_props<GameEntityEvent__move_left__Args>(
    obj,
    GameEntityEvent__move_left__Args__check_props,
  ));
}

export interface GameEntityEvent__move_right__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat_MovementSpeed?: Stat;
}
export interface GameEntityEvent__move_right__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__move_right__begin__Status {
  OK,
}
export enum GameEntityEvent__move_right__close__Status {
  OK,
}
export enum GameEntityEvent__move_right__logic__Status {
  OK,
}
export interface GameEntityEvent__move_right
  extends GameEntityEvent<GameEntityEvent__move_right__Args> {
  //
}
function GameEntityEvent__move_right__Args__check_props(
  obj: object,
): obj is GameEntityEvent__move_right__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__move_right__check_props(
  obj: object,
): obj is GameEntityEvent__move_right {
  return (GameEntityEvent__check_props<GameEntityEvent__move_right__Args>(
    obj,
    GameEntityEvent__move_right__Args__check_props,
  ));
}

export interface GameEntityEvent__steer_left__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat_SteeringSpeed?: Stat;
}
export interface GameEntityEvent__steer_left__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__steer_left__begin__Status {
  OK,
}
export enum GameEntityEvent__steer_left__close__Status {
  OK,
}
export enum GameEntityEvent__steer_left__logic__Status {
  OK,
}
export interface GameEntityEvent__steer_left
  extends GameEntityEvent<GameEntityEvent__steer_left__Args> {
  //
}
function GameEntityEvent__steer_left__Args__check_props(
  obj: object,
): obj is GameEntityEvent__steer_left__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__steer_left__check_props(
  obj: object,
): obj is GameEntityEvent__steer_left {
  return (GameEntityEvent__check_props<GameEntityEvent__steer_left__Args>(
    obj,
    GameEntityEvent__steer_left__Args__check_props,
  ));
}

export interface GameEntityEvent__steer_right__Args
  extends GameEntityEvent__Args {
  elapsed_ms?: number;
  duration_ms?: number;
  Stat_SteeringSpeed?: Stat;
}
export interface GameEntityEvent__steer_right__ReTy
  extends GameEntityEvent__ReTy {
  //
}
export enum GameEntityEvent__steer_right__begin__Status {
  OK,
}
export enum GameEntityEvent__steer_right__close__Status {
  OK,
}
export enum GameEntityEvent__steer_right__logic__Status {
  OK,
}
export interface GameEntityEvent__steer_right
  extends GameEntityEvent<GameEntityEvent__steer_right__Args> {
  //
}
function GameEntityEvent__steer_right__Args__check_props(
  obj: object,
): obj is GameEntityEvent__steer_right__Args {
  return ((Object.keys(obj).length == 0) || (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("duration_ms")) &&
    // @ts-ignore
    (((typeof obj.elapsed_ms) == "undefined") ||
      // @ts-ignore
      ((typeof obj.duration_ms) == "number"))
  ));
}
export function GameEntityEvent__steer_right__check_props(
  obj: object,
): obj is GameEntityEvent__steer_right {
  return (GameEntityEvent__check_props<GameEntityEvent__steer_right__Args>(
    obj,
    GameEntityEvent__steer_right__Args__check_props,
  ));
}
