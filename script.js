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

function showTextNode(textNodeIndex) {
    if(window.animationInterval) {
        clearInterval(window.animationInterval)
    }

    const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
    titleElement.innerText =textNode.title;
    storyElement.textContent = "";                      /* clearing the text of the previous pg if theres one */

    const backgroundElement = document.getElementById("background");
    backgroundElement.style.backgroundImage = 'url("' +textNode.img + '")';
    backgroundElement.style.backgroundSize ="cover";
    backgroundElement.style.backgroundPosition ="center";

    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild);
    }

    textNode.options.forEach((option) => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.classList.add("choice");
        button.addEventListener("click", () => selectOption(option));
        choicesElement.appendChild(button);
    });

    const words = textNode.text.split("");
    let index = 0;                                      /* split all characters of the words */

    toggleButtonState(true);

    window.animationInterval = setInterval(() => {
        if (index < words.length) {
            storyElement.textContent += words[index++];
        } else {
            clearInterval(window.animationInterval);
            toggleButtonState(false);
        }
    }, 20);
}