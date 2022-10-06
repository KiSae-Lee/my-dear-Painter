const eraseBtn = document.querySelector("#eraser-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const modeBtn = document.querySelector("#mode-btn");
const colorOptions = Array.from(document.querySelectorAll(".color-option"));
const color = document.querySelector("#color");
const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

function drawLine(startPosX, startPosY, endPosX, endPosY, lineWidth) {
  ctx.beginPath();
  ctx.moveTo(startPosX, startPosY);
  ctx.lineTo(endPosX, endPosY);
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();
}

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown(event) {
  isPainting = true;
}

function onMouseUp(event) {
  isPainting = false;
  ctx.beginPath();
}

function onCanvasClick(event) {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function onValueChange(event) {
  ctx.lineWidth = event.target.value;
}

function changeStyles(style) {
  ctx.strokeStyle = style;
  ctx.fillStyle = style;
}

function onColorChange(event) {
  const colorValue = event.target.value;
  changeStyles(colorValue);
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  changeStyles(colorValue);
}

function onModeClick(event) {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onValueChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraserClick);
