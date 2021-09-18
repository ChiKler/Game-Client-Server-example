import { Rectangle } from "./Shape.js";





class GameMap__QuadTree__Quadrant
{
  id;
  parent;
  Rectangle;
  is_subdivided;
  children;
  GameEntities;
  
  
  /*private */static id_count = 0;
  
  
  /*private */static is_subdivisible(p__Rectangle__Size__X, p__Rectangle__Size__Y, p__GameEntities__length)
  {
    return (
      (((p__Rectangle__Size__X > 200) && (p__Rectangle__Size__Y > 200)) && (p__GameEntities__length > 2))
      ||
      (((p__Rectangle__Size__X > 80) && (p__Rectangle__Size__Y > 80)) && (p__GameEntities__length > 3))
    );
  }
  
  
  constructor(parent, p__Rectangle, p__GameEntities, p__Quadrants, p__Quadrants_by_eeID)
  {
    this.id = GameMap__QuadTree__Quadrant.id_count++;
    this.parent = parent;
    this.Rectangle = p__Rectangle;
    
    const this__Rectangle__Size__X = this.Rectangle.Size.X;
    const this__Rectangle__Size__Y = this.Rectangle.Size.Y;
    
    if (GameMap__QuadTree__Quadrant.is_subdivisible(this__Rectangle__Size__X, this__Rectangle__Size__Y, p__GameEntities.length))
    {
      const p__Rectangle__Size__X__half = (this__Rectangle__Size__X / 2);
      const p__Rectangle__Size__Y__half = (this__Rectangle__Size__Y / 2);
      const p__Rectangle__Pos__X = p__Rectangle.Pos.X;
      const p__Rectangle__Pos__Y = p__Rectangle.Pos.Y;
      
      const generate_Quadrant = (p__Rectangle) => {
        return (
          new GameMap__QuadTree__Quadrant(
            p__Rectangle,
            p__Rectangle.select_GameEntities_that_intersect(p__GameEntities)
          )
        );
      }
      
      (() => {
        (async () => {
          this.children.nw = generate_Quadrant(
            new Rectangle(
              {
                X: this__Rectangle__Pos__X,
                Y: this__Rectangle__Pos__Y,
                R: 0
              },
              {
                X: this__Rectangle__Size__X__half,
                Y: this__Rectangle__Size__Y__half
              }
            ),
          );
        })(),
        (async () => {
          this.children.ne = generate_Quadrant(
            new Rectangle(
              {
                X: (this__Rectangle__Pos__X + this__Rectangle__Size__X__half),
                Y: this__Rectangle__Pos__Y,
                R: 0
              },
              {
                X: this__Rectangle__Size__X__half,
                Y: this__Rectangle__Size__Y__half
              }
            ),
          );
        })(),
        (async () => {
          this.children.sw = generate_Quadrant(
            new Rectangle(
              {
                X: this__Rectangle__Pos__X,
                Y: (this__Rectangle__Pos__Y + this__Rectangle__Size__Y__half),
                R: 0
              },
              {
                X: this__Rectangle__Size__X__half,
                Y: this__Rectangle__Size__Y__half
              }
            ),
          );
        })(),
        (async () => {
          this.children.se = generate_Quadrant(
            new Rectangle(
              {
                X: (this__Rectangle__Pos__X + this__Rectangle__Size__X__half),
                Y: (this__Rectangle__Pos__Y + this__Rectangle__Size__Y__half),
                R: 0
              },
              {
                X: this__Rectangle__Size__X__half,
                Y: this__Rectangle__Size__Y__half
              }
            ),
          );
        })()
      })();
      
      this.is_subdivided = true;
    }
    else
    {
      const this__id_accessor = this.id + "";
      
      p__Quadrants[this__id_accessor] = this;

      this.GameEntities = new Array();

      for (let i = 0; i < p__GameEntities.length; i++)
      {
        const p__GameEntity = p__GameEntities[i];
        
        const eeID = p__GameEntity.eeID;
        
        const eeID_accessor = eeID + "";
        
        this.GameEntities[eeID_accessor] = p__GameEntity;
        
        p__Quadrants_by_eeID[eeID_accessor][this__id_accessor] = this;

        this.eeIDs.push(eeID);
      };
      
      this.is_subdivided = false;
    }
  }
  
  
  /*public */async get_array_of_children()
  {
    const l__Quadrants = new Array();
    
    const search = async (Quadrant) =>
    {
      if (Quadrant.subdivided)
      {
        search(Quadrant.children.nw)
        search(Quadrant.children.ne)
        search(Quadrant.children.sw)
        search(Quadrant.children.se)
      }
      else
      {
        l__Quadrants.push(Quadrant);
        return;
      }
    }
    
    await search(this);
    
    return (l__Quadrants);
  }
}


export class GameMap__QuadTree
{
  #Quadrant;
  
  #Quadrants;
  
  #Quadrants_by_eeID;
  
  
  constructor(p__GameMap, p__GameEntities)
  {
    const l__GameEntities = new Array();
    
    p__GameEntities.forEach((p__GameEntity) => {
      l__GameEntities.push(p__GameEntity);
    });
    
    this.#Quadrants = {};
    
    this.#Quadrants_by_eeID = new Map();
    
    this.#Quadrant = new GameMap__QuadTree__Quadrant(
      undefined,
      new Rectangle({ X: 0, Y: 0, R: 0 }, { X: p__GameMap.Size.X, Y: p__GameMap.Size.Y }),
      l__GameEntities,
      this.#Quadrants,
      this.#Quadrants_by_eeID
    );console.log(this);
  }
  
  
  insert(p__GameEntity)
  {
    const l__Quadrants_that_intersect_with_GameEntity = new Array();

    const l__Quadrants__vs = Object.values(this.#Quadrants);
    for (let i = 0; i < l__Quadrants__vs; i++)
    {
      const l__Quadrants__v = l__Quadrants__vs[i]
      if (l__Quadrants__v.Rectangle.intersects_with_GameEntity)
        l__Quadrants_that_intersect_with_GameEntity.push(l__Quadrants__v);
    }

    //
  }
  
  
  remove(eeID)
  {
    const l__Quadrants = this.#Quadrants_by_eeID[eeID + ""];
    
    const l__Quadtrees_removed__ids = new Array();
    
    const l__Quadrants__vs = Object.values(l__Quadrants);
    for (let i = 0; i < vs.length; i++)
    {
      const l__Quadrant = l__Quadrants__vs[i];
      
      
      const l__GameEntities = l__Quadrant.GameEntities;
      
      const l__GameEntities__ks = Object.keys(l__GameEntities);
      for (let i = 0; i < ks.length; i++)
      {
        if (l__GameEntities__ks[i] == eeID) delete l__GameEntities[eeID + ""];
      }


      let needsToBeUpdated = true;
      
      for (let i = 0; i < l__Quadtrees_removed__ids.length; i++)
      {
        if (l__Quadtrees_removed__ids[i] == l__Quadrant.id) needsToBeUpdated = false; break;
      }
      
      if (needsToBeUpdated)
      {
        const l__Quadrant__parent = l__Quadrant.parent;

        const l__Quadrant__siblings__GameEntities = {};

        const add_GameEntities_from_siblings = (l__Quadrant__sibling) =>
        {
          l__Quadtrees_removed__ids.push(l__Quadrant__sibling.id);

          const l__Quadrant__sibling__GameEntities = l__Quadrant__sibling.GameEntities;

          for (let i = 0; i < l__Quadrant__sibling__GameEntities.length; i++)
          {
            l__Quadrant__siblings__GameEntities[eeID + ""] = l__Quadrant__sibling__GameEntities[i];
          }
        }

        const l__Quadrant__siblings = l__Quadrant__parent.children;

        add_GameEntities_from_siblings(l__Quadrant__siblings.nw);
        add_GameEntities_from_siblings(l__Quadrant__siblings.ne);
        add_GameEntities_from_siblings(l__Quadrant__siblings.sw);
        add_GameEntities_from_siblings(l__Quadrant__siblings.se);

        if
        (
          (l__Quadrant__parent != undefined)
          &&
          (!GameMap__QuadTree__Quadrant.is_subdivisible(
            l__Quadrant__parent.Rectangle.Size.X,
            l__Quadrant__parent.Rectangle.Size.Y,
            l__Quadrant__siblings__GameEntities.length
          ))
        )
        {
          l__Quadrant__parent.GameEntities = l__Quadrant__siblings__GameEntities;

          l__Quadrant__parent.is_subdivided = false;

          this__Quadrants__k = l__Quadrant__parent.id + "";

          this.#Quadrants[this__Quadrants__k] = l__Quadrant__parent;

          for (let i = 0; i < l__Quadrant__parent.GameEntities.length; i++)
          {
            this.#Quadrants_by_eeID[l__Quadrant__parent__GameEntities[i].eeID + ""]
              [this__Quadrants__k] = l__Quadrant__parent;
          }

          l__Quadrant__siblings = undefined;
        }
      }
    }

    for (let i = 0; i < l__Quadtrees_removed__ids.length; i++)
    {
      const this__Quadrants__ks = Object.keys(this.#Quadrants);
      for (let i = 0; i < this__Quadrants__ks.length; i++)
      {
        const this__Quadrants__k = this__Quadrants__ks[i];
        if (this__Quadrants__k == l__Quadtrees_removed__ids[i])
          delete this.#Quadrants[this__Quadrants__k];
      }

      const this__Quadrants_by_eeID__vs = Object.values(this.#Quadrants_by_eeID);
      for (let i = 0; i < this__Quadrants_by_eeID__vs.length; i++)
      {
        const this__Quadrants_by_eeID__v = this__Quadrants_by_eeID__vs[i];
        const this__Quadrants_by_eeID__v__ks = Object.keys(this__Quadrants_by_eeID__v);
        for (let i = 0; i < this__Quadrants_by_eeID__v__ks.length; i++)
        {
          const this__Quadrants_by_eeID__v__k = this__Quadrants_by_eeID__v__ks[i];
          if (this__Quadrants_by_eeID__v__k == l__Quadtrees_removed__ids[i])
            delete l__Quadrants[this__Quadrants_by_eeID__v__k];
        }
      }
    }
  }


  update_because_GameEntity_has_moved(eeID, p__GameEntity)
  {
    this.remove(eeID);
    this.insert(p__GameEntity);
  }
  
  
  /*private */get_Quadrants_that_intersect_with_Shape(p__Shape)
  {
    const l__Quadrants = new Array();

    const l__Quadrants__vs = Object.values(this.#Quadrants);
    for (let i = 0; i < l__Quadrants__vs.length; i++)
    {
      const l__Quadrant = l__Quadrants__vs[i];

      if (p__Shape.intersects_Rectangle(l__Quadrant.Rectangle)) l__Quadrants.push(l__Quadrant);
    }

    return (l__Quadrants);
  }
}