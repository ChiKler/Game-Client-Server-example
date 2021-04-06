// @ts-ignore
import { GameObject } from "./GameObject.ts";

export type Character_Skin = "Red" | "Green" | "Blue";

export interface Character__SERVER_msg {
  type: string;
  args: {
    posX: number;
    posY: number;
    posR: number;

    Character_Skin: Character_Skin;
  };
}

export class Character extends GameObject {
  readonly m__Character_Skin: Character_Skin;

  constructor(
    posX: number,
    posY: number,
    posR: number,
    p__Character_Skin: Character_Skin,
  ) {
    super(posX, posY, posR);

    this.m__Character_Skin = p__Character_Skin;
  }

  static from_SERVER_obj_to_SERVER_msg(
    p__Character: Character,
  ): Character__SERVER_msg {
    let l__Character__SERVER_msg: Character__SERVER_msg;

    l__Character__SERVER_msg = {
      type: "Character",
      args: {
        // @ts-ignore
        posX: p__Character.posX,
        // @ts-ignore
        posY: p__Character.posY,
        // @ts-ignore
        posR: p__Character.posR,

        Character_Skin: p__Character.m__Character_Skin,
      },
    };

    return (l__Character__SERVER_msg);
  }
}
