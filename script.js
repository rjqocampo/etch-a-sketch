const containerSketch = document.getElementById('container-sketch')
const slider = document.getElementById('slider');
const buttonSize = document.getElementById('button-size');
const buttonToggle = document.getElementById('button-toggle');

function makeGrids(n = 2) {
    for (let i = 0; i < (n * n); i++) {
        const grid = document.createElement('div');
        grid.setAttribute('class', 'grid');
        grid.style.width = `${(1 / n) * 100}%`;
        containerSketch.appendChild(grid);
    }
}

function removeGrids() {
    while (containerSketch.firstChild) {
        containerSketch.removeChild(containerSketch.firstChild);
    }
}

function erase(e) {
    e.target.style.backgroundColor = "white";
}

function black(e) {
    e.target.style.backgroundColor = "black";
}

function shade(e) {
    e.target.style.backgroundColor = "orange";
}

function toggleMode(e) {
    if (buttonToggle.textContent === "Black") {
        buttonToggle.textContent = "Erase";
        containerSketch.removeEventListener('mouse', black);
        containerSketch.addEventListener('mouseover', erase);
        return;
    } else if (buttonToggle.textContent === "Erase") {
        buttonToggle.textContent = "Shade";
        containerSketch.removeEventListener('mouseover', erase);
        containerSketch.addEventListener('mouseover', shade);
        return;
    } else if (buttonToggle.textContent === "Shade") {
        buttonToggle.textContent = "Black";
        containerSketch.removeEventListener('mouseover', shade);
        containerSketch.addEventListener('mouseover', black);
        return;
    }
}

containerSketch.addEventListener('mouseover', black);
buttonToggle.addEventListener('click', toggleMode);

// slider to change pad size
slider.addEventListener('input', () => {
    removeGrids();
    makeGrids(slider.textContent);
});

// button to change pad size
buttonSize.addEventListener('click', () => {
    let n = prompt('Enter grid size', '1-100');
    if (n > 100 || n <= 0) {
        alert('Kindly enter 1-100')
    } else {
        removeGrids();
        makeGrids(n);
    }
});

makeGrids();
