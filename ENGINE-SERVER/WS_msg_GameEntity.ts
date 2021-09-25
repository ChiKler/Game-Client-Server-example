// @ts-ignore
import { GameEntity } from "./GameEntity.ts";
import {
  GameEntityEvent__move_backward,
  GameEntityEvent__move_backward__check_props,
  GameEntityEvent__move_forward,
  GameEntityEvent__move_forward__check_props,
  GameEntityEvent__move_left,
  GameEntityEvent__move_left__check_props,
  GameEntityEvent__move_right,
  GameEntityEvent__move_right__check_props,
  GameEntityEvent__steer_left,
  GameEntityEvent__steer_left__check_props,
  GameEntityEvent__steer_right,
  GameEntityEvent__steer_right__check_props,
  // @ts-ignore
} from "./GameEntityEvent.ts";
import {
  WS_msg,
  WS_msg__body,
  // @ts-ignore
} from "../SERVER/scripts/websockets.ts";

enum WS_msg_GameEntity__ID
{
  GameEntityEvent,
}

interface WS_msg_GameEntity__body extends WS_msg__body {}
function WS_msg_GameEntity__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity__body {
  return (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("GameEntityEvent")) &&
    // @ts-ignore
    ((obj.GameEntityEvent != null) &&
      // @ts-ignore
      ((typeof obj.GameEntityEvent) == "object"))
  );
}

interface WS_msg_GameEntity_move_towards__body
  extends WS_msg_GameEntity__body {}

interface WS_msg_GameEntity_move_forward__body extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__move_forward;
}
function WS_msg_GameEntity_move_forward__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_move_forward__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__move_forward__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_move_backward__body
  extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__move_backward;
}
function WS_msg_GameEntity_move_backward__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_move_backward__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__move_backward__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_move_left__body extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__move_left;
}
function WS_msg_GameEntity_move_left__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_move_left__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__move_left__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_move_right__body extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__move_right;
}
function WS_msg_GameEntity_move_right__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_move_right__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__move_right__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_steer_left__body extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__steer_left;
}
function WS_msg_GameEntity_steer_left__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_steer_left__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__steer_left__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_steer_right__body extends WS_msg_GameEntity__body {
  GameEntityEvent: GameEntityEvent__steer_right;
}
function WS_msg_GameEntity_steer_right__body__check_props(
  obj: object,
): obj is WS_msg_GameEntity_steer_right__body {
  return (
    WS_msg_GameEntity__body__check_props(obj) &&
    // @ts-ignore
    GameEntityEvent__steer_right__check_props(obj.GameEntityEvent)
  );
}

interface WS_msg_GameEntity_move_backward__body
  extends WS_msg_GameEntity__body {}
interface WS_msg_GameEntity_move_left__body extends WS_msg_GameEntity__body {}
interface WS_msg_GameEntity_move_right__body extends WS_msg_GameEntity__body {}

export class WS_msg_GameEntity<
  WS_msg_GameEntity__body__Ty extends WS_msg_GameEntity__body,
> extends WS_msg<WS_msg_GameEntity__body__Ty> {
  static async recv_move_forward(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_move_forward__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_move_forward__body__check_props,
      (msg__body: WS_msg_GameEntity_move_forward__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
  static async recv_move_backward(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_move_backward__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_move_backward__body__check_props,
      (msg__body: WS_msg_GameEntity_move_backward__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
  static async recv_move_left(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_move_left__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_move_left__body__check_props,
      (msg__body: WS_msg_GameEntity_move_left__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
  static async recv_move_right(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_move_right__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_move_right__body__check_props,
      (msg__body: WS_msg_GameEntity_move_right__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
  static async recv_steer_left(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_steer_left__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_steer_left__body__check_props,
      (msg__body: WS_msg_GameEntity_steer_left__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
  static async recv_steer_right(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity_steer_right__body>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity__ID.GameEntityEvent,
      msg_str,
      WS_msg_GameEntity_steer_right__body__check_props,
      (msg__body: WS_msg_GameEntity_steer_right__body): void => {
        p__GameEntity.GameEntityEvents_by_ID[msg__body.GameEntityEvent.ID] = msg__body.GameEntityEvent;
      },
    );
  }
}
