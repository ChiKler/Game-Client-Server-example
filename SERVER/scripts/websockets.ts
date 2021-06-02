import {
  WebSocket,
  WebSocketMessage,
  // @ts-ignore
} from "https://deno.land/std@0.97.0/ws/mod.ts";

/**
 *
 * EACH DESCENDANT CLASS MUST IMPLEMENT A STATIC FUNCTION "check_props" AND CALL THEIR PARENT'S.
 *
**/
export class WS_msg__body {
  static check_props(msg_obj__body: any): msg_obj__body is WS_msg__body {
    return (true);
  }
}

export class WS_msg<WS_msg__body__Ty extends WS_msg__body> {
  kind: string;
  id: number;
  body: WS_msg__body__Ty;

  constructor(kind: string, id: number, body: WS_msg__body__Ty) {
    this.kind = kind;
    this.id = id;
    this.body = body;
  }

  static parse(msg_str: string): any {
    console.log(msg_str);
    try {
      const msg_obj = JSON.parse(msg_str);

      if (
        (JSON.stringify(msg_obj) == "{}") ||
        (JSON.stringify(msg_obj) == "[]") ||
        (JSON.stringify(msg_obj) == "") // ?
      ) {
        throw new TypeError(`The value "msg_obj" is not a valid object.`);
      } else if (msg_obj && typeof msg_obj == "object") {
        if (
          (Object.keys(msg_obj).length == 3) &&
          (msg_obj.hasOwnProperty("kind")) &&
          (typeof msg_obj.kind == "string") && (msg_obj.hasOwnProperty("id")) &&
          (typeof msg_obj.id == "number") && (msg_obj.hasOwnProperty("body")) &&
          (typeof msg_obj.body == "object")
        ) {
          return (msg_obj);
        } else {
          throw new TypeError(
            `The properties of the value "msg_obj" don't match with the type "WS_msg".`,
          );
        }
      } else {
        throw new TypeError(`The value "msg_obj" is not a valid object.`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async recv<WS_msg__body__Ty extends WS_msg__body>(
    kind: string,
    id: number,
    msg_str: string,
    check_props: (msg_obj__body: any) => msg_obj__body is WS_msg__body__Ty,
    callback: (msg__body: WS_msg__body__Ty) => void,
  ): Promise<void> {
    const msg_obj = WS_msg.parse(msg_str);
    console.log(msg_obj);
    if (msg_obj.kind == kind && msg_obj.id == id) {
      if (check_props(msg_obj.body)) {
        console.log(msg_obj);
        callback(msg_obj.body);
      } else {
        // ignore the message
      }
    } else {
      // ignore the message
    }
  }

  static async send<
    WS_msg__body__Ty extends WS_msg__body,
    WS_msg__Ty extends WS_msg<WS_msg__body__Ty>,
  >(
    ws: WebSocket,
    msg: WS_msg__Ty,
  ): Promise<void> {
    if (ws.isClosed) return;
    try {
      await ws.send(JSON.stringify(msg));
    } catch (error) {
      console.error(error);
      try {
        await ws.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}
