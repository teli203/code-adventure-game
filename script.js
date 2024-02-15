import { textNodes } from "./textNodes.js";

const titleElement = document.getElementById("title");
const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices")

function toggleButtonState(disable) {                   /* disable the btns when txt is loading so it doesn't jump ahead */
    const buttons = document.querySelectorAll("./choice");
    for (let button of buttons) {
        button.disable = disable;
    }
}