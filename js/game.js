'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '**';
const CHERY = '()';



var gTimer = 0
var gElTimer;

var addChery = false;
const TOTALFOOD = 56;
var gFoodCounter = 0;
var gInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false,
};

function init() {
    gInterval = null
    console.log('hello');
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    gInterval = setInterval(addChery, 15000);

    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    document.querySelector('.modal').style.display = 'none'
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 1 && j === 1 || i === 8 && j === 8 ||
                i === 8 && j === 1 || i === 1 && j === 8) {
                board[i][j] = POWER_FOOD;
            }
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }

    return board;
}



// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

// TODO
function gameWin() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var elWin = document.querySelector('.modal h3');
    elWin.innerText = 'You win';
    document.querySelector('.modal').style.display = 'block';

}

function addChery() {
    var emptyCells = checkEmptyCell(gBoard);
    if (emptyCells.length === 0) return
    var idx = getRandomIntInclusive(0, emptyCells.length - 1);
    var emptyCell = emptyCells[idx]
    // debugger
    gBoard[emptyCell.i][emptyCell.j] = CHERY;
    renderCell(emptyCell, CHERY)
}

function checkEmptyCell(board) {
    var res = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (currCell === EMPTY) {
                res.push({ i: i, j: j });
            }

        }
    }
    return res;
}


function playAgain() {
    gGame.score = 0
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    clearInterval(gIntervalGhosts);
    init()

}
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    document.querySelector('.modal').style.display = 'block';
}

function checkVictory() {
    return gFoodCounter === TOTALFOOD;
}

