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
import { Map_by_num, Map_by_str, Mutex, sleep } from "../../vendor/utility/mod.ts";





type g__Users__User_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID : { [ key : string ] : Mutex },
  lock : ((uuID : string) => (Promise<() => void>))
};

const g__Users__User_conn__Mutex_by_uuID : g__Users__User_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID: {},
  lock: async function(uuID : string) : Promise<() => void>
  {
    if (this.Mutex_by_ID[uuID] == undefined) this.Mutex_by_ID[uuID] = new Mutex();
    
    return (await this.Mutex_by_ID[uuID].lock());
  }
};

export type g__Users__Player_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID : { [ key : string ] : Mutex },
  lock : ((uuID : string) => (Promise<() => void>))
};

const g__Users__Player_conn__Mutex_by_uuID : g__Users__Player_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID: {},
  lock: async function(uuID : string) : Promise<() => void>
  {
    if (this.Mutex_by_ID[uuID] == undefined) this.Mutex_by_ID[uuID] = new Mutex();

    return (await this.Mutex_by_ID[uuID].lock());
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

  public static async connect_User(
    g__Users : Map_by_str<User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string; }> {
    const g__Users__User_conn__Mutex_by_uuID__unlock =
      await g__Users__User_conn__Mutex_by_uuID.lock(uuID);

    const wasUserAlreadyConnected = !(g__Users.get(uuID) == undefined);

    const ssID = v4.generate();

    g__Users.set(
      uuID,
      new User(
        uuID,
        ssID,
        (wasUserAlreadyConnected ? g__Users.get(uuID)!.#m__Player! : undefined)
      )
    );

    g__Users__User_conn__Mutex_by_uuID__unlock();

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

  public static async ws_player__set(
    g__Users : Map_by_str<User>,
    uuID : string,
    ws_player__new : WebSocket,
  ) : Promise<{ status : Status; statusText : string }> {
    const g__Users__User_conn__Mutex_by_uuID__unlock =
      await g__Users__User_conn__Mutex_by_uuID.lock(uuID);

    const User_owner = g__Users.get(uuID);

    if (User_owner == undefined) {
      g__Users__User_conn__Mutex_by_uuID__unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      User_owner!.#ws_player = ws_player__new;

      g__Users__User_conn__Mutex_by_uuID__unlock();
      return ({
        status: Status.OK,
        statusText:
          `The User with uuID ${uuID} has been assigned a WebSocket for their Player.`,
      });
    }
  }

  private static async handle_WS_messages_for_Player_to_be_connected(
    g__GameMaps : Map_by_num<GameMap>,
    Player_to_be_connected : Player,
    User_owner__ws_player : WebSocket,
    uuID : string
  )
  : Promise<{ success__value : boolean, status?: Status, statusText?: string }>
  {
    const success : { value : (boolean | undefined) } = { value: undefined };

    const GameMap__handle_WS_messages__ReVa = GameMap.handle_WS_messages(
      g__GameMaps,
      Player_to_be_connected,
      success,
      User_owner__ws_player,
      uuID,
      g__Users__Player_conn__Mutex_by_uuID
    );

    while (success.value == undefined) await sleep(20);

    if (success.value)
    {
      return ({ success__value: true });
    }
    else
    {
      const GameMap__handle_WS_messages__ReVa__resolved = await GameMap__handle_WS_messages__ReVa;

      return ({
        success__value: false,
        status: GameMap__handle_WS_messages__ReVa__resolved!.status,
        statusText: GameMap__handle_WS_messages__ReVa__resolved!.statusText
      });
    }
  }

  public static async connect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string }> {
    const g__Users__User_conn__Mutex_by_uuID__unlock =
      await g__Users__User_conn__Mutex_by_uuID.lock(uuID);

    const User_owner = g__Users.get(uuID);

    if (User_owner == undefined)
    {
      g__Users__User_conn__Mutex_by_uuID__unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    }
    else
    if (User_owner!.#ws_player == undefined)
    {
      g__Users__User_conn__Mutex_by_uuID__unlock();
      return ({
        status: Status.Conflict,
        statusText:
          `The User with uuID ${uuID} doesn't have a WebSocket for their Player.`,
      });
    }
    else
    {
      if (User_owner!.#m__Player == undefined)
      {
        // Should get from DB.
        const Player_to_be_connected = new Player(
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
            ws_player: User_owner!.#ws_player!,

            GameMap_origin__ID: GameMap__ID.Sandbox_A,
          },
        );

        User_owner!.#m__Player = Player_to_be_connected;

        const GameMap__connect_Player__ReVa = await GameMap.connect_Player(
          g__GameMaps,
          Player_to_be_connected
        );

        const GameMap__connect_Player__ReVa__status = GameMap__connect_Player__ReVa.status;
        const GameMap__connect_Player__ReVa__statusText = GameMap__connect_Player__ReVa.statusText;

        if (GameMap__connect_Player__ReVa__status == Status.OK)
        {
          const User__handle_WS_messages_for_Player_to_be_connected__ReVa =
            await User.handle_WS_messages_for_Player_to_be_connected(
              g__GameMaps,
              Player_to_be_connected,
              User_owner!.#ws_player!,
              uuID
            )

          g__Users__User_conn__Mutex_by_uuID__unlock();

          if (User__handle_WS_messages_for_Player_to_be_connected__ReVa.success__value)
          {
            return ({
              status: GameMap__connect_Player__ReVa__status,
              statusText: GameMap__connect_Player__ReVa__statusText,
            });
          }
          else
          {
            return ({
              status: User__handle_WS_messages_for_Player_to_be_connected__ReVa.status!,
              statusText: User__handle_WS_messages_for_Player_to_be_connected__ReVa.statusText!,
            });
          }
        }
        else
        {
          return ({
            status: GameMap__connect_Player__ReVa__status,
            statusText: GameMap__connect_Player__ReVa__statusText,
          });
        }
      }
      else
      {
        const Player_to_be_connected = User_owner!.#m__Player!;

        const User_owner__ws_player = User_owner!.#ws_player!;

        Player_to_be_connected.ws_player = User_owner__ws_player;

        const User__handle_WS_messages_for_Player_to_be_connected__ReVa =
          await User.handle_WS_messages_for_Player_to_be_connected(
            g__GameMaps,
            Player_to_be_connected,
            User_owner__ws_player,
            uuID
          )

        g__Users__User_conn__Mutex_by_uuID__unlock();

        if (User__handle_WS_messages_for_Player_to_be_connected__ReVa.success__value)
        {
          return ({
            status: Status.OK,
            statusText: `The User with uuID ${uuID} already had their Player connected.`,
          });
        }
        else
        {
          return ({
            status: User__handle_WS_messages_for_Player_to_be_connected__ReVa.status!,
            statusText: User__handle_WS_messages_for_Player_to_be_connected__ReVa.statusText!,
          });
        }
      }
    }
  }

  public static async disconnect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string,
    User_is_connected_and_Mutex_locked? : boolean,
  )
  : Promise<{ status : Status; statusText : string }>
  {
    const handle_disconnect_Player = async (
      User_owner : User,
      g__Users__User_conn__Mutex_by_uuID__unlock? : (() => void)
    )
    : Promise<{ status : Status; statusText : string }> =>
    {
      if (User_owner!.#m__Player == undefined)
      {
        if (g__Users__User_conn__Mutex_by_uuID__unlock != undefined)
          g__Users__User_conn__Mutex_by_uuID__unlock();

        return ({
          status: Status.Conflict,
          statusText: `The Player of the User with uuID ${uuID} wasn't connected.`,
        });
      }
      else
      {
        const GameMap__disconnect_Player__ReVa =
          await GameMap.disconnect_Player(
            g__GameMaps,
            User_owner!.#m__Player!
          );

        if (g__Users__User_conn__Mutex_by_uuID__unlock != undefined)
          g__Users__User_conn__Mutex_by_uuID__unlock();

        return ({
          status: GameMap__disconnect_Player__ReVa.status,
          statusText: GameMap__disconnect_Player__ReVa.statusText,
        });
      }
    }

    if (User_is_connected_and_Mutex_locked)
    {
      return (await handle_disconnect_Player(g__Users.get(uuID)!));
    }
    else
    {
      const g__Users__User_conn__Mutex_by_uuID__unlock =
        await g__Users__User_conn__Mutex_by_uuID.lock(uuID);

      const User_owner = g__Users.get(uuID);
  
      if (User_owner == undefined)
      {
        g__Users__User_conn__Mutex_by_uuID__unlock();
        return ({
          status: Status.Conflict,
          statusText: `The User with uuID ${uuID} wasn't connected.`,
        });
      }
      else
      {
        return (await handle_disconnect_Player(User_owner, g__Users__User_conn__Mutex_by_uuID__unlock));
      }
    }
  }
  public static async disconnect_User(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string,
  ) : Promise<{ status : Status; statusText : string }> {
    const g__Users__User_conn__Mutex_by_uuID__unlock =
      await g__Users__User_conn__Mutex_by_uuID.lock(uuID);

    const User_to_disconnect = g__Users.get(uuID);

    if (User_to_disconnect == undefined) {
      g__Users__User_conn__Mutex_by_uuID__unlock();
      return ({
        status: Status.Conflict,
        statusText: `The User with uuID ${uuID} wasn't connected.`,
      });
    } else {
      const User__disconnect_Player__ReVa = await User.disconnect_Player(
        g__GameMaps,
        g__Users,
        uuID,
        true
      );

      if (
        (User__disconnect_Player__ReVa.status == Status.OK)
        ||
        (User__disconnect_Player__ReVa.status == Status.Conflict)
      ) {
        g__Users.delete(uuID);
        g__Users__User_conn__Mutex_by_uuID__unlock();
        return ({
          status: Status.OK,
          statusText: `The User with uuID ${uuID} has been disconnected.`,
        });
      } else {
        g__Users__User_conn__Mutex_by_uuID__unlock();
        return ({
          status: User__disconnect_Player__ReVa.status,
          statusText: User__disconnect_Player__ReVa.statusText,
        });
      }
    }
  }
}
