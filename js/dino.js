// Code to make the dino active. (to make it run and jump)
import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
} from "./updateCustomProperty.js";

const dinoElem = document.querySelector("[data-dino]");
const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function setupDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElem, "--bottom", 0);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
    dinoElem.src = "imgs/dino-lose.png";
}

// Moving through the 2 Dino moving
function handleRun(delta, speedScale) {
    // Setting the dino to the sttionry animtion if it's jumping
    if (isJumping) {
    dinoElem.src = `imgs/dino-stationary.png`;
    return;
    }
    
    /* Checking the frame time everytime this functon is called so as the game gets quicker, the animation would move faster and the game gets tougher*/

    if (currentFrameTime >= FRAME_TIME) {
    dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
    dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
    currentFrameTime -= FRAME_TIME;
    }
    // Making the animation faster 
    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isJumping) return;

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta);

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
    setCustomProperty(dinoElem, "--bottom", 0);
    isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

// 
function onJump(e) {
    if (e.keyCode !== 32 && e.keyCode !== 38 || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
}
