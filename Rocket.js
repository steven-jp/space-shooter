class Rocket {
  constructor(x, y, velocity) {
    this.border = 10;
    this.rocket = document.getElementById("rocket-ship");
    this.height = 50;
    this.width = 90;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.keysPressed = [];
    document.addEventListener("keydown", (event) => {
      this.keysPressed[event.key] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keysPressed[event.key] = false;

      //add additional attributes to make rocket movement look better.
      if (event.key === "ArrowRight") {
        let currentVelocity = this.velocity;
        let timeVal = setInterval(() => {
          this.moveForward(currentVelocity);
          currentVelocity -= this.velocity * 0.1;
          if (currentVelocity <= 0) {
            clearInterval(timeVal);
          }
        }, 100);
      }

      if (event.key === "ArrowLeft") {
        let currentVelocity = 0;
        let timeVal = setInterval(() => {
          this.moveBackward(currentVelocity);
          currentVelocity += this.velocity * 0.5;
          if (currentVelocity >= this.velocity) {
            clearInterval(timeVal);
          }
        }, 100);
      }
    });
    this.movementLoop();
  }

  movementLoop() {
    setInterval(() => {
      if (this.keysPressed.ArrowRight == true) {
        this.moveForward(this.velocity);
      }
      if (this.keysPressed.ArrowLeft == true) {
        this.moveBackward(this.velocity);
      }
      if (this.keysPressed.ArrowUp == true) {
        this.moveUp(this.velocity);
      }
      if (this.keysPressed.ArrowDown == true) {
        this.moveDown(this.velocity);
      }
    }, 25);
  }

  moveForward(currentVelocity) {
    if (this.x + this.width + this.border < canvas.width) {
      this.x += currentVelocity;
    }
  }

  moveBackward(currentVelocity) {
    if (this.x - this.border > 0) {
      this.x -= currentVelocity;
    }
  }

  moveUp(currentVelocity) {
    if (this.y - this.border > 0) {
      this.y -= currentVelocity;
    }
  }

  moveDown(currentVelocity) {
    if (this.y + this.height + this.border < canvas.height) {
      this.y += currentVelocity;
    }
  }

  draw() {
    ctx.beginPath();
    //update hit box to be smaller than image
    ctx.rect(this.x + 10, this.y + 10, this.width - 20, this.height - 20);
    ctx.drawImage(this.rocket, this.x, this.y, this.width, this.height);
  }
}
