const containerSketch = document.getElementById('container-sketch')
const slider = document.getElementById('slider');
// const buttonSize = document.getElementById('button-size');
const buttonToggle = document.getElementById('button-toggle');
const buttonErase = document.getElementById('button-erase');

function makeGrids(n = 32) {
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
    console.log(e.target.style.backgroundColor);
    e.target.style.backgroundColor = 'rgb(192,192,192)';
}

function black(e) {
    console.log(e.target.style.backgroundColor);
    e.target.style.backgroundColor = 'rgb(0, 0, 0)';
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
    if (buttonToggle.textContent === "Black") {
        containerSketch.removeEventListener('mouseover', black);
        buttonToggle.textContent = "Erase";
        console.log('erase mode');
        containerSketch.addEventListener('mouseover', erase);
        return;
    } else if (buttonToggle.textContent === "Erase") {
        containerSketch.removeEventListener('mouseover', erase);
        buttonToggle.textContent = "Shade";
        console.log('shade mode');
        containerSketch.addEventListener('mouseover', shade);
        return;
    } else if (buttonToggle.textContent === "Shade") {
        containerSketch.removeEventListener('mouseover', shade);
        buttonToggle.textContent = "Black";
        console.log('black mode');
        containerSketch.addEventListener('mouseover', black);
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

// containerSketch.addEventListener('mouseover', black);
buttonToggle.addEventListener('click', toggleMode);
buttonErase.addEventListener('click', eraseAll);
containerSketch.addEventListener('mouseover', shade);

makeGrids();
