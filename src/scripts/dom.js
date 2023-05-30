import { p1, p2, initGame } from "./game"
import { Player } from "./playerFactory"

export function renderButtons() {
    const reset = document.querySelector('.reset-btn')
    reset.addEventListener('click', resetBoards)
}

export function renderBoards(p1, p2) {
    const board1 = document.querySelector('.board1')
    const board2 = document.querySelector('.board2')
    board1.innerHTML = ''
    board2.innerHTML = ''

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            // p1
            let div1 = document.createElement('div')
            div1.classList.add('p1-cell')
            div1.classList.add(`p1-${i}-${j}`)
            if (typeof p1.board.board[i][j] === 'object')
                div1.classList.add('ship')

            board1.appendChild(div1)

            // p2
            let div2 = document.createElement('div')
            div2.classList.add('p2-cell')
            div2.classList.add(`p2-${i}-${j}`)

            div2.addEventListener('click', (e) => {
                if (!p1.turn || e.target.classList.contains('disable')) return
                renderAttackOnp2(e.target, i, j, p1, p2)
            })

            board2.appendChild(div2)
        }

    }
}

export function renderAttackOnp1(e, x, y, p1, p2) {
    let attack = p1.attack(x, y)

    if (attack === 'miss') {
        e.classList.add('miss')
        p1.setTurn(p2)
    }
    
    if (attack === 'hit') {
        e.classList.add('hit')
        p1.board.board[x][y].ship.domTargets.push(e)

        if (p1.board.board[x][y].ship.isSunk()) {
            p1.board.board[x][y].ship.domTargets.forEach((t) => {
                t.classList.add('sunk')
            })
        }

        if (p1.board.areAllSunk()) {
            renderWin(p2)
        }
    }

    return attack
}

async function renderAttackOnp2(e, x, y, p1, p2) {
    let attack = p2.attack(x, y)
    if (!attack)
        return

    if (attack === 'miss') {
        e.classList.add('miss')
        p2.setTurn(p1)
        await delay(1000);
        aiPlay(p1, p2)
    }

    if (attack === 'hit') {
        e.classList.add('hit')
        p2.board.board[x][y].ship.domTargets.push(e)

        if (p2.board.board[x][y].ship.isSunk()) {
            p2.board.board[x][y].ship.domTargets.forEach((t) => {
                t.classList.add('sunk')
            })
        }

        if (p2.board.areAllSunk()) {
            renderWin(p1)
        }
    }
}

function delay(delayInMs) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInMs);
    });
}

function aiPlay(p1, p2) {
    let [x, y] = p2.randomPos()
    let e = document.querySelector(`.p1-${x}-${y}`)
    if (renderAttackOnp1(e, x, y, p1, p2) != 'miss')
        aiPlay(p1, p2)
}

export function renderWin(player) {
    const result = document.querySelector('.result')
    result.textContent = player.name + ' won!!!'

    const p2Cell = document.querySelectorAll('.p2-cell')
    p2Cell.forEach((cell) => cell.classList.add('disable'))
}

export function resetBoards() {
    const result = document.querySelector('.result')
    result.textContent = 'You vs Enemy'

    const p2Cell = document.querySelectorAll('.p2-cell')
    p2Cell.forEach((cell) => cell.classList.remove('disable'))

    initGame()
}
