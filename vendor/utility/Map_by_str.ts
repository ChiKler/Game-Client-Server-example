export class Map_by_str<V>
{
  #vs_by_ks : { [ key : string ] : V } = {};


  constructor(pairs_k_and_v? : ([ k : string, v : V ][]))
  {
    if (pairs_k_and_v != undefined)
    {
      for (let i = 0; i < pairs_k_and_v.length; i++)
      {
        const pair_k_and_v = pairs_k_and_v[i];
  
        this.#vs_by_ks[pair_k_and_v[0]] = pair_k_and_v[1];
      }
    }
  }


  public set(k : string, v : V) : V
  {
    this.#vs_by_ks[k] = v;

    return (this.#vs_by_ks[k]);
  }

  public get(k : string) : (V | undefined)
  {
    return (this.#vs_by_ks[k]);
  }

  public delete(k : string) : boolean
  {
    return (delete this.#vs_by_ks[k]);
  }

  
  public keys()
  {
    return (Object.keys(this.#vs_by_ks));
  }

  
  public length()
  {
    return (this.keys().length);
  }


  public for_each(callback_fn : ((v : V, break_loop : (() => void)) => void))
  {
    const vs = Object.values(this.#vs_by_ks);

    let doBreakLoop = false;

    const break_loop = () => doBreakLoop = true;

    for (let i = 0; i < vs.length; i++)
    {
      callback_fn(vs[i], break_loop);

      if (doBreakLoop) break;
    }
  }

  /**
   * 
   * Useful when it's necessary to use await inside "callback_fn".
   * 
  **/
  public async for_each_async(callback_fn : ((v : V, break_loop : (() => void)) => Promise<void>))
  {
    const vs = Object.values(this.#vs_by_ks);

    let doBreakLoop = false;

    const break_loop = () => doBreakLoop = true;

    for (let i = 0; i < vs.length; i++)
    {
      await callback_fn(vs[i], break_loop);

      if (doBreakLoop) break;
    }
  }


  /**
   * 
   * This leaves much to be desired.
   * 
  **/
  public get_printable_str() : string
  {
    let str = `Map_by_str (${this.length()}) {\n`;

    const ks = Object.keys(this.#vs_by_ks);
    const vs = Object.values(this.#vs_by_ks);

    for(let i = 0; i < vs.length; i++)
    {
      str += `  ${ks[i]} => ${vs[i]}\n`;
    };

    return (`${str}}`);
  }
}