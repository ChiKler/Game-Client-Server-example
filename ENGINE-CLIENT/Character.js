// @ts-ignore
import { GameObject } from "./GameObject.js";

export class Character extends GameObject {
  m__Character_Skin;

  constructor(posX, posY, posR, p__Character_Skin) {
    super(
      posX,
      posY,
      posR,
      `/API/GameObject_Character_${p__Character_Skin}.png`,
    );

    this.m__Character_Skin = p__Character_Skin;
  }
}
