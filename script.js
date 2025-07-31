const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ball = {
  x: 100,
  y: 300,
  radius: 20,
  dx: 2,
  dy: 0,
  gravity: 0.5,
  onGround: false
};

let platforms = [
  { x: 0, y: 380, width: 800, height: 20 },
  { x: 200, y: 300, width: 100, height: 10 },
  { x: 400, y: 250, width: 150, height: 10 },
];

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawPlatforms() {
  ctx.fillStyle = "green";
  platforms.forEach(p => {
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });
}

function update() {
  ball.dy += ball.gravity;
  ball.y += ball.dy;
  ball.x += ball.dx;

  ball.onGround = false;
  platforms.forEach(p => {
    if (
      ball.x + ball.radius > p.x &&
      ball.x - ball.radius < p.x + p.width &&
      ball.y + ball.radius > p.y &&
      ball.y + ball.radius < p.y + p.height &&
      ball.dy >= 0
    ) {
      ball.dy = 0;
      ball.y = p.y - ball.radius;
      ball.onGround = true;
    }
  });

  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.dy = 0;
    ball.onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  drawBall();
  update();
  requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight') ball.dx = 3;
  if (e.key === 'ArrowLeft') ball.dx = -3;
  if (e.key === ' ' && ball.onGround) ball.dy = -10;
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') ball.dx = 0;
});

draw();
