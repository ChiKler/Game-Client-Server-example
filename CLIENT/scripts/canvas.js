export const g__cvs = document.getElementById("canvas-GameMap-default");
export const g__ctx = g__cvs.getContext("2d");

export let g__half_canvas_sizeX;
export let g__half_canvas_sizeY;

export function g__canvas__set() {
  g__cvs.width = window.innerWidth;
  g__cvs.height = window.innerHeight;

  g__half_canvas_sizeX = g__cvs.width / 2;
  g__half_canvas_sizeY = g__cvs.height / 2;
}
globalThis.g__canvas__set = g__canvas__set;
