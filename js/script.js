// Importing funtions from other js file
import { setupGround, updateGround } from "./ground.js";


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
    setupGround();
    let lastTime;
    // let speedScale;
    // let score;
    function update(time) {
    if (lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const delta = time - lastTime;
    updateGround(delta, 1);

    lastTime = time;
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);
