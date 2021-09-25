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
  /*readonly */eeID;
  /*protected */m__GameObject;

  /*readonly */GameEntityEvents_by_ID = {};


  constructor(p__GameEntity__Args)
  {
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
    const GameEntityEvent_to_handle = this.GameEntityEvents_by_ID[p__GameEntityEvent__ID];
    if (GameEntityEvent_to_handle != undefined)
    {
      let found = false;
      const this__GameEntityEvents_by_ID__vs = Object.values(this.GameEntityEvents_by_ID);
      for (let i = 0; i < this__GameEntityEvents_by_ID__vs.length; i++)
      {
        if (this__GameEntityEvents_by_ID__vs[i].ID = p__GameEntityEvent__ID) found = true; break;
      }

      if (found)
      {
        let GameEntityEvent__handle_fn__ReVa;

        switch (p__GameEntityEvent__ID)
        {
          case (GameEntityEvent__ID.move_forward)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__move_forward__handle_fn__condt__begin,
              this.Event__move_forward__handle_fn__condt__close,
              this.Event__move_forward__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_backward)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__move_backward__handle_fn__condt__begin,
              this.Event__move_backward__handle_fn__condt__close,
              this.Event__move_backward__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_left)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__move_left__handle_fn__condt__begin,
              this.Event__move_left__handle_fn__condt__close,
              this.Event__move_left__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.move_right)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__move_right__handle_fn__condt__begin,
              this.Event__move_right__handle_fn__condt__close,
              this.Event__move_right__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.steer_left)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__steer_left__handle_fn__condt__begin,
              this.Event__steer_left__handle_fn__condt__close,
              this.Event__steer_left__handle_fn__logic,
              delta_time,
            );
          break;
          case (GameEntityEvent__ID.steer_right)
          :
            GameEntityEvent__handle_fn__ReVa = GameEntityEvent__handle_fn(
              GameEntityEvent_to_handle.data,
              this.Event__steer_right__handle_fn__condt__begin,
              this.Event__steer_right__handle_fn__condt__close,
              this.Event__steer_right__handle_fn__logic,
              delta_time,
            );
          break;
          default
          :
            GameEntityEvent__handle_fn__ReVa = undefined;
          break;
        }
  
        if (GameEntityEvent__handle_fn__ReVa !== undefined) {
          // Send return value to the corresponding GameEntity (be it a Player or a Non_Player).
  
          if (GameEntityEvent__handle_fn__ReVa == null) {
            delete this.GameEntityEvents_by_ID[p__GameEntityEvent__ID];
          }
        }
      }
    }
  }
}
