const ASTROID = new Image();
ASTROID.src = "./images/astroid.png";

class Astroid {
  constructor(x, y, radius, velocity) {
    this.color = "white";
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.counter = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(
      ASTROID,
      this.x,
      this.y,
      this.radius * 2.5,
      this.radius * 2.5,
    );
    ctx.arc(
      this.x + this.radius,
      this.y + this.radius,
      this.radius,
      0,
      Math.PI * 2,
      false,
    );

    if (this.counter > 360) {
      this.counter = 0;
    }
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
