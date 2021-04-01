// @ts-ignore
import { GameEntity as CLIENT_GameEntity } from "../ENGINE-CLIENT/mod.js";
// @ts-ignore
import { Player } from "./mod.ts";

// @ts-ignore
import { Mutex } from "../vendor/utility/mod.ts";

export abstract class GameEntity {
  readonly eeID: number;
  constructor(eeID: number) {
    this.eeID = eeID;
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

  static CLIENT_type_conversion(p__GameEntity: GameEntity): CLIENT_GameEntity {
    let l__CLIENT_GameEntity: CLIENT_GameEntity;

    if (p__GameEntity instanceof Player) {
      l__CLIENT_GameEntity = Player.CLIENT_type_conversion(p__GameEntity);
    } else {
      throw new TypeError(
        "static GameEntity.CLIENT_type_conversion() needs to be provided with a type-check on all of its derived classes.",
      );
    }

    return (l__CLIENT_GameEntity);
  }
}
