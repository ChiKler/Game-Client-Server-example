/**
 *
 * const __Mutex__unlock = await __Mutex.lock();
 * // do stuff here
 * __Mutex__unlock();
 *
**/
export class Mutex
{
  #current : Promise<void> = Promise.resolve();

  constructor() {};

  public async lock() : Promise<() => void>
  {
    let _resolve : () => void;

    const promise =
      new Promise<void>((resolve) => {
        _resolve = () => resolve(void 0);
      });

    const unlock = this.#current.then(() => _resolve);
    this.#current = promise;
    return (unlock);
  }
}
