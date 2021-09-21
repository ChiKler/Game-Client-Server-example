import {
  Character,
  GameEntity,
  GameMap,
  GameMap__ID,
  Player,
  // @ts-ignore
} from "../../ENGINE-SERVER/mod.ts";

// @ts-ignore
import { Status } from "https://deno.land/std@0.106.0/http/http_status.ts";
// @ts-ignore
import { v4 } from "https://deno.land/std@0.106.0/uuid/mod.ts";
// @ts-ignore
import { WebSocket } from "https://deno.land/std@0.106.0/ws/mod.ts";

// @ts-ignore
import { Mutex } from "../../vendor/utility/mod.ts";





const g__Users__connection_handler_functions__Mutex_by_ID
:
{
  m__Mutex_by_ID : { [ key : string ] : Mutex },
  lock : ((uuID : string) => (Promise<() => void>))
}
=
{
  m__Mutex_by_ID: {},
  lock: async function(uuID : string) : Promise<() => void> {
    if (this.m__Mutex_by_ID[uuID] == undefined) this.m__Mutex_by_ID[uuID] = new Mutex();
    return (await this.m__Mutex_by_ID[uuID].lock());
  }
};


export class User
{
  readonly uuID : string; // Will be a number later on, for simplicity it's currently a string.
  readonly ssID : string;

  #ws_player? : WebSocket;
  //#ws_chat? : WebSocket;

  #m__Player? : Player;

  private constructor(uuID : string, ssID : string, p__Player?: Player) {
    this.uuID = uuID;
    this.ssID = ssID;

    this.#ws_player = undefined;
    //this.#ws_chat = undefined;

    this.#m__Player = p__Player;
  }

  static async connect_User(
    g__Users : Map<string, User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string; }> {
    const unlock = await g__Users__connection_handler_functions__Mutex_by_ID.lock(uuID);

    const wasUserAlreadyConnected = !(g__Users.get(uuID) == undefined);

    g__Users.set(uuID, new User(uuID, v4.generate(), (wasUserAlreadyConnected ? g__Users.get(uuID)!.#m__Player! : undefined)));

    unlock();

    if (wasUserAlreadyConnected) {
      return ({
        status: Status.OK,
        statusText: `The User with uuID ${uuID} was already connected.`,
      });
    } else {
      return ({
        status: Status.OK,
        statusText: `The User with uuID ${uuID} has been connected.`,
      });
    }
  }

  static async ws_player__set(
    g__Users : Map<string, User>,
    uuID : string,
    ws_player__new : WebSocket,
  ) : Promise<{ status : Status; statusText : string }> {
    const unlock = await g__Users__connection_handler_functions__Mutex_by_ID.lock(uuID);

    const l__User = g__Users.get(uuID);

    if (l__User == undefined) {
      unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      l__User!.#ws_player = ws_player__new;

      unlock();
      return ({
        status: Status.OK,
        statusText:
          `The User with uuID ${uuID} has been assigned a WebSocket to its "ws_player" property.`,
      });
    }
  }
  static async connect_Player(
    g__GameMaps : Map<GameMap__ID, GameMap>,
    p__GameMap__ID : GameMap__ID,
    g__Users : Map<string, User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string }> {
    const unlock = await g__Users__connection_handler_functions__Mutex_by_ID.lock(uuID);

    const l__User = g__Users.get(uuID);

    if (l__User == undefined) {
      unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else if (l__User!.#ws_player == undefined) {
      unlock();
      return ({
        status: Status.Conflict,
        statusText:
          `The User with uuID ${uuID} doesn't have a WebSocket for their Player.`,
      });
    } else {
      const l__GameMap = g__GameMaps.get(GameMap__ID.Sandbox)!;

      if (l__User!.#m__Player == undefined)
      {
        l__User!.#m__Player = new Player(
          {
            eeID: (await GameEntity.eeID__generate(1)),
            GameObject: new Character(
              {
                Pos: { X: 0, Y: 0, R: 0 },
              },
              {
                Character__Skin: (
                  (uuID == "Jane")
                    ? "Red"
                    : ((uuID == "John") ? "Green" : "Blue")
                ),
              },
            ),
          },
          {
            ws_player: l__User!.#ws_player!,
          },
        );

        const l__GameMap__connect_Player__ReVa = await GameMap
          .connect_Player(
            g__GameMaps,
            p__GameMap__ID,
            l__User!.#m__Player!,
          );

        if (l__GameMap__connect_Player__ReVa.status == Status.OK) {
          l__GameMap.handle_WS_messages(
            g__GameMaps,
            l__User!.#m__Player!,
            l__User!.#ws_player!,
          );
        }

        unlock();
        return ({
          status: l__GameMap__connect_Player__ReVa.status,
          statusText: l__GameMap__connect_Player__ReVa.statusText,
        });
      } else {
        l__User!.#m__Player!.ws_player = l__User!.#ws_player!;

        l__GameMap.handle_WS_messages(
          g__GameMaps,
          l__User!.#m__Player!,
          l__User!.#ws_player!,
        );

        unlock();
        return ({
          status: Status.OK,
          statusText:
            `The User with uuID ${uuID} already had their Player connected.`,
        });
      }
    }
  }

  static async disconnect_Player(
    g__GameMaps : Map<GameMap__ID, GameMap>,
    g__Users : Map<string, User>,
    uuID : string,
    user_is_connected_and_mutex_locked? : boolean,
  ) : Promise<{ status : Status; statusText : string }> {
    const handle_disconnect_Player = async (p__User : User, unlock? : (() => void))
    : Promise<{ status : Status; statusText : string }> =>
    {
      if (p__User!.#m__Player == undefined)
      {
        if (unlock != undefined) unlock();
        return ({
          status: Status.Conflict,
          statusText: `The Player of the User with uuID ${uuID} wasn't connected.`,
        });
      }
      else
      {
        const l__GameMap__disconnect_Player__ReVa =
          await GameMap.disconnect_Player(
            g__GameMaps,
            p__User!.#m__Player!.eeID,
          );

        if (unlock != undefined) unlock();
        return ({
          status: l__GameMap__disconnect_Player__ReVa.status,
          statusText: l__GameMap__disconnect_Player__ReVa.statusText,
        });
      }
    }

    if (user_is_connected_and_mutex_locked)
    {
      return (await handle_disconnect_Player(g__Users.get(uuID)!));
    }
    else
    {
      const unlock = await g__Users__connection_handler_functions__Mutex_by_ID.lock(uuID);

      const l__User = g__Users.get(uuID);
  
      if (l__User == undefined)
      {
        unlock();
        return ({
          status: Status.Conflict,
          statusText: `The User with uuID ${uuID} wasn't connected.`,
        });
      }
      else
      {
        return (await handle_disconnect_Player(l__User, unlock));
      }
    }
  }
  static async disconnect_User(
    g__GameMaps : Map<GameMap__ID, GameMap>,
    g__Users : Map<string, User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string }> {
    const unlock = await g__Users__connection_handler_functions__Mutex_by_ID.lock(uuID);

    const l__User = g__Users.get(uuID);

    if (l__User == undefined) {
      unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      const l__User__disconnect_Player__ReVa = await User.disconnect_Player(
        g__GameMaps,
        g__Users,
        uuID,
        true
      );

      if (
        (l__User__disconnect_Player__ReVa.status == Status.OK) ||
        (l__User__disconnect_Player__ReVa.status == Status.Conflict)
      ) {
        g__Users.delete(uuID);
        unlock();
        return ({
          status: Status.OK,
          statusText: `The User with uuID ${uuID} has been disconnected.`,
        });
      } else {
        unlock();
        return ({
          status: l__User__disconnect_Player__ReVa.status,
          statusText: l__User__disconnect_Player__ReVa.statusText,
        });
      }
    }
  }
}
