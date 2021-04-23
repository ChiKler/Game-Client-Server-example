interface Stat__Args {
  value__base: number;
  value__base_bonusFLAT?: number;
  value__base_bonusPCTG?: number;

  value__max_bonusFLAT?: number;
  value__max_bonusPCTG?: number;

  value__curr?: number;
}

export class Stat {
  #m__value__base: number;
  #m__value__base_bonusFLAT: number;
  #m__value__base_bonusPCTG: number;

  #m__value__max: number;
  #m__value__max_bonusFLAT: number;
  #m__value__max_bonusPCTG: number;

  #m__value__cap: number;
  #m__value__curr: number;

  constructor(p__Stat__Args: Stat__Args) {
    this.#m__value__base = p__Stat__Args.value__base;
    this.#m__value__base_bonusFLAT = p__Stat__Args.value__base_bonusFLAT || 0;
    this.#m__value__base_bonusPCTG = p__Stat__Args.value__base_bonusPCTG ||
      1.000;

    this.#m__value__max =
      ((this.#m__value__base + this.#m__value__base_bonusFLAT) *
        this.#m__value__base_bonusPCTG);

    this.#m__value__max_bonusFLAT = p__Stat__Args.value__max_bonusFLAT || 0;
    this.#m__value__max_bonusPCTG = p__Stat__Args.value__max_bonusPCTG || 1.000;

    this.#m__value__cap =
      ((this.#m__value__max + this.#m__value__max_bonusFLAT) *
        this.#m__value__max_bonusPCTG);

    this.#m__value__curr = p__Stat__Args.value__curr || this.#m__value__cap;
  }

  public get(): number {
    return (this.#m__value__curr);
  }

  public static to_SERVER_msg(p__Stat: Stat) {
    return ({
      value__base: p__Stat.#m__value__base,
      value__base_bonusFLAT: p__Stat.#m__value__base_bonusFLAT,
      value__base_bonusPCTG: p__Stat.#m__value__base_bonusPCTG,
      value__max: p__Stat.#m__value__max,
      value__max_bonusFLAT: p__Stat.#m__value__max_bonusFLAT,
      value__max_bonusPCTG: p__Stat.#m__value__max_bonusPCTG,
      value__cap: p__Stat.#m__value__cap,
      value__curr: p__Stat.#m__value__curr,
    });
  }
}
