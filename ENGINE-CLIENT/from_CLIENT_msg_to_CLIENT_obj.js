import { Character } from "./Character.js";
import { GameEntity } from "./GameEntity.js";
import { GameObject } from "./GameObject.js";
import { Player } from "./Player.js";
import { Stat } from "./Stat.js";

export function from_CLIENT_msg_to_CLIENT_obj__Character(
  p__Character__CLIENT_msg,
) {
  let l__Character;

  if (p__Character__CLIENT_msg.type == "Character") {
    l__Character = new Character(
      {
        posX: p__Character__CLIENT_msg.args.GameObject__Args.posX,
        posY: p__Character__CLIENT_msg.args.GameObject__Args.posY,
        posR: p__Character__CLIENT_msg.args.GameObject__Args.posR,

        forwardR: p__Character__CLIENT_msg.args.GameObject__Args.forwardR,

        Stat__speed: Stat.to_CLIENT_obj(
          p__Character__CLIENT_msg.args.GameObject__Args.Stat__speed,
        ),

        isMovementImpaired:
          p__Character__CLIENT_msg.args.GameObject__Args.isMovementImpaired,
      },
      p__Character__CLIENT_msg.args.Character__Args,
    );
  } else {
    throw new TypeError();
  }

  return (l__Character);
}

export function from_CLIENT_msg_to_CLIENT_obj__GameObject(
  p__GameObject__CLIENT_msg,
) {
  let l__GameObject;

  if (p__GameObject__CLIENT_msg.type == "Character") {
    l__GameObject = from_CLIENT_msg_to_CLIENT_obj__Character(
      p__GameObject__CLIENT_msg,
    );
  } else {
    throw new TypeError();
  }

  return (l__GameObject);
}

export function from_CLIENT_msg_to_CLIENT_obj__Player(
  p__Player__CLIENT_msg,
) {
  let l__Player;

  if (p__Player__CLIENT_msg.type == "Player") {
    l__Player = new Player(
      {
        eeID: p__Player__CLIENT_msg.args.GameEntity__Args.eeID,
        GameObject: from_CLIENT_msg_to_CLIENT_obj__GameObject(
          p__Player__CLIENT_msg.args.GameEntity__Args.GameObject,
        ),
      },
      {},
    );
  } else {
    throw new TypeError();
  }

  return (l__Player);
}

export function from_CLIENT_msg_to_CLIENT_obj__GameEntity(
  p__GameEntity__CLIENT_msg,
) {
  let l__GameEntity;

  if (p__GameEntity__CLIENT_msg.type == "Player") {
    l__GameEntity = from_CLIENT_msg_to_CLIENT_obj__Player(
      p__GameEntity__CLIENT_msg,
    );
  } else {
    throw new TypeError();
  }

  return (l__GameEntity);
}
