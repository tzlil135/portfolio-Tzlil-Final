
// hangman.js


export const drawHangman = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 100);
    ctx.lineTo(250, 50);
    ctx.lineTo(100, 50);
    ctx.lineTo(100, 250);
    ctx.lineTo(400, 250);
    ctx.stroke();
};

export const drawHead = (ctx) => {
    ctx.beginPath();
    ctx.arc(250, 125, 25, 0, Math.PI * 2);
    ctx.stroke();
};

export const drawBody = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250, 200);
    ctx.stroke();
};

export const drawLeftArm = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(220, 180);
    ctx.stroke();
};

export const drawRightArm = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(280, 180);
    ctx.stroke();
};

export const drawLeftLeg = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 200);
    ctx.lineTo(220, 240);
    ctx.stroke();
};

export const drawRightLeg = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 200);
    ctx.lineTo(280, 240);
    ctx.stroke();
};
