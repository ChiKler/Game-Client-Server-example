// @ts-ignore
import { GameObject, Player } from "./mod.ts";

// @ts-ignore
import type { Player__SERVER_msg } from "../ENGINE-SERVER/Player.ts";

// @ts-ignore
import { Mutex } from "../vendor/utility/mod.ts";

export type GameEntity__SERVER_msg = Player__SERVER_msg;

export abstract class GameEntity {
  readonly eeID: number;
  readonly m__GameObject: GameObject;
  constructor(eeID: number, p__GameObject: GameObject) {
    this.eeID = eeID;

    this.m__GameObject = p__GameObject;
  }

  private static eeID_count = 0;
  private static eeID_mutex = new Mutex();
  static async eeID_generate(amount: number): Promise<number> {
    const eeID_mutex__unlock = await GameEntity.eeID_mutex.lock();
    const eeID_count__old = GameEntity.eeID_count;
    GameEntity.eeID_count += amount;
    eeID_mutex__unlock();
    return (eeID_count__old);
  }

  static from_SERVER_obj_to_SERVER_msg(
    p__GameEntity: GameEntity,
  ): GameEntity__SERVER_msg {
    let l__GameEntity__SERVER_msg: GameEntity__SERVER_msg;

    if (p__GameEntity instanceof Player) {
      l__GameEntity__SERVER_msg = Player.from_SERVER_obj_to_SERVER_msg(
        p__GameEntity,
      );
    } else {
      throw new TypeError();
    }

    return (l__GameEntity__SERVER_msg);
  }
}
