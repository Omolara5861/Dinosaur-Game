// Importing funtions from other js file
import { setupGround, updateGround } from "./ground.js";
import { setupDino, updateDino, getDinoRect, setDinoLose } from "./dino.js";
import { setupCactus, updateCactus, getCactusRects} from "./cactus.js";


// Code to fix scaling Issues to make the game fully responsive 
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const worldElem = document.querySelector("[data-world]");

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);


function setPixelToWorldScale() {
    let worldToPixelScale;
    //if the window screen is wide, the pixels scale would be based on the width  
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    }
    //if the window screen is narrow, the pixels scale would be based on the Height
    else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }
    //Updating the Width and Height value depending on the screensize
    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}

// Creating an update Loop that runs every frame and updates the position of the element on the screen
    let lastTime;
    function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    if (checkLose()) return handleLose();



    lastTime = time;
    window.requestAnimationFrame(update);
}

// Handling Start Function and Increasing the Speed scale
let speedScale;
const SPEED_SCALE_INCREASE = 0.00001;

//Invoking handleStart funtion when any key is pressed
document.addEventListener("keydown", handleStart, { once: true });

// Geting the start instruction text 
const startScreenElem = document.querySelector("[data-start-screen]");

function handleStart() {
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add('hide');
    window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

// Creating the score function to update the game score
const scoreElem = document.querySelector("[data-score]");
let score;
function updateScore(delta) {
    score += delta * 0.01;
    scoreElem.textContent = Math.floor(score);
}

// Creating the function for when a player loses 
function checkLose() {
    const dinoRect = getDinoRect();
    return getCactusRects().some(rect => isCollision(rect, dinoRect));
}

function isCollision(rect1, rect2) {
    return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
    );
}

function handleLose() {
    setDinoLose();
    setTimeout(() => {
      document.addEventListener("keydown", handleStart, { once: true });
      startScreenElem.classList.remove("hide");
    }, 100);
  }
  