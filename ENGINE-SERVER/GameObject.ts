// @ts-ignore
import { Stat } from "./Stat.ts";

export interface GameObject__Args {
  posX: number;
  posY: number;
  posR: number;

  forwardR?: number;

  Stat__speed?: Stat;

  isMovementImpaired?: boolean;
}

export abstract class GameObject {
  posX: number;
  posY: number;
  posR: number;

  forwardR: number;

  m__Stat__speed: Stat;

  isMovementImpaired: boolean;

  constructor(p__GameObject__Args: GameObject__Args) {
    this.posX = p__GameObject__Args.posX;
    this.posY = p__GameObject__Args.posY;
    this.posR = p__GameObject__Args.posR;

    this.forwardR = p__GameObject__Args.forwardR || 0;

    this.m__Stat__speed = p__GameObject__Args.Stat__speed ||
      new Stat({ value__base: 300 });

    this.isMovementImpaired = p__GameObject__Args.isMovementImpaired || false;
  }

  look_towards(delta_time: number, targetR: number) {
    const l__PI = Math.PI;
    const l__posR = this.posR;

    const step_length0 = +l__PI * delta_time;

    const step_length1 =
      +(step_length0 * <number> <unknown> (l__posR < targetR)) -
      (step_length0 * <number> <unknown> (l__posR > targetR));

    const bool0 = (l__posR + step_length1);
    const bool1 = (bool0 < targetR);
    const bool2 = (!(bool1));
    const bool3 = (l__posR >= -l__PI);
    const bool4 = (l__posR < targetR);
    const bool5 = (l__posR < 0);
    const bool6 = (bool0 > targetR);
    const bool7 = (!(bool6));
    const bool8 = (l__posR <= +l__PI);
    const bool9 = (l__posR > targetR);

    this.posR = +((+((+(bool0 * <number> <unknown> bool1) +
      (targetR * <number> <unknown> bool2)) *
      <number> <unknown> (bool3 && bool4)) +
      ((+(targetR * <number> <unknown> bool1) +
        (bool0 * <number> <unknown> bool2)) *
        <number> <unknown> (!(bool3 &&
          bool4)))) * <number> <unknown> bool5) +
      ((+((+(bool0 * <number> <unknown> bool6) +
        (targetR * <number> <unknown> bool7)) *
        <number> <unknown> (bool8 && bool9)) +
        ((+(targetR * <number> <unknown> bool6) +
          (bool0 * <number> <unknown> bool7)) *
          <number> <unknown> (!(bool8 &&
            bool9)))) * <number> <unknown> (!bool5));
  }

  move_forward(delta_time: number, p__Stat__speed: Stat) {
    this.look_towards(delta_time, this.forwardR);

    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.cos(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.sin(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_backward(delta_time: number, p__Stat__speed: Stat) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.sin(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.cos(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_left(delta_time: number, p__Stat__speed: Stat) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.cos(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.cos(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_right(delta_time: number, p__Stat__speed: Stat) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.sin(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.sin(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
}
