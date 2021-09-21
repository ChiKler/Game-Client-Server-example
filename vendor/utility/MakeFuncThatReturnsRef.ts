/**
 * 
 * Returns a function which returns a reference to the value returned by {func} within the passed {context}.
 * 
 * const my_ref = MakeFuncThatReturnsRef(this, function() { return (value); });
 * 
**/
function MakeFuncThatReturnsRef(context : any, func : (() => any))
{
  return (
    function() { return (func.call(context)); }
  );
};