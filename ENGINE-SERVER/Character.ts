// @ts-ignore
import { GameObject, GameObject__Args } from "./GameObject.ts";
// @ts-ignore
import { Stat } from "./Stat.ts";

export type Character_Skin = "Red" | "Green" | "Blue";

export interface Character__Args {
  Character_Skin?: Character_Skin;
}

export class Character extends GameObject {
  readonly m__Character_Skin: Character_Skin;

  constructor(
    p__GameObject__Args: GameObject__Args,
    p__Character__Args: Character__Args,
  ) {
    p__GameObject__Args.Stat__speed = p__GameObject__Args.Stat__speed ||
      new Stat({ value__base: 300 });

    super(p__GameObject__Args);

    this.m__Character_Skin = p__Character__Args.Character_Skin || "Blue";
  }
}
