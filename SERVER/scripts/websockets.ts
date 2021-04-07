// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.92.0/ws/mod.ts";

export interface WS_msg {
  kind: string;
  id: number;
  body: object;
}

/**
 * 
 * SHOULD RECURSEVILY CHECK ALL THE PROPERTIES OF WS_msg__body__Ty (TO BE IMPLEMENTED)
 * 
**/
export async function WS_msg__recv<WS_msg__body__Ty>(
  kind: string,
  id: number,
  msg_str: any,
  callback: (msg__body: WS_msg__body__Ty) => any,
): Promise<void> {
  try {
    const msg = JSON.parse(msg_str);

    if (
      (JSON.stringify(msg) == "{}") ||
      (JSON.stringify(msg) == "[]") ||
      (JSON.stringify(msg) == "") // ?
    ) {
      // ignore the message
    } else if (msg && typeof msg == "object") {
      if (
        (Object.keys(msg).length == 3) && (msg.hasOwnProperty("kind")) &&
        (typeof msg.kind == "string") && (msg.hasOwnProperty("id")) &&
        (typeof msg.id == "number") && (msg.hasOwnProperty("body")) &&
        (typeof msg.body == "object")
      ) {
        if (msg.kind == kind && msg.id == id) {
          // SHOULD RECURSEVILY CHECK ALL THE PROPERTIES OF WS_msg__body__Ty (TO BE IMPLEMENTED)
          console.log(msg);
          callback(msg.body);
        }
      } else {
        // ignore the message
      }
    } else {
      // ignore the message
    }
  } catch (err) {
    // console.error(err);
  }
}

export async function WS_msg__send(
  ws: WebSocket,
  msg: WS_msg,
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
