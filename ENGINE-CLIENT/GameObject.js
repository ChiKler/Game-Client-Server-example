// @ts-ignore
import { Stat } from "./Stat.js";

export /*abstract */ class GameObject {
  Pos;

  m__Stat_MovementSpeed;
  m__Stat_SteeringSpeed;

  isMovementImpaired;
  isSteeringImpaired;

  sprite;
  img;

  constructor(p__GameObject__Args) {
    this.Pos = p__GameObject__Args.Pos;

    this.m__Stat_MovementSpeed = p__GameObject__Args.Stat_MovementSpeed ||
      new Stat({ value__base: 300 });
    this.m__Stat_SteeringSpeed = p__GameObject__Args.Stat_SteeringSpeed ||
      new Stat({ value__base: 360 });

    this.isMovementImpaired = p__GameObject__Args.isMovementImpaired || false;
    this.isSteeringImpaired = p__GameObject__Args.isSteeringImpaired || false;

    this.sprite = p__GameObject__Args.sprite;
    this.img = new Image();
    this.img.src = this.sprite;
  }

  draw(g__cvs, g__ctx, g__Player) {
    const adjustX = (g__Player.get().m__GameObject).img.width / 2;
    const adjustY = (g__Player.get().m__GameObject).img.height / 2;

    g__ctx.save();

    g__ctx.translate(+this.Pos.X, +this.Pos.Y);
    g__ctx.rotate(+this.Pos.R);

    g__ctx.drawImage(this.img, -adjustX, -adjustY);

    g__ctx.restore();
  }

  look_towards(delta_time, p__Pos__R__target, p__Stat_SteeringSpeed) {
    const l__PI = Math.PI;
    const l__Pos__R__old = this.Pos.R;

    const l__Stat_SteeringSpeed =
      (p__Stat_SteeringSpeed || this.m__Stat_SteeringSpeed);

    const step_length =
      (((l__Stat_SteeringSpeed.get() / 360) * (l__PI * 2)) * delta_time);

    // deno-fmt-ignore
    if ((l__Pos__R__old < 0) || ((1 / l__Pos__R__old) == -Infinity))
    {
      if (l__Pos__R__old >= p__Pos__R__target)
      {
        this.Pos.R = (((l__Pos__R__old - step_length) <= p__Pos__R__target) ? (p__Pos__R__target) : (l__Pos__R__old - step_length))
      }
      else
      {
        if ((p__Pos__R__target - l__Pos__R__old) <= ((l__Pos__R__old + l__PI) + (l__PI - p__Pos__R__target)))
        {
          this.Pos.R = (((l__Pos__R__old + step_length) >= p__Pos__R__target) ? (p__Pos__R__target) : (l__Pos__R__old + step_length))
        }
        else
        {
          const l__Pos__R__old__from_0_to_2PI = (((+(l__Pos__R__old < 0))*((l__PI*2)+l__Pos__R__old))+((+(!(l__Pos__R__old < 0)))*l__Pos__R__old))
          const l__Pos__R__target__from_0_to_2PI = (((+(p__Pos__R__target < 0))*((l__PI*2)+p__Pos__R__target))+((+(!(p__Pos__R__target < 0)))*p__Pos__R__target))
          const l__Pos__R__new__from_0_to_2PI = (((l__Pos__R__old__from_0_to_2PI - step_length) <= l__Pos__R__target__from_0_to_2PI) ? (l__Pos__R__target__from_0_to_2PI) : (l__Pos__R__old__from_0_to_2PI - step_length))
          if (l__Pos__R__new__from_0_to_2PI > l__PI)
          {
            this.Pos.R = (l__Pos__R__new__from_0_to_2PI - (l__PI * 2))
          }
          else
          {
            this.Pos.R = (l__Pos__R__new__from_0_to_2PI)
          }
        }
      }
    }
    else
    {
      if (l__Pos__R__old <= p__Pos__R__target)
      {
        this.Pos.R = (((l__Pos__R__old + step_length) >= p__Pos__R__target) ? (p__Pos__R__target) : (l__Pos__R__old + step_length))
      }
      else
      {
        if ((l__Pos__R__old - p__Pos__R__target) <= ((-l__Pos__R__old + l__PI) + (l__PI + p__Pos__R__target)))
        {
          this.Pos.R = (((l__Pos__R__old - step_length) <= p__Pos__R__target) ? (p__Pos__R__target) : (l__Pos__R__old - step_length))
        }
        else
        {
          const l__Pos__R__old__from_0_to_2PI = (((+(l__Pos__R__old < 0))*((l__PI*2)+l__Pos__R__old))+((+(!(l__Pos__R__old < 0)))*l__Pos__R__old))
          const l__Pos__R__target__from_0_to_2PI = (((+(p__Pos__R__target < 0))*((l__PI*2)+p__Pos__R__target))+((+(!(p__Pos__R__target < 0)))*p__Pos__R__target))
          const l__Pos__R__new__from_0_to_2PI = (((l__Pos__R__old__from_0_to_2PI + step_length) >= l__Pos__R__target__from_0_to_2PI) ? (l__Pos__R__target__from_0_to_2PI) : (l__Pos__R__old__from_0_to_2PI + step_length))
          if (l__Pos__R__new__from_0_to_2PI > l__PI)
          {
            this.Pos.R = (l__Pos__R__new__from_0_to_2PI - (l__PI * 2))
          }
          else
          {
            this.Pos.R = (l__Pos__R__new__from_0_to_2PI)
          }
        }
      }
    }
  }

  move_forward(delta_time, p__Stat_MovementSpeed) {
    const l__Stat_MovementSpeed =
      (p__Stat_MovementSpeed || this.m__Stat_MovementSpeed);

    const step_length0 = (l__Stat_MovementSpeed.get() * delta_time);

    const l__Pos__R = this.Pos.R;

    const step_legnth1__X = (Math.cos(l__Pos__R) * step_length0);
    const step_legnth1__Y = (Math.sin(l__Pos__R) * step_length0);

    this.Pos.X += step_legnth1__X;
    this.Pos.Y += step_legnth1__Y;
  }
  move_backward(delta_time, p__Stat_MovementSpeed) {
    const l__Stat_MovementSpeed =
      (p__Stat_MovementSpeed || this.m__Stat_MovementSpeed);

    const step_length0 = (l__Stat_MovementSpeed.get() * delta_time);

    const l__Pos__R = this.Pos.R;

    const step_legnth1__X = (Math.cos(l__Pos__R) * step_length0);
    const step_legnth1__Y = (Math.sin(l__Pos__R) * step_length0);

    this.Pos.X -= step_legnth1__X;
    this.Pos.Y -= step_legnth1__Y;
  }
  move_left(delta_time, p__Stat_MovementSpeed) {
    const l__Stat_MovementSpeed =
      (p__Stat_MovementSpeed || this.m__Stat_MovementSpeed);

    const step_length0 = (l__Stat_MovementSpeed.get() * delta_time);

    const l__Pos__R = this.Pos.R;

    const step_legnth1__X = (Math.sin(l__Pos__R) * step_length0);
    const step_legnth1__Y = (Math.cos(l__Pos__R) * step_length0);

    this.Pos.X += step_legnth1__X;
    this.Pos.Y += step_legnth1__Y;
  }
  move_right(delta_time, p__Stat_MovementSpeed) {
    const l__Stat_MovementSpeed =
      (p__Stat_MovementSpeed || this.m__Stat_MovementSpeed);

    const step_length0 = (l__Stat_MovementSpeed.get() * delta_time);

    const l__Pos__R = this.Pos.R;

    const step_legnth1__X = (Math.sin(l__Pos__R) * step_length0);
    const step_legnth1__Y = (Math.cos(l__Pos__R) * step_length0);

    this.Pos.X -= step_legnth1__X;
    this.Pos.Y -= step_legnth1__Y;
  }
  steer_left(delta_time, p__Stat_SteeringSpeed) {
    const l__PI = Math.PI;
    const l__Pos__R__old = this.Pos.R;

    const l__Stat_SteeringSpeed =
      (p__Stat_SteeringSpeed || this.m__Stat_SteeringSpeed);

    // deno-fmt-ignore
    const step_length =
      ((((l__Stat_SteeringSpeed.get() / 360) * (l__PI * 2)) * delta_time) % (l__PI * 2));

    // deno-fmt-ignore
    const l__Pos__R__old__from_0_to_2PI = (
      ((+(l__Pos__R__old < 0)) * (l__Pos__R__old + (l__PI * 2)))
      +
      ((+(!(l__Pos__R__old < 0))) * l__Pos__R__old)
    );
    const l__Pos__R__new__from_0_to_2PI =
      (l__Pos__R__old__from_0_to_2PI - step_length);

    if (l__Pos__R__new__from_0_to_2PI > l__PI) {
      this.Pos.R = (l__Pos__R__new__from_0_to_2PI - (l__PI * 2));
    } else {
      this.Pos.R = (l__Pos__R__new__from_0_to_2PI);
    }
  }
  steer_right(delta_time, p__Stat_SteeringSpeed) {
    const l__PI = Math.PI;
    const l__Pos__R__old = this.Pos.R;

    const l__Stat_SteeringSpeed =
      (p__Stat_SteeringSpeed || this.m__Stat_SteeringSpeed);

    // deno-fmt-ignore
    const step_length =
      ((((l__Stat_SteeringSpeed.get() / 360) * (l__PI * 2)) * delta_time) % (l__PI * 2));

    // deno-fmt-ignore
    const l__Pos__R__old__from_0_to_2PI = (
      ((+(l__Pos__R__old < 0)) * (l__Pos__R__old + (l__PI * 2)))
      +
      ((+(!(l__Pos__R__old < 0))) * l__Pos__R__old)
    );
    const l__Pos__R__new__from_0_to_2PI =
      (l__Pos__R__old__from_0_to_2PI + step_length);

    if (l__Pos__R__new__from_0_to_2PI > l__PI) {
      this.Pos.R = (l__Pos__R__new__from_0_to_2PI - (l__PI * 2));
    } else {
      this.Pos.R = (l__Pos__R__new__from_0_to_2PI);
    }
  }
}
