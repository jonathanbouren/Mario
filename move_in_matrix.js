//const clear = require("clear");
const RS = require('readline-sync');

const M = '👨';
const T = '🌳';
const S = '🍄';
const B = '💣';
const P = '👸';
const H = '💖';
const X = '💔';
const C = '🎉';
const hearts = [4];
const mushroomLocations = [];
const MOVE = {
  mario: [10, 0],
  princess: [0, 20],
  array: [0, 0],
  bombs: [],
  move: 'w',
  win: false,
}


const gameScreen = [
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, P],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T],
]
const lives = [H, H, H, H, H];

function printScreen() {
  console.clear();
  console.log(`===============================================================`);
  renderScreen();
  for (let row of gameScreen) {
    console.log(row.join(' '));
  }
  console.log(`===============================================================`);
  console.log(lives);
}

function mushrooms() {
  while (mushroomLocations.length < 40) {
    let n1 = Math.floor(Math.random(0) * 10)
    let n2 = Math.floor(Math.random(0) * 20)
    if (gameScreen[n1][n2] !== P && !mushroomLocations.includes([n1, n2])) {
      gameScreen[n1][n2] = S;
      mushroomLocations.push([n1, n2])
    }

  }
}

// function findTree() {
//   for (let row of gameScreen) {
//     for (let item of row) {
//       if (item === T) {
//         MOVE.tree.push([gameScreen.indexOf(row), row.indexOf(item)]);
//       }
//     }
//   }
//   return null;
// }

function bombs() {
  while (MOVE.bombs.length < 10) {
    let n1 = Math.floor(Math.random(0) * 10)
    let n2 = Math.floor(Math.random(0) * 20)
    if (gameScreen[n1][n2] !== P && gameScreen[n1][n2] !== S && !MOVE.bombs.includes([n1, n2])) {
      gameScreen[n1][n2] = B;
      MOVE.bombs.push([n1, n2])
    }

  }
}

const prompt = (text) => console.log(`==> ${text}`);

function getSquare() {
  gameScreen[MOVE.mario[0]][MOVE.mario[1]] = T;
  if (MOVE.move === 'd') {
    if (MOVE.mario[1] === 20) {
      MOVE.mario[1] = 0;
    } else {
      MOVE.mario[1]++;
    }
  } else if (MOVE.move === 'w') {
    if (MOVE.mario[0] === 0) {
      MOVE.mario[0] = 10;
    } else {
      MOVE.mario[0]--;
    }
  } else if (MOVE.move === 'a') {
    if (MOVE.mario[1] === 0) {
      MOVE.mario[1] = 20;
    } else {
      MOVE.mario[1]--;
    }
  } else if (MOVE.move === 's') {
    if (MOVE.mario[0] === 10) {
      MOVE.mario[0] = 0;
    } else {
      MOVE.mario[0]++;
    }
  }
}


function moveBombs() {

  for (let bomb in MOVE.bombs) {
    let bombMove = ['a', 'w', 's', 'd'][Math.round(Math.random(0) * 4)]
    gameScreen[MOVE.bombs[bomb][0]][MOVE.bombs[bomb][1]] = [T, S, T, T, S, T, T, S][Math.round(Math.random(0) * 7)];
    if (bombMove === 'd') {
      if (MOVE.bombs[bomb][1] === 20) {
        MOVE.bombs[bomb][1] = 0;
      } else {
        MOVE.bombs[bomb][1]++;
      }
    } else if (bombMove === 'w') {
      if (MOVE.bombs[bomb][0] === 0) {
        MOVE.bombs[bomb][0] = 10;
      } else {
        MOVE.bombs[bomb][0]--;
      }
    } else if (bombMove === 'a') {
      if (MOVE.bombs[bomb][1] === 0) {
        MOVE.bombs[bomb][1] = 20;
      } else {
        MOVE.bombs[bomb][1]--;
      }
    } else if (bombMove === 's') {
      if (MOVE.bombs[bomb][0] === 10) {
        MOVE.bombs[bomb][0] = 0;
      } else {
        MOVE.bombs[bomb][0]++;
      }
    }
    gameScreen[MOVE.bombs[bomb][0]][MOVE.bombs[bomb][1]] = B;
  }
}


function renderScreen() {

  if (gameScreen[MOVE.mario[0]][MOVE.mario[1]] === S) {
    lives[hearts[0]] = X;
    hearts[0]--;
  }
  gameScreen[MOVE.princess[0]][MOVE.princess[1]] = P;
  for (let row of gameScreen) {
    for (let item of row) {
      if (![S, B, P].includes(item)) {
        item = T;
      }
    }
  }
  gameScreen[MOVE.mario[0]][MOVE.mario[1]] = M;
}

function winningMove() {
  if (MOVE.mario[0] === MOVE.princess[0] && MOVE.mario[1] === MOVE.princess[1]) {
    MOVE.win = true;
  }
}


function moveMario() {
  verifyMove();
  getSquare();
}

function verifyMove() {
  MOVE.move = RS.question(`==> Enter a move using [W, A, S, D]`).toLowerCase();

  while (!['w', 'a', 's', 'd'].includes(MOVE.move)) {
    console.clear();
    printScreen()
    prompt(`I can't go there! `);
    MOVE.move = RS.question(`==> Enter a move using [W, A, S, D]`).toLowerCase();
  }
}
function endGame() {
  if (!MOVE.win && !lives.includes(H)) {
    let display = [X];
    for (let i = 0; i < 5; i++) {
      console.log(display.join(''))
      display.push(X)
    }
    console.log("YOU DIDN'T RESCUE THE PRINCESS.")
    for (let i = 0; i < 5; i++) {
      display.pop();
      console.log(display.join(''))
    }

  } else if (MOVE.win) {
    let display = [C];
    for (let i = 0; i < 5; i++) {
      console.log(display.join(''))
      display.push(C)
    }
    console.log("YOU RESCUED THE PRINCESS!!!", M, H, P)
    for (let i = 0; i < 5; i++) {
      display.pop();
      console.log(display.join(''))
    }
  }
}
mushrooms();
bombs();
while (lives.includes(H) && !MOVE.win) {
  printScreen();
  // findTree();
  moveMario();
  printScreen();
  moveBombs();
  //console.log(MOVE.mario)
  winningMove();
  endGame();
}




