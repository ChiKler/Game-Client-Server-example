export function WS__make(g__server_address, g__uuID, ws_name) {
  return (new WebSocket(
    `ws://${g__server_address}/ws_${ws_name}__set?uuID=${g__uuID}`,
  ));
}

export function WS_msg__recv(ws, kind, id, callback) {
  ws.addEventListener("message", function (evt) {
    const msg = JSON.parse(evt.data);

    if ((msg.kind == kind) && (msg.id == id)) {
      callback(msg.body);
    }
  });
}

export function WS_msg__send(ws, kind, id, msg__body) {
  ws.send(JSON.stringify({ kind, id, msg__body }));
}
