import { GameBoard } from "./gameboardFactory"
import { shipTypes } from "./shipFactory"

export class Player {
    constructor(name) {
        this.name = name
        this.board = new GameBoard()
        this.turn = false
    }

    setTurn(enemy) {
        this.turn = true
        enemy.turn = false
    }

    attack(x, y) {
        return this.board.receiveAttack(x, y)
    }

    randomPos() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
    }

    randomShip(shipType) {
        let [x, y] = this.randomPos()
        let dir = Math.round(Math.random())

        dir = (dir === 0 ? 'h' : 'v')

        return this.board.placeShip(x, y, shipType, dir)
    }

    randomFleet() {
        // 2 ships of each type
        for (let i = 0; i < 2; i++) {
            while (!this.randomShip(shipTypes.type1)) {}
            while (!this.randomShip(shipTypes.type2)) {}
            while (!this.randomShip(shipTypes.type3)) {}
            while (!this.randomShip(shipTypes.type4)) {}
        }
    }

    checkIfAnyHitNearby(pos1, pos2) {
        return this.board.checkIfAnyHitNearby(pos1, pos2)
    }
}