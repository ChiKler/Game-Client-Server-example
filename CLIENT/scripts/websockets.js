import { g__server_address } from "./main.js";

export function ws_make() {
  const uuID = window.prompt("uuID", "Jane,John,Mary");
  return (new WebSocket(`ws://${g__server_address}/ws?uuID=${uuID}`));
}

export function ws_msg_send(ws, obj) {
  ws.send(JSON.stringify(obj));
}

export function ws_msg_recv(ws, kind, id, callback) {
  ws.addEventListener("message", function (evt) {
    const obj = JSON.parse(evt.data);

    if ((obj.kind == kind) && (obj.id == id)) {
      console.log(obj);
      callback(obj.body);
    }
  });
}
