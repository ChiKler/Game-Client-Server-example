// @ts-ignore
import { GameObject } from "./GameObject.js";
// @ts-ignore
import { Stat } from "./Stat.js";

export class Character extends GameObject {
  m__Character_Skin;

  constructor(p__GameObject__Args, p__Character__Args) {
    p__Character__Args.Character_Skin = p__Character__Args.Character_Skin ||
      "Blue";

    p__GameObject__Args.Stat_MovementSpeed =
      p__GameObject__Args.Stat_MovementSpeed ||
      new Stat({ base: 300 });

    p__GameObject__Args.sprite =
      `/API/GameObject_Character_${p__Character__Args.Character_Skin}.png`;

    super(p__GameObject__Args);

    this.m__Character_Skin = p__Character__Args.Character_Skin;
  }
}
