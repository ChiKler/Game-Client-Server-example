import { WebSocket } from "https://deno.land/std@0.91.0/ws/mod.ts";

export interface WS_msg_send {
  kind: string;
  id: number;
  body: object;
}

export async function ws_msg_send(
  ws: WebSocket,
  msg: WS_msg_send,
): Promise<void> {
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

export interface WS_msg_recv {
  kind: string;
  id: number;
  body: object;
}

/**
 * 
 * SHOULD RECURSEVILY CHECK ALL THE PROPERTIES OF WS_msg_recv__body__Ty (TO BE IMPLEMENTED)
 * 
**/
export async function ws_msg_recv<WS_msg_recv__body__Ty>(
  kind: string,
  id: number,
  msg_str: any,
  callback: (body: WS_msg_recv__body__Ty) => any,
): Promise<void> {
  try {
    const msg = JSON.parse(msg_str);

    if (
      (JSON.stringify(msg) == "{}") ||
      (JSON.stringify(msg) == "[]") ||
      (JSON.stringify(msg) == "") // ?
    ) {
      // ignore the message
    } else if (msg && typeof msg === "object") {
      if (
        (Object.keys(msg).length == 3) && (msg.hasOwnProperty("kind")) &&
        (typeof msg.kind == "string") && (msg.hasOwnProperty("id")) &&
        (typeof msg.id == "number") && (msg.hasOwnProperty("body")) &&
        (typeof msg.body == "object")
      ) {
        if (msg.kind == kind && msg.id == id) {
          // SHOULD RECURSEVILY CHECK ALL THE PROPERTIES OF WS_msg_recv__body__Ty (TO BE IMPLEMENTED)
          callback(msg.body);
        }
      } else {
        // ignore the message
      }
    } else {
      // ignore the message
    }
  } catch (err) {
    console.error(err);
  }
}
