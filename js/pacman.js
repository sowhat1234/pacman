'use strict';
const PACMAN = '😷';



var gPacman;


function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);
    // debugger
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j]
    if (nextCellContent === POWER_FOOD) {
        if(gPacman.isSuper) return;
        updateScore(1);
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false
            reviveGhosts()
        }, 5000);
    }
    // return if cannot move
    if(nextCellContent === CHERY) updateScore(10);
    if (nextCellContent === WALL) return;
    
    // hitting a ghost?  call gameOver
    if (nextCellContent === GHOST) {
        if(!gPacman.isSuper){
            gameOver();
            return;
        }
        removeGhost(nextLocation);

    }
    if (nextCellContent === FOOD) {
        gFoodCounter++
        updateScore(1);
        
    }
    
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
    if (checkVictory()) gameWin();
};




function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}