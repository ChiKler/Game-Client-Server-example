import {
  GameEntityEvent__handle_fn,
  GameEntityEvent__ID,
  GameEntityEvent__move_backward__begin__Status,
  GameEntityEvent__move_backward__close__Status,
  GameEntityEvent__move_backward__logic__Status,
  GameEntityEvent__move_forward__begin__Status,
  GameEntityEvent__move_forward__close__Status,
  GameEntityEvent__move_forward__logic__Status,
  GameEntityEvent__move_left__begin__Status,
  GameEntityEvent__move_left__close__Status,
  GameEntityEvent__move_left__logic__Status,
  GameEntityEvent__move_right__begin__Status,
  GameEntityEvent__move_right__close__Status,
  GameEntityEvent__move_right__logic__Status,
  GameEntityEvent__steer_left__begin__Status,
  GameEntityEvent__steer_left__close__Status,
  GameEntityEvent__steer_left__logic__Status,
  GameEntityEvent__steer_right__begin__Status,
  GameEntityEvent__steer_right__close__Status,
  GameEntityEvent__steer_right__logic__Status,
} from "./GameEntityEvent.js";

export /*abstract */ class GameEntity {
  eeID;
  m__GameObject;

  m__GameEntityEvents = {};
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

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isMovementImpaired)
      ),
      status: GameEntityEvent__move_forward__begin__Status.OK,
    });
  };
  /*private */ Event__move_forward__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__move_forward__close__Status.OK,
    });
  };
  /*private */ Event__move_forward__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.move_forward(
      delta_time,
      args.Stat_MovementSpeed,
    );

    return ({
      status: GameEntityEvent__move_forward__logic__Status.OK,
    });
  };

  /*private */ Event__move_backward__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isMovementImpaired)
      ),
      status: GameEntityEvent__move_backward__begin__Status.OK,
    });
  };
  /*private */ Event__move_backward__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__move_backward__close__Status.OK,
    });
  };
  /*private */ Event__move_backward__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.move_backward(
      delta_time,
      args.Stat_MovementSpeed,
    );

    return ({
      status: GameEntityEvent__move_backward__logic__Status.OK,
    });
  };

  /*private */ Event__move_left__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isMovementImpaired)
      ),
      status: GameEntityEvent__move_left__begin__Status.OK,
    });
  };
  /*private */ Event__move_left__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__move_left__close__Status.OK,
    });
  };
  /*private */ Event__move_left__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.move_left(
      delta_time,
      args.Stat_MovementSpeed,
    );

    return ({
      status: GameEntityEvent__move_left__logic__Status.OK,
    });
  };

  /*private */ Event__move_right__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isMovementImpaired)
      ),
      status: GameEntityEvent__move_right__begin__Status.OK,
    });
  };
  /*private */ Event__move_right__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__move_right__close__Status.OK,
    });
  };
  /*private */ Event__move_right__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.move_right(
      delta_time,
      args.Stat_MovementSpeed,
    );

    return ({
      status: GameEntityEvent__move_right__logic__Status.OK,
    });
  };

  /*private */ Event__steer_left__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isSteeringImpaired)
      ),
      status: GameEntityEvent__steer_left__begin__Status.OK,
    });
  };
  /*private */ Event__steer_left__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__steer_left__close__Status.OK,
    });
  };
  /*private */ Event__steer_left__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.steer_left(
      delta_time,
      args.Stat_SteeringSpeed,
    );

    return ({
      status: GameEntityEvent__steer_left__logic__Status.OK,
    });
  };

  /*private */ Event__steer_right__handle_fn__condt__begin = (
    args,
    delta_time,
  ) => {
    if (args.elapsed_ms == undefined) args.elapsed_ms = 0;

    args.elapsed_ms += (delta_time * 1000);

    if (args.duration_ms == undefined) args.duration_ms = Infinity;

    return ({
      success: (
        (args.elapsed_ms < args.duration_ms) &&
        (!this.m__GameObject.isSteeringImpaired)
      ),
      status: GameEntityEvent__steer_right__begin__Status.OK,
    });
  };
  /*private */ Event__steer_right__handle_fn__condt__close = (
    args,
    delta_time,
  ) => {
    return ({
      success: true,
      status: GameEntityEvent__steer_right__close__Status.OK,
    });
  };
  /*private */ Event__steer_right__handle_fn__logic = (
    args,
    delta_time,
  ) => {
    this.m__GameObject.steer_right(
      delta_time,
      args.Stat_SteeringSpeed,
    );

    return ({
      status: GameEntityEvent__steer_right__logic__Status.OK,
    });
  };


  /*public */GameEntityEvents__handle(p__GameEntityEvent__ID, delta_time)
  {
    const this__m__GameEntityEvents__k = p__GameEntityEvent__ID + "";

    const l__GameEntityEvent = this.m__GameEntityEvents[this__m__GameEntityEvents__k];
    if (l__GameEntityEvent != undefined)
    {
      let found = false;
      const this__m__GameEntityEvents__vs = Object.values(this.m__GameEntityEvents);
      for (let i = 0; i < this__m__GameEntityEvents__vs.length; i++)
      {
        if (this__m__GameEntityEvents__vs[i].ID = p__GameEntityEvent__ID) found = true; break;
      }

      if (found)
      {
        let l__GameEntityEvent__handle_fn__ReVa;

        switch (p__GameEntityEvent__ID)
        {
          case (GameEntityEvent__ID.move_forward)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__move_forward__handle_fn__condt__begin,
              this.Event__move_forward__handle_fn__condt__close,
              this.Event__move_forward__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_backward)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__move_backward__handle_fn__condt__begin,
              this.Event__move_backward__handle_fn__condt__close,
              this.Event__move_backward__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_left)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__move_left__handle_fn__condt__begin,
              this.Event__move_left__handle_fn__condt__close,
              this.Event__move_left__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_right)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__move_right__handle_fn__condt__begin,
              this.Event__move_right__handle_fn__condt__close,
              this.Event__move_right__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.steer_left)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__steer_left__handle_fn__condt__begin,
              this.Event__steer_left__handle_fn__condt__close,
              this.Event__steer_left__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.steer_right)
          :
            l__GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              l__GameEntityEvent.data,
              this.Event__steer_right__handle_fn__condt__begin,
              this.Event__steer_right__handle_fn__condt__close,
              this.Event__steer_right__handle_fn__logic,
              delta_time,
            );
          break;
          default
          :
            l__GameEntityEvent__handle_fn__ReVa = undefined;
          break;
        }
  
        if (l__GameEntityEvent__handle_fn__ReVa !== undefined) {
          // Send return value to the corresponding GameEntity (be it a Player or an AI_npc).
  
          if (l__GameEntityEvent__handle_fn__ReVa == null) {
            delete this.m__GameEntityEvents[this__m__GameEntityEvents__k];
          }
        }
      }
    }
  }
}
