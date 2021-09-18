// @ts-ignore
import { GameEntity } from "./GameEntity.ts";





class Shape
{
  public static intersects_with_GameEntity(
    p__GameEntity : GameEntity,
    intersects_Rectangle : (p__Rectangle : Rectangle) => boolean
  )
  {
    let found = false;
    // @ts-ignore
    const p__GameEntity__m__GameObject__HitBox = p__GameEntity.m__GameObject.HitBox;
    const p__GameEntity__m__GameObject__HitBox__Rectangles = p__GameEntity__m__GameObject__HitBox.Rectangles;
    for (let i = 0; i < p__GameEntity__m__GameObject__HitBox__Rectangles.length; i++)
    {
      if (intersects_Rectangle(p__GameEntity__m__GameObject__HitBox__Rectangles[i])) found = true; break;
    }
    return (found);
  }

  public static select_GameEntities_that_intersect(
    p__GameEntities : Array<GameEntity>,
    intersects_Rectangle : (p__Rectangle : Rectangle) => boolean
  )
  {
    const l__GameEntities = new Array();

    p__GameEntities.forEach((p__GameEntity) => {
      if (Shape.intersects_with_GameEntity(p__GameEntity, intersects_Rectangle))
        l__GameEntities.push(p__GameEntity);
    });
  }
}


export class Point
{
  Pos : { X : number, Y : number };
  
  
  constructor(p__Pos : { X : number, Y : number })
  {
    this.Pos = p__Pos;
  }
  
  
  public intersects_Point(p__Point : Point)
  {
    const p__Point__Pos = p__Point.Pos;
    
    const this__Pos = this.Pos;
    
    return (
      (this__Pos.X == p__Point__Pos.X)
      &&
      (p__Point__Pos.Y == this__Pos.Y)
    );
  }
  
  public intersects_Rectangle(p__Rectangle : Rectangle)
  {
    const p__Rectangle__Pos = p__Rectangle.Pos;
    const p__Rectangle__Pos__X = p__Rectangle__Pos.X;
    const p__Rectangle__Pos__Y = p__Rectangle__Pos.Y;
    const p__Rectangle__Size = p__Rectangle.Size;
    const p__Rectangle__Size__X = p__Rectangle__Size.X;
    const p__Rectangle__Size__Y = p__Rectangle__Size.Y;
    
    const this__Pos = this.Pos;
    const this__Pos__X = this__Pos.X;
    const this__Pos__Y = this__Pos.Y;
    
    return (
      (this__Pos__Y >= p__Rectangle__Pos__Y)
      &&
      (this__Pos__X >= p__Rectangle__Pos__X)
      &&
      ((p__Rectangle__Pos__X + p__Rectangle__Size__X) >= this__Pos__X)
      &&
      ((p__Rectangle__Pos__Y + p__Rectangle__Size__Y) >= this__Pos__Y)
    );
  }
  
  
  public intersects_with_GameEntity(p__GameEntity : GameEntity)
  {
    Shape.intersects_with_GameEntity(p__GameEntity, this.intersects_Rectangle);
  }

  public select_GameEntities_that_intersect(p__GameEntities : Array<GameEntity>)
  {
    Shape.select_GameEntities_that_intersect(p__GameEntities, this.intersects_Rectangle);
  }
}


export class Rectangle
{
  Pos : { X : number, Y : number, R : number };
  Size : { X : number, Y : number };
  
  
  constructor(p__Pos : { X : number, Y : number, R: number }, p__Size : { X : number, Y : number })
  {
    this.Pos = p__Pos;
    this.Size = p__Size;
  }
  
  
  public intersects_Point(p__Point : Point)
  {
    const p__Point__Pos = p__Point.Pos;
    const p__Point__Pos__X = p__Point__Pos.X;
    const p__Point__Pos__Y = p__Point__Pos.Y;
    
    const this__Pos = this.Pos;
    const this__Pos__X = this__Pos.X;
    const this__Pos__Y = this__Pos.Y;
    const this__Size = this.Size;
    const this__Size__X = this__Size.X;
    const this__Size__Y = this__Size.Y;
    
    return (
      ((this__Size__Y + this__Pos__Y) >= p__Point__Pos__Y)
      &&
      ((this__Size__X + this__Pos__X) >= p__Point__Pos__X)
      &&
      (p__Point__Pos__X >= this__Pos__X)
      &&
      (p__Point__Pos__Y >= this__Pos__Y)
    );
  }
  
  public intersects_Rectangle(p__Rectangle : Rectangle)
  {
    const p__Rectangle__Pos = p__Rectangle.Pos;
    const p__Rectangle__Pos__X = p__Rectangle__Pos.X;
    const p__Rectangle__Pos__Y = p__Rectangle__Pos.Y;
    const p__Rectangle__Size = p__Rectangle.Size;
    const p__Rectangle__Size__X = p__Rectangle__Size.X;
    const p__Rectangle__Size__Y = p__Rectangle__Size.Y;
    
    const this__Pos = this.Pos;
    const this__Pos__X = this__Pos.X;
    const this__Pos__Y = this__Pos.Y;
    const this__Size = this.Size;
    const this__Size__X = this__Size.X;
    const this__Size__Y = this__Size.Y;
    
    return (
      false
    );
  }
  
  
  public intersects_with_GameEntity(p__GameEntity : GameEntity)
  {
    Shape.intersects_with_GameEntity(p__GameEntity, this.intersects_Rectangle);
  }

  public select_GameEntities_that_intersect(p__GameEntities : Array<GameEntity>)
  {
    Shape.select_GameEntities_that_intersect(p__GameEntities, this.intersects_Rectangle);
  }
}