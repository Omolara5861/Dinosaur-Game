// Importing the helper function
import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./updateCustomProperty.js";
  
  const SPEED = 0.5;
  const groundElems = document.querySelectorAll("[data-ground]");
  
  export function setupGround() {
    setCustomProperty(groundElems[0], "--left", 0);
    setCustomProperty(groundElems[1], "--left", 300);
  }
  
  export function updateGround(delta, speedScale) {
    // Increasing the speed scale 
    groundElems.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * SPEED * -1);
    // looping through the ground element so It always reconnect at the end of each line / ground image
    if (getCustomProperty(ground, "--left") <= -300) {
        incrementCustomProperty(ground, "--left", 600);
    }
    });
}