/**
 *
 * const __Mutex__unlock = await __Mutex.lock();
 * // do stuff here
 * __Mutex__unlock();
 *
**/
export class Mutex
{
  #current = Promise.resolve();

  constructor() {};

  async lock()
  {
    let _resolve;

    const promise =
      new Promise((resolve) => {
        _resolve = () => resolve(void 0);
      });

    const unlock = this.#current.then(() => _resolve);
    this.#current = promise;
    return (unlock);
  }
}
