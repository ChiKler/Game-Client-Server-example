export function WS__make(g__server__address, g__uuID, ws_name) {
  return (
    new WebSocket(
      `ws://${g__server__address}/ws_${ws_name}__set?uuID=${g__uuID}`,
    )
  );
}

export /*abstract */class WS_msg
{
  static recv(ws, kind, id, callback)
  {
    ws.addEventListener(
      "message",
      function (evt)
      {
        const msg = JSON.parse(evt.data);

        if ((msg.kind == kind) && (msg.id == id)) {
          callback(msg.body);
        }
      }
    );
  }
  static send(ws, kind, id, p__WS_msg__body)
  {
    ws.send(JSON.stringify({ kind, id, body: p__WS_msg__body }));
  }
}
