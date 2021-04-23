export class Stat {
  #m__value__base;
  #m__value__base_bonusFLAT;
  #m__value__base_bonusPCTG;

  #m__value__max;
  #m__value__max_bonusFLAT;
  #m__value__max_bonusPCTG;

  #m__value__cap;
  #m__value__curr;

  constructor(p__Stat__Args) {
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

  get() {
    return (this.#m__value__curr);
  }

  static to_CLIENT_obj(p__CLIENT_msg__Stat) {
    return (new Stat({
      value__base: p__CLIENT_msg__Stat.value__base,
      value__base_bonusFLAT: p__CLIENT_msg__Stat.value__base_bonusFLAT,
      value__base_bonusPCTG: p__CLIENT_msg__Stat.value__base_bonusPCTG,
      value__max: p__CLIENT_msg__Stat.value__max,
      value__max_bonusFLAT: p__CLIENT_msg__Stat.value__max_bonusFLAT,
      value__max_bonusPCTG: p__CLIENT_msg__Stat.value__max_bonusPCTG,
      value__cap: p__CLIENT_msg__Stat.value__cap,
      value__curr: p__CLIENT_msg__Stat.value__curr,
    }));
  }
}
