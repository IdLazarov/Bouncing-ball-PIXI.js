const Application = PIXI.Application;

const app = new Application({
  width: 800,
  height: 600,
  transparent: false,
  antialiases: true,
  backgroundColor: "0xffffff",
});

app.renderer.resize(window.innerWidth, window.innerHeight);

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

const Graphics = PIXI.Graphics;
const ballSize = 32;
let lineHight = 800;
let start = 0;
let speed = 3;
let direction = 1;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

const circle = new Graphics();
circle.lineStyle(1, 0x000000);
circle.beginFill(0x22aacc).drawCircle(centerX, centerY, ballSize).endFill();
app.stage.addChild(circle);
circle.interactive = true;
circle.buttonMode = true;

const line = new Graphics();
line
  .lineStyle(5, 0xffea00, 1)
  .moveTo(0, lineHight)
  .lineTo(window.innerWidth, lineHight);
app.stage.addChild(line);

let randomColor = function () {
  return Math.floor(Math.random() * 16777205).toString(16);
};

app.ticker.add((delta) => loop(delta));

function loop(delta) {
  circle.y += direction * speed;
  circle.on("click", function () {
    direction = -1;
  });

  if (circle.y + ballSize / 2 > 300) {
    let color = randomColor();
    let hexClolor = PIXI.utils.rgb2hex(color);
    app.renderer.backgroundColor = hexClolor;
    direction *= -1;
  } else if (circle.y === start) {
    direction *= -1;
  } else {
    //Change the gravity(faster or slower bouncing) by increseing addition to the value of direction
    direction += 0.07;
  }
}
