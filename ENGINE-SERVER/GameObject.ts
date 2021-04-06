// @ts-ignore
import { Character, Character__SERVER_msg } from "./Character.ts";

export type GameObject__SERVER_msg = Character__SERVER_msg;

export abstract class GameObject {
  posX: number;
  posY: number;
  posR: number;

  constructor(posX: number, posY: number, posR: number) {
    this.posX = posX;
    this.posY = posY;
    this.posR = posR;
  }

  static from_SERVER_obj_to_SERVER_msg(
    p__GameObject: GameObject,
  ): GameObject__SERVER_msg {
    let l__GameObject__SERVER_msg: GameObject__SERVER_msg;

    if (p__GameObject instanceof Character) {
      l__GameObject__SERVER_msg = Character.from_SERVER_obj_to_SERVER_msg(
        p__GameObject,
      );
    } else {
      throw new TypeError();
    }

    return (l__GameObject__SERVER_msg);
  }
}
