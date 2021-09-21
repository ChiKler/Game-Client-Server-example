class Map_by_ID<T>
{
  #map_by_ID : { [ key : number ] : T } = {};


  constructor(pairs_ID_and_item : ([ ID : number, item : T ][]))
  {
    for (let i = 0; i < pairs_ID_and_item.length; i++)
    {
      const pair_ID_and_item = pairs_ID_and_item[i];

      this.#map_by_ID[pair_ID_and_item[0]] = pair_ID_and_item[1];
    }
  }


  public set(ID : number, item : T) : T
  {
    this.#map_by_ID[ID] = item;

    return (this.#map_by_ID[ID]);
  }

  public get(ID : number) : (T | undefined)
  {
    return (this.#map_by_ID[ID]);
  }

  public delete(ID : number) : boolean
  {
    return (delete this.#map_by_ID[ID]);
  }
}