const startContainer = document.querySelector(".start-container");
const canvasContainer = document.querySelector(".canvas-container");
const canvasWidth = document.getElementById("width-range");
const canvasHeight = document.getElementById("height-range");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");
const createBtn = document.getElementById("create-btn");
const color = document.getElementById("color");
const paint = document.getElementById("paint");
const erase = document.getElementById("erase");
const clearBtn = document.getElementById("clear-btn");
const canvas = document.getElementById("canvas");
const refreshBtn = document.getElementById("refresh-btn");

let isPainting = false;
let isErasing = false;


canvasWidth.addEventListener("input", () => {
    widthValue.textContent = canvasWidth.value;
});

canvasHeight.addEventListener("input", () => {
    heightValue.textContent = canvasHeight.value;
});

const createCanvas = () => {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";

    const width = parseInt(canvasWidth.value);
    const height = parseInt(canvasHeight.value);

    canvas.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${height}, 1fr)`;

    for (let i = 0; i < width * height; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = "20px";
        cell.style.height = "20px";

        cell.addEventListener("mousedown", (e) => {
            isPainting = true;
            if (isErasing) {
                cell.style.backgroundColor = "white";
            } else {
                cell.style.backgroundColor = color.value;
            }
        });


        cell.addEventListener("mousemove", (e) => {
            if (isPainting) {
                if (isErasing) {
                    cell.style.backgroundColor = "white";
                } else {
                    cell.style.backgroundColor = color.value;
                }
            }
        });

        cell.addEventListener("mouseup", () => {
            isPainting = false;
        });

        erase.addEventListener("mousedown", () => {
            isErasing = true;
        });

        paint.addEventListener("mousedown", () => {
            isErasing = false;
        });
        canvas.appendChild(cell);
    }

    document.addEventListener("mouseup", () => {
        isPainting = false;
    });
};

createBtn.addEventListener("click", () => {
    startContainer.style.display = "none";
    canvasContainer.style.display = "flex";
    createCanvas();
});

clearBtn.addEventListener("click", () => {

    canvas.innerHTML = "";

    widthValue.textContent = canvasWidth.value;
    heightValue.textContent = canvasHeight.value;

    createCanvas();
});

refreshBtn.addEventListener("click", () => {
    canvasContainer.style.display = "none";
    startContainer.style.display = "flex";
    canvas.innerHTML = "";
    isErasing = false;
});

