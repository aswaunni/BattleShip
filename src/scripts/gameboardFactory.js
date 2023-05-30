
import { Ship, shipTypes } from "./shipFactory"

export class GameBoard {
    constructor() {
        this.board = []
        for (let i = 0; i < 10; i++) {
            this.board[i] = []
            for (let j = 0; j < 10; j++)
                this.board[i].push(false)
		}
    }

    receiveAttack(x, y) {
        if (this.board[x][y] === 'miss')
            return false

        if (!this.board[x][y] || this.board[x][y] === 'res') {
            this.board[x].splice(y, 1, 'miss')
            return 'miss'
        }

        this.board[x][y].ship.hit(this.board[x][y].i)
        return 'hit'
    }

    placeShip(x, y, shipType, dir) {
        let ship = new Ship(shipType)
        if (dir === 'h') {
            if (y+shipType.length >= 10) return false

            for (let i = 0; i < shipType.length; i++)
                if (this.board[x][y+i]) return false
           
            for (let i = 0; i < shipType.length; i++) {
                this.board[x].splice(y+i, 1, {ship, i})
                this.reserveAround(x, y+i)
            }

        } else if (dir === 'v') {
            if (x+shipType.length >= 10) return false

            for (let i = 0; i < shipType.length; i++)
                if (this.board[x+i][y]) return false
           
            for (let i = 0; i < shipType.length; i++) {
                this.board[x+i].splice(y, 1, {ship, i})
                this.reserveAround(x+i, y)
            }
        }
        return true
    }

    reserveAround(x, y) {
        let dir = [-1, -1, 0, 1, 1, 0, -1, 1, -1]
        for (let i = 0; i < 8; i++) {
            let nx = x+dir[i]
            let ny = y+dir[i+1]

            if (nx >= 0 && ny >= 0 && nx < 10 && ny < 10 && this.board[nx][ny] === false)
                this.board[nx].splice(ny, 1, 'res')
        }
    }

    areAllSunk() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (!this.board[i][j] || this.board[i][j] === 'miss' || this.board[i][j] === 'res')
                    continue
                console.log(this.board[i][j].ship)
                if (!this.board[i][j].ship.isSunk())   
                    return false            
            }
        }
        return true
    }
}