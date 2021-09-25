export class Map_by_num
{
  #vs_by_ks = {};


  constructor(pairs_k_and_v)
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


  set(k, v)
  {
    this.#vs_by_ks[k] = v;

    return (this.#vs_by_ks[k]);
  }

  get(k)
  {
    return (this.#vs_by_ks[k]);
  }

  delete(k)
  {
    return (delete this.#vs_by_ks[k]);
  }

  
  keys()
  {
    return (Object.keys(this.#vs_by_ks));
  }

  
  length()
  {
    return (this.keys().length);
  }


  for_each(callback_fn)
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
  async for_each_async(callback_fn)
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
  get_printable_str()
  {
    let str = `Map_by_num (${this.length()}) {\n`;

    const ks = Object.keys(this.#vs_by_ks);
    const vs = Object.values(this.#vs_by_ks);

    for(let i = 0; i < vs.length; i++)
    {
      str += `  ${ks[i]} => ${vs[i]}\n`;
    };

    return (`${str}}`);
  }
}