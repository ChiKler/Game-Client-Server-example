export type Ref<T> = { get : (() => T), set : ((w : T) => void) };

export function MakeRef<T>(v : T) : Ref<T>
{
  return ({
    get: function() : T {
      return (v);
    },
    set: function(w : T) : void {
      v = w;
    }
  });
};