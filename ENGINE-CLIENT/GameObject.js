export /*abstract */ class GameObject {
  posX;
  posY;
  posR;

  sprite;
  img;

  constructor(posX, posY, posR, sprite) {
    this.posX = posX;
    this.posY = posY;
    this.posR = posR;

    this.sprite = sprite;
    this.img = new Image();
    this.img.src = sprite;
  }

  draw(g__cvs, g__ctx, g__Player) {
    const adjustX = (g__Player.m__GameObject).img.width / 2;
    const adjustY = (g__Player.m__GameObject).img.height / 2;

    g__ctx.save();

    g__ctx.translate(+this.posX, +this.posY);
    g__ctx.rotate(+this.posR);

    g__ctx.drawImage(this.img, -adjustX, -adjustY);

    g__ctx.restore();
  }
}
