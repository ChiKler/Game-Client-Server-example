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
  Mutex_by_ID : { [ uuID : string ] : Mutex },
  lock : ((uuID : string) => (Promise<() => void>)),
  delete : ((uuID : string) => void)
};

const g__Users__User_conn__Mutex_by_uuID : g__Users__User_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID: {},
  lock: async function(uuID : string) : Promise<() => void>
  {
    if (this.Mutex_by_ID[uuID] == undefined) this.Mutex_by_ID[uuID] = new Mutex();
    
    return (await this.Mutex_by_ID[uuID].lock());
  },
  delete: function(uuID : string) : void
  {
    delete this.Mutex_by_ID[uuID];
  }
};

export type g__Users__Player_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID : { [ uuID : string ] : Mutex },
  lock : ((uuID : string) => (Promise<() => void>)),
  delete : ((uuID : string) => void)
};

const g__Users__Player_conn__Mutex_by_uuID : g__Users__Player_conn__Mutex_by_uuID__Ty =
{
  Mutex_by_ID: {},
  lock: async function(uuID : string) : Promise<() => void>
  {
    if (this.Mutex_by_ID[uuID] == undefined) this.Mutex_by_ID[uuID] = new Mutex();

    return (await this.Mutex_by_ID[uuID].lock());
  },
  delete: function(uuID : string) : void
  {
    delete this.Mutex_by_ID[uuID];
  }
};


export class User
{
  /**
   * User ID. Not to confuse with Universal Unique Identificator.
   * Will be a number later on, for simplicity it's currently a string.
  **/
  readonly uuID : string;
  /**
   * Session ID.
   * I wonder if this will be even necessary.
  **/
  readonly ssID : string;

  #ws_player? : WebSocket;
  //#ws_chat? : WebSocket;

  #m__Player? : Player;


  private constructor(uuID : string, ssID : string, p__Player?: Player)
  {
    this.uuID = uuID;
    this.ssID = ssID;

    this.#ws_player = undefined;
    //this.#ws_chat = undefined;

    this.#m__Player = p__Player;
  }


  public static async connect_User(
    g__Users : Map_by_str<User>,
    uuID : string
  )
  : Promise<{ status : Status, statusText : string }>
  {
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
    ws_player__new : WebSocket
  )
  : Promise<{ status : Status, statusText : string }>
  {
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

  public static async connect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string
  )
  : Promise<{ status : Status; statusText : string }>
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
      const User_owner__ws_player = User_owner!.#ws_player!;
      
      const g__Users__Player_conn__Mutex_by_uuID__unlock =
        await g__Users__Player_conn__Mutex_by_uuID.lock(uuID);

      if (User_owner!.#m__Player == undefined)
      {
        // Should get from DB.
        const Player_to_connect = new Player(
          {
            eeID: (await GameEntity.eeID__generate(1)),
            GameObject: new Character(
              {
                Pos: { X: 0, Y: 0, R: 0 }
              },
              {
                Character__Skin: (
                  (uuID == "Jane")
                    ? "Red"
                    : ((uuID == "John") ? "Green" : "Blue")
                )
              }
            )
          },
          {
            ws_player: User_owner__ws_player,

            GameMap_origin__ID: GameMap__ID.Sandbox_A
          }
        );

        User_owner!.#m__Player = Player_to_connect;

        GameMap.handle_WS_messages(
          g__GameMaps,
          Player_to_connect,
          User_owner__ws_player,
          uuID,
          g__Users__Player_conn__Mutex_by_uuID
        );

        const GameMap__connect_Player__ReVa =
          await GameMap.connect_Player(g__GameMaps, Player_to_connect);

        g__Users__Player_conn__Mutex_by_uuID__unlock();
        g__Users__User_conn__Mutex_by_uuID__unlock();
        
        return ({
          status: GameMap__connect_Player__ReVa.status,
          statusText: GameMap__connect_Player__ReVa.statusText
        });
      }
      else
      {
        const Player_to_connect = User_owner!.#m__Player!;

        const User_owner__ws_player = User_owner!.#ws_player!;

        Player_to_connect.ws_player = User_owner__ws_player;

        GameMap.handle_WS_messages(
          g__GameMaps,
          Player_to_connect,
          User_owner__ws_player,
          uuID,
          g__Users__Player_conn__Mutex_by_uuID
        );

        g__Users__Player_conn__Mutex_by_uuID__unlock();
        g__Users__User_conn__Mutex_by_uuID__unlock();

        return ({
          status: Status.OK,
          statusText: `The User with uuID ${uuID} already had their Player connected.`,
        });
      }
    }
  }

  public static async disconnect_Player(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string,
    User_is_connected_and_Mutex_locked? : boolean
  )
  : Promise<{ status : Status, statusText : string }>
  {
    const g__Users__Player_conn__Mutex_by_uuID__unlock =
      await g__Users__Player_conn__Mutex_by_uuID.lock(uuID);

    const handle_disconnect_Player = async (
      User_owner : User,
      g__Users__User_conn__Mutex_by_uuID__unlock? : (() => void)
    )
    : Promise<{ status : Status, statusText : string }> =>
    {
      if (User_owner!.#m__Player == undefined)
      {
        g__Users__Player_conn__Mutex_by_uuID.delete(uuID);

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

          g__Users__Player_conn__Mutex_by_uuID.delete(uuID);

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
        g__Users__Player_conn__Mutex_by_uuID.delete(uuID);

        g__Users__User_conn__Mutex_by_uuID__unlock();
        
        return ({
          status: Status.Conflict,
          statusText: `The User with uuID ${uuID} wasn't connected.`,
        });
      }
      else
      {
        const handle_disconnect_Player__ReVa =
          await handle_disconnect_Player(User_owner, g__Users__User_conn__Mutex_by_uuID__unlock);

        return ({
          status: handle_disconnect_Player__ReVa.status,
          statusText: handle_disconnect_Player__ReVa.statusText
        });
      }
    }
  }

  public static async disconnect_User(
    g__GameMaps : Map_by_num<GameMap>,
    g__Users : Map_by_str<User>,
    uuID : string
  )
  : Promise<{ status : Status; statusText : string }>
  {
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

        g__Users__User_conn__Mutex_by_uuID.delete(uuID);

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
