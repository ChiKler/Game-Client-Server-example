// @ts-ignore
import { Stat } from "./Stat.js";

export /*abstract */ class GameObject {
  posX;
  posY;
  posR;

  forwardR;

  m__Stat__speed;

  isMovementImpaired;

  sprite;
  img;

  constructor(p__GameObject__Args) {
    this.posX = p__GameObject__Args.posX;
    this.posY = p__GameObject__Args.posY;
    this.posR = p__GameObject__Args.posR;

    this.forwardR = p__GameObject__Args.forwardR || 0;

    this.m__Stat__speed = p__GameObject__Args.Stat__speed;

    this.isMovementImpaired = p__GameObject__Args.isMovementImpaired || false;

    this.sprite = p__GameObject__Args.sprite;
    this.img = new Image();
    this.img.src = this.sprite;
  }

  draw(g__cvs, g__ctx, g__Player) {
    const adjustX = (g__Player.get().m__GameObject).img.width / 2;
    const adjustY = (g__Player.get().m__GameObject).img.height / 2;

    g__ctx.save();

    g__ctx.translate(+this.posX, +this.posY);
    g__ctx.rotate(+this.posR);

    g__ctx.drawImage(this.img, -adjustX, -adjustY);

    g__ctx.restore();
  }

  look_towards(delta_time, targetR) {
    const l__PI = Math.PI;
    const l__posR = this.posR;

    const step_length0 = +l__PI * delta_time;

    const step_length1 = +(step_length0 * (l__posR < targetR)) -
      (step_length0 * (l__posR > targetR));

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

    this.posR = +((+((+(bool0 * bool1) +
      (targetR * bool2)) *
      (bool3 && bool4)) +
      ((+(targetR * bool1) +
        (bool0 * bool2)) *
        (!(bool3 &&
          bool4)))) * bool5) +
      ((+((+(bool0 * bool6) +
        (targetR * bool7)) *
        (bool8 && bool9)) +
        ((+(targetR * bool6) +
          (bool0 * bool7)) *
          (!(bool8 &&
            bool9)))) * (!bool5));
  }

  move_forward(delta_time, p__Stat__speed) {
    this.look_towards(delta_time, this.forwardR);

    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.cos(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.sin(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_backward(delta_time, p__Stat__speed) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.sin(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.cos(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_left(delta_time, p__Stat__speed) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.cos(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.cos(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
  move_right(delta_time, p__Stat__speed) {
    const step_length0 = (p__Stat__speed.get() * delta_time);
    const l__forwardR = this.forwardR;

    const step_legnth1X = (Math.sin(l__forwardR) * step_length0);
    const step_legnth1Y = (Math.sin(l__forwardR) * step_length0);

    this.posX += step_legnth1X;
    this.posY += step_legnth1Y;
  }
}
