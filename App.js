const canvas = document.getElementById("main-game");
const ctx = canvas.getContext("2d");
bgdCanvas = document.getElementById("game-background");
const bgdCtx = bgdCanvas.getContext("2d");
let startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  startButton.classList.add("hidden");
  game();
});

/* --------START GAME-------- */
function game() {
  let playerScore = document.querySelector(".player-score");
  let score = 0;

  if (playerScore === null) {
    playerScore = document.createElement("div");
    playerScore.className = "player-score";
    canvas.parentElement.appendChild(playerScore);
  }
  playerScore.innerHTML = `Player Score: ${score}`;

  const ROCKET_SHIP = new Rocket(0, canvas.height / 2, 6);
  //background image
  const bgdImage = new Image();
  bgdImage.src = "./images/space-background.png";
  bgdImage.onload = () => {
    let pattern = bgdCtx.createPattern(bgdImage, "repeat");
    bgdCtx.fillStyle = pattern;
    bgdCtx.fillRect(0, 0, bgdCanvas.width, bgdCanvas.height);
  };

  //initializations
  let astroids = [];
  let bullets = [];
  let intervals = [];

  //creates a new astroid every second.
  function createAstroids() {
    let currentInterval = setInterval(() => {
      const radius = Math.random() * 10 + 5;
      let rightY = Math.random() * canvas.height;
      let rightX = canvas.width;
      let leftY = Math.random() * canvas.height;
      let leftX = 0;
      const angle = Math.atan2(leftY - rightY, leftX - rightX);
      const speed = Math.random() * 3 + 1;
      const velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      };
      astroids.push(new Astroid(rightX, rightY, radius, velocity));
    }, 1000);
    intervals.push(currentInterval);
  }
  // Shoot bullets from rocketship every mouse click
  function createBullets() {
    addEventListener("click", (event) => {
      const angle = Math.atan2(
        event.clientY - ROCKET_SHIP.y,
        event.clientX - ROCKET_SHIP.x,
      );
      const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
      };
      bullets.push(
        new Bullet(
          ROCKET_SHIP.x + ROCKET_SHIP.width / 2,
          ROCKET_SHIP.y + ROCKET_SHIP.height / 2,
          6,
          velocity,
        ),
      );
    });
  }
  //clear astroids / bullets from array that are no longer visible
  function wentOffScreen(circle) {
    if (
      circle.x - circle.radius > canvas.width ||
      circle.x + circle.radius * 2 < 0 ||
      circle.y - circle.radius > canvas.height ||
      circle.y + circle.radius * 2 < 0
    ) {
      return true;
    }
    return false;
  }

  let animationFrame;
  function animate() {
    animationFrame = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ROCKET_SHIP.draw();

    astroids.forEach((astroid, index) => {
      astroid.draw();
      //astroid went off screen
      if (wentOffScreen(astroid)) {
        astroids.splice(index, 1);
      }
      // astroid hit rocket - game over
      if (collisionDetection(astroid, ROCKET_SHIP, 1)) {
        resetGame(animationFrame);
        intervals.forEach((interval) => {
          clearInterval(interval);
        });
      }
    });
    bullets.forEach((bullet, index) => {
      bullet.draw();
      //bullet went off screen
      if (wentOffScreen(bullet)) {
        bullets.splice(index, 1);
      }

      //bullet hit astroid
      astroids.forEach((astroid, astroidIndex) => {
        if (collisionDetection(astroid, bullet, 0)) {
          bullets.splice(index, 1);
          astroids.splice(astroidIndex, 1);
          updateScore();
        }
      });
    });
    function resetGame(animationFrame) {
      cancelAnimationFrame(animationFrame);
      startButton.classList.remove("hidden");
    }

    function updateScore() {
      score++;
      playerScore.innerHTML = `Player Score: ${score}`;
    }
  }
  createAstroids();
  createBullets();
  animate();
}

/* Representation for type : 
   0: circle/circle
   1: circle/square
   2: square/square */
function collisionDetection(shape, shape2, type) {
  //  circle and circle
  if (type == 0) {
    let hyp = Math.hypot(shape.x - shape2.x, shape.y - shape2.y);

    if (hyp < shape.radius + shape2.radius) {
      return true;
    }
  }
  //circle square
  if (type == 1) {
    let circle = "radius" in shape ? shape : shape2;
    let square = "radius" in shape ? shape2 : shape;

    // Circle is in center of square
    if (
      circle.x >= square.x &&
      circle.x <= square.x + square.width &&
      circle.y >= square.y &&
      circle.y <= square.y + square.height
    ) {
      return true;
    }

    let xCoord, yCoord;

    //Circle is left of square
    if (circle.x < square.x) {
      xCoord = square.x;
    }
    //Circle is right of square
    else if (circle.x > square.x + square.width) {
      xCoord = square.x + square.width;
    }
    //Circle is above square
    if (circle.y < square.y) {
      yCoord = square.y;
    }
    //Circle is below square
    else if (circle.y > square.y + square.height) {
      yCoord = square.y + square.height;
    }
    //Check distance from circle to nearest side of square.
    let hyp = Math.hypot(circle.x - xCoord, circle.y - yCoord);
    if (hyp < circle.radius) {
      return true;
    }
  }
  return false;
}
