"use strict";

// Варіант 5: (5 % 10) + 1 = 6; наступний елемент — 7.
const sixthElement = document.getElementById("element-6");
const seventhElement = document.querySelector(".next-element");
const palettes = [
    { background: "#d9ecff", text: "#103d67" },
    { background: "#ffe2b6", text: "#633100" },
    { background: "#d8f3df", text: "#14552b" }
];

function enableColorChange(element) {
    let colorIndex = 0;
    function changeColors() {
        const palette = palettes[colorIndex];
        element.style.backgroundColor = palette.background;
        element.style.color = palette.text;
        colorIndex = (colorIndex + 1) % palettes.length;
    }
    element.addEventListener("click", changeColors);
    element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            changeColors();
        }
    });
}
enableColorChange(sixthElement);
enableColorChange(seventhElement);

const imageLink = document.getElementById("city-link");
const initialImage = document.getElementById("city-image");
// Зберігаємо атрибути саме вашого фото, щоб відновлювати його після видалення.
const imageSettings = {
    src: initialImage.getAttribute("src"),
    alt: initialImage.getAttribute("alt")
};
const initialWidth = Number(initialImage.getAttribute("width")) || 600;
const minWidth = 150;
const maxWidth = 1200;
let imageWidth = Math.min(maxWidth, Math.max(minWidth, initialWidth));
const step = 50;
const addButton = document.getElementById("add-image");
const enlargeButton = document.getElementById("enlarge-image");
const shrinkButton = document.getElementById("shrink-image");
const removeButton = document.getElementById("remove-image");
const status = document.getElementById("image-status");

function currentImage() {
    return document.getElementById("city-image");
}
function updateControls() {
    const image = currentImage();
    addButton.disabled = Boolean(image);
    enlargeButton.disabled = !image || imageWidth >= maxWidth;
    shrinkButton.disabled = !image || imageWidth <= minWidth;
    removeButton.disabled = !image;
    if (image) {
        image.style.width = imageWidth + "px";
        status.textContent = "Ширина зображення: " + imageWidth + " px (обмежена шириною екрана).";
    } else {
        status.textContent = "Зображення видалено. Натисніть «Додати», щоб відновити його.";
    }
}
addButton.addEventListener("click", () => {
    if (currentImage()) return;
    const image = document.createElement("img");
    image.id = "city-image";
    image.src = imageSettings.src;
    image.alt = imageSettings.alt;
    imageWidth = Math.min(maxWidth, Math.max(minWidth, initialWidth));
    imageLink.appendChild(image);
    updateControls();
});
enlargeButton.addEventListener("click", () => {
    if (!currentImage()) return;
    imageWidth = Math.min(maxWidth, imageWidth + step);
    updateControls();
});
shrinkButton.addEventListener("click", () => {
    if (!currentImage()) return;
    imageWidth = Math.max(minWidth, imageWidth - step);
    updateControls();
});
removeButton.addEventListener("click", () => {
    const image = currentImage();
    if (image) image.remove();
    updateControls();
});
updateControls();
