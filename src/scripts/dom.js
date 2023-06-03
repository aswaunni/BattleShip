import { p1, p2, initGame } from "./game"
import { Player } from "./playerFactory"
import { aiPlay, setHitPos } from "./aiBot"

export function renderButtons() {
    const reset = document.querySelector('.reset-btn')
    reset.addEventListener('click', resetBoards)

    const okBtn = document.querySelector('.ok-btn')
    okBtn.addEventListener('click', closeResultScreen)
}

function closeResultScreen() {
    const resultScreen = document.querySelector('.result-screen')
    resultScreen.classList.add('disable')
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

export async function renderAttackOnp1(x, y, p1, p2) {
    let attack = p1.attack(x, y)
    let e = document.querySelector(`.p1-${x}-${y}`)

    if (!attack)
        aiPlay(p1, p2, true)

    if (attack === 'miss') {
        e.classList.add('miss')
        e.textContent = '-'
        setHitPos(false)
        p1.setTurn(p2)
    }
    
    if (attack === 'hit') {
        setHitPos(true, true, x, y)
        e.classList.add('hit')
        e.textContent = 'X'
        p1.board.board[x][y].ship.domTargets.push(e)

        let isSunk = false
        if (p1.board.board[x][y].ship.isSunk()) {
            p1.board.board[x][y].ship.domTargets.forEach((t) => {
                t.classList.add('sunk')
            })
            isSunk = true
        }

        if (p1.board.areAllSunk()) {
            return renderWin(p2)
        }

        await delay(1000);
        return aiPlay(p1, p2, false, isSunk)
    }
}

async function renderAttackOnp2(e, x, y, p1, p2) {
    let attack = p2.attack(x, y)
    if (!attack)
        return

    if (attack === 'miss') {
        e.classList.add('miss')
        e.textContent = '-'
        p2.setTurn(p1)
        await delay(1000);
        aiPlay(p1, p2, false)
    }

    if (attack === 'hit') {
        e.classList.add('hit')
        e.textContent = 'X'
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

export function renderWin(player) {
    const result = document.querySelector('.result')
    result.textContent = player.name + ' won!!!'

    const resultScreen = document.querySelector('.result-screen')
    resultScreen.classList.remove('disable')

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
