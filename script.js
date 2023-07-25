const containerSketch = document.getElementById('container-sketch')
const slider = document.getElementById('slider');
// const buttonSize = document.getElementById('button-size');
const buttonToggle = document.getElementById('button-toggle');
const buttonErase = document.getElementById('button-erase');

function makeGrids(n = 22) {
    for (let i = 0; i < (n * n); i++) {
        const grid = document.createElement('div');
        grid.setAttribute('class', 'grid');
        grid.style.backgroundColor = 'rgb(192, 192, 192)';
        grid.style.width = `${(1 / n) * 100}%`;
        containerSketch.appendChild(grid);
    }
}

function removeGrids() {
    while (containerSketch.firstChild) {
        containerSketch.removeChild(containerSketch.firstChild);
    }
}

function eraseAll() {
    const grids = document.getElementsByClassName('grid');
    console.log(grids);

    for(grid of grids) {
        grid.style.backgroundColor = 'rgb(192,192,192)'
    }
}

function erase(e) {
    e.target.style.backgroundColor = 'rgb(192,192,192)';
}

function black(e) {
    e.target.style.backgroundColor = 'rgb(0, 0, 0)';
}

function randomizeRgb() {
    return Math.floor(Math.random() * 255);
}

function fire(e) {
    e.target.style.backgroundColor = `rgb(255, ${randomizeRgb()}, 0)`;
}

function water(e) {
    e.target.style.backgroundColor = `rgb(0, ${randomizeRgb()}, 255)`;
}

function grass(e) {
    e.target.style.backgroundColor = `rgb(${randomizeRgb()}, 255, 0)`;
}

function shade(e) {
    // console.log(window.getComputedStyle(e.target).filter);
    // let prevBrightness = window.getComputedStyle(e.target).filter; // get string of css filter brightness
    // let brightness = prevBrightness.slice(prevBrightness.indexOf('(') + 1, -1); // slice number from string
    // let newBrightness = (brightness * 100) - 10; 
    // console.log(newBrightness);
    // e.target.style.filter = `brightness(${newBrightness}%)`;

    console.log(e.target.style.backgroundColor);
    let rgb = e.target.style.backgroundColor;
    rgb = rgb.slice(rgb.indexOf('(') + 1, -1);
    rgb = rgb.split(', ');

    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    e.target.style.backgroundColor = `rgb(${r - 30}, ${g - 30}, ${b -30})`
}

function toggleMode(e) {
    if (buttonToggle.textContent === "Shade") {
        containerSketch.removeEventListener('mouseover', shade);
        buttonToggle.textContent = "Black";
        containerSketch.addEventListener('mouseover', black);
        return;
    } else if (buttonToggle.textContent === "Black") {
        containerSketch.removeEventListener('mouseover', black);
        buttonToggle.textContent = "Erase";
        containerSketch.addEventListener('mouseover', erase);
        return;
    } else if (buttonToggle.textContent === "Erase") {
        containerSketch.removeEventListener('mouseover', erase);
        buttonToggle.textContent = "Fire";
        containerSketch.addEventListener('mouseover', fire);
        return;
    } else if (buttonToggle.textContent === "Fire") {
        containerSketch.removeEventListener('mouseover', fire);
        buttonToggle.textContent = "Water";
        containerSketch.addEventListener('mouseover', water);
        return;
    } else if (buttonToggle.textContent === "Water") {
        containerSketch.removeEventListener('mouseover', water);
        buttonToggle.textContent = "Grass";
        containerSketch.addEventListener('mouseover', grass);
        return;
    } else if (buttonToggle.textContent === "Grass") {
        containerSketch.removeEventListener('mouseover', grass);
        buttonToggle.textContent = "Shade";
        containerSketch.addEventListener('mouseover', shade);
        return;
    }
}

// slider to change pad size
slider.addEventListener('input', () => {
    removeGrids();
    makeGrids(slider.value);
});

// button to change pad size
// buttonSize.addEventListener('click', () => {
//     let n = prompt('Enter grid size', '1-100');
//     if (n > 100 || n <= 0) {
//         alert('Kindly enter 1-100')
//     } else {
//         removeGrids();
//         makeGrids(n);
//     }
// });

buttonToggle.addEventListener('click', toggleMode);
buttonErase.addEventListener('click', eraseAll);
containerSketch.addEventListener('mouseover', shade);

makeGrids();
