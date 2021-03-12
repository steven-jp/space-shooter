class Bullet {
  constructor(x, y, radius, velocity) {
    this.color = "blue";
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.astroid = document.getElementById("astroid");
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "yellow";
    ctx.fill();

    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
