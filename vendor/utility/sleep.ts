/**
 * 
 * REMEMBER TO USE AWAIT.
 * 
**/
export async function sleep(ms : number) : Promise<void>
{
  await new Promise(resolve => setTimeout(resolve, ms));
};