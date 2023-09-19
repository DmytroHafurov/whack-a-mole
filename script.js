const modal = document.getElementById("myModal");
const easyButton = document.getElementById("easyButton");
const normalButton = document.getElementById("normalButton");
const hardButton = document.getElementById("hardButton");

const grid_item = [...document.querySelectorAll(".grid-item")]
const scoreEl = document.querySelector(".count")
let score = 0;
let fail = 0;
let time;

window.addEventListener("load", () => {
    modal.style.display = "block";
}); 
  
easyButton.addEventListener("click", () => {
    time = 3000;
    alert('Вы выбрали уровень сложности: Easy');
    modal.style.display = 'none';
    run()
});
  
normalButton.addEventListener("click", () => {
    time = 1500;
    alert('Вы выбрали уровень сложности: Normal');
    modal.style.display = 'none';
    run()
});
  
hardButton.addEventListener("click", () => {
    time = 500;
    alert('Вы выбрали уровень сложности: Hard');
    modal.style.display = 'none';
    run()
});

function checkWin() {
    if (score >= 50) {
        alert("Вы выиграли!");
        window.location.reload()
    }
}

function checkLose() {
    if (fail >= 50) {
        alert("Вы проиграли!");
        window.location.reload();
    }
}

const usedCells = new Set();

function getRandomUnusedCell() {
    let i;
    do {
        i = Math.floor(Math.random() * grid_item.length);
    } while (usedCells.has(i));

    usedCells.add(i);
    if (usedCells.size === grid_item.length) {
        usedCells.clear();
    }

    return i;
}


function run() {
    const i = getRandomUnusedCell();
    const box = grid_item[i];
    let timer = null;
    let clicked = false;

    const img = document.createElement("img");
    img.classList.add("mole");
    img.src = "img/mole.png";

    img.addEventListener('click', () => {
        score += 1;
        scoreEl.textContent = score;
        box.style.backgroundColor = "#aaf0c9";
        img.src = "img/skull.png";
        clicked = true;
        checkWin()
    });

    box.appendChild(img);

    timer = setTimeout(() => {
        if (!clicked) {           
            box.style.backgroundColor = "#ffcccc";
            fail++;
            checkLose();
        }
        box.removeChild(img);
        run();
    }, time);
}








