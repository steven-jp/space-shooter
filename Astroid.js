class Astroid {
  constructor(x, y, radius, velocity) {
    this.astroid = document.getElementById("astroid");
    this.color = "white";
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.drawImage(
      this.astroid,
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
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
