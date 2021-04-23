import {
  GameEntityEvent__Buffer_In,
  GameEntityEvent__handle_fn,
  GameEntityEvent__move_forward__Status,
  GameEntityEvent_ID,
} from "./GameEntityEvent.js";

export /*abstract */ class GameEntity {
  eeID;
  m__GameObject;

  m__GameEntityEvent__Buffer_In = new GameEntityEvent__Buffer_In();
  constructor(p__GameEntity__Args) {
    this.eeID = p__GameEntity__Args.eeID;

    this.m__GameObject = p__GameEntity__Args.GameObject;
  }

  /*private */ Event__move_forward__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    const l__ReVa = (
      (args.elapsed_ms < args.duration_ms) &&
      (!this.m__GameObject.isMovementImpaired)
    );

    return (l__ReVa);
  };
  /*private */ Event__move_forward__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return (true);
  };
  /*private */ Event__move_forward__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.move_forward(
      delta_time,
      this.m__GameObject.m__Stat__speed || args.Stat__speed,
    );

    return ({
      status: GameEntityEvent__move_forward__Status.OK,
    });
  };

  /*public */ Events__handle(delta_time) {
    let l__m__GameEntityEvent__Buffer_In__new =
      new GameEntityEvent__Buffer_In();

    let l__m__GameEntityEvent__Buffer_In__old =
      this.m__GameEntityEvent__Buffer_In;

    l__m__GameEntityEvent__Buffer_In__old.forEach((l__GameEntityEvent) => {
      let l__ReTy;

      switch (l__GameEntityEvent.id) {
        case (GameEntityEvent_ID.move_forward):
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
}
