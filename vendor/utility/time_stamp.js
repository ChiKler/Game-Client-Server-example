export function time_stamp()
{
  return (window.performance && window.performance.now ? window.performance.now() : Date.now());
};