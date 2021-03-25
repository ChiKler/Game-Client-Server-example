export function time_stamp() : number
{
  return (window.performance && window.performance.now ? window.performance.now() : Date.now());
};