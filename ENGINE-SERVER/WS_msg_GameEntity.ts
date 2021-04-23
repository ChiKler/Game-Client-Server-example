// @ts-ignore
import { GameEntity } from "./GameEntity.ts";
import {
  GameEntityEvent__move_forward,
  GameEntityEvent__move_forward__check_props,
  // @ts-ignore
} from "./GameEntityEvent.ts";
import {
  WS_msg,
  WS_msg__body,
  // @ts-ignore
} from "../SERVER/scripts/websockets.ts";

export enum WS_msg_GameEntity_ID {
  move_towards,
  move_forward,
  move_backward,
  move_left,
  move_right,
}

interface WS_msg_GameEntity__body extends WS_msg__body {}

interface WS_msg_GameEntity__body__move_towards
  extends WS_msg_GameEntity__body {}

interface WS_msg_GameEntity__body__move_forward
  extends WS_msg_GameEntity__body {
  m__GameEntityEvent: GameEntityEvent__move_forward;
}
function WS_msg_GameEntity__body__move_forward__check_props(
  obj: any,
): obj is WS_msg_GameEntity__body__move_forward {
  return (
    (Object.keys(obj).length == 1) &&
    (obj.hasOwnProperty("m__GameEntityEvent")) &&
    (typeof obj.m__GameEntityEvent == "object") &&
    GameEntityEvent__move_forward__check_props(obj.m__GameEntityEvent)
  );
}

interface WS_msg_GameEntity__body__move_backward
  extends WS_msg_GameEntity__body {}
interface WS_msg_GameEntity__body__move_left extends WS_msg_GameEntity__body {}
interface WS_msg_GameEntity__body__move_right extends WS_msg_GameEntity__body {}

export class WS_msg_GameEntity<
  WS_msg_GameEntity__body__Ty extends WS_msg_GameEntity__body,
> extends WS_msg<WS_msg_GameEntity__body__Ty> {
  static async recv__WS_msg_GameEntity__move_forward(
    p__GameEntity: GameEntity,
    msg_str: string,
  ) {
    WS_msg.recv<WS_msg_GameEntity__body__move_forward>(
      "WS_msg_GameEntity",
      WS_msg_GameEntity_ID.move_forward,
      msg_str,
      WS_msg_GameEntity__body__move_forward__check_props,
      (msg__body: WS_msg_GameEntity__body__move_forward): void => {
        p__GameEntity.m__GameEntityEvent__Buffer_In.push(
          msg__body.m__GameEntityEvent,
        );
      },
    );
  }
}
