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

function onValueChange(event) {
  ctx.lineWidth = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);

lineWidth.addEventListener("change", onValueChange);
