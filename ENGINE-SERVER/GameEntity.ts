import {
  GameEntityEvent__Buffer_In,
  GameEntityEvent__handle_fn,
  GameEntityEvent__move_forward,
  GameEntityEvent__move_forward__Args,
  GameEntityEvent__move_forward__check_props,
  GameEntityEvent__move_forward__ReTy,
  GameEntityEvent__move_forward__Status,
  GameEntityEvent__ReTy,
  GameEntityEvent_ID,
  // @ts-ignore
} from "./GameEntityEvent.ts";
// @ts-ignore
import { GameObject } from "./GameObject.ts";

// @ts-ignore
import { Mutex } from "../vendor/utility/mod.ts";

export interface GameEntity__Args {
  eeID: number;
  GameObject: GameObject;
}

export abstract class GameEntity {
  readonly eeID: number;
  readonly m__GameObject: GameObject;

  m__GameEntityEvent__Buffer_In = new GameEntityEvent__Buffer_In();
  constructor(p__GameEntity__Args: GameEntity__Args) {
    this.eeID = p__GameEntity__Args.eeID;

    this.m__GameObject = p__GameEntity__Args.GameObject;
  }

  private Event__move_forward__handle_fn__condt__begin = (
    args: GameEntityEvent__move_forward__Args,
    delta_time: number,
  ): boolean => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    const l__ReVa: boolean = (
      (args.elapsed_ms! < args.duration_ms!) &&
      (!this.m__GameObject.isMovementImpaired)
    );

    return (l__ReVa);
  };
  private Event__move_forward__handle_fn__condt__close = (
    args: GameEntityEvent__move_forward__Args,
    delta_time: number,
  ): boolean => {
    return (true);
  };
  private Event__move_forward__handle_fn__logic = (
    args: GameEntityEvent__move_forward__Args,
    delta_time: number,
  ): GameEntityEvent__move_forward__ReTy => {
    this.m__GameObject.move_forward(
      delta_time,
      // @ts-ignore
      this.m__GameObject.m__Stat__speed || args.Stat__speed,
    );

    return ({
      status: GameEntityEvent__move_forward__Status.OK,
    });
  };

  public Events__handle(delta_time: number): void {
    let l__m__GameEntityEvent__Buffer_In__new =
      new GameEntityEvent__Buffer_In();

    let l__m__GameEntityEvent__Buffer_In__old =
      this.m__GameEntityEvent__Buffer_In;

    l__m__GameEntityEvent__Buffer_In__old.forEach((l__GameEntityEvent) => {
      let l__ReTy: (GameEntityEvent__ReTy | null | undefined);

      switch (l__GameEntityEvent.id) {
        case (GameEntityEvent_ID.move_forward):
          console.log("GameEntityEvent triggered", this.eeID, "move_forward");
          l__ReTy = GameEntityEvent__handle_fn(
            l__GameEntityEvent.data,
            this.Event__move_forward__handle_fn__condt__begin,
            this.Event__move_forward__handle_fn__condt__close,
            this.Event__move_forward__handle_fn__logic,
            delta_time,
          );
          break;

        default:
          l__ReTy = undefined;
          break;
      }

      if (l__ReTy !== undefined) {
        // Send return value to the corresponding GameEntity (be it a Player or an AI_npc).

        if (l__ReTy !== null) {
          l__m__GameEntityEvent__Buffer_In__new.push(
            l__GameEntityEvent,
          );
        }
      }
    });

    this.m__GameEntityEvent__Buffer_In = l__m__GameEntityEvent__Buffer_In__new;
  }

  private static eeID__count = 0;
  private static eeID__mutex = new Mutex();
  static async eeID__generate(amount: number): Promise<number> {
    const eeID__mutex__unlock = await GameEntity.eeID__mutex.lock();
    const eeID__count__old = GameEntity.eeID__count;
    GameEntity.eeID__count += amount;
    eeID__mutex__unlock();
    return (eeID__count__old);
  }
}
