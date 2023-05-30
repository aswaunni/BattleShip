import { GameBoard } from "../scripts/gameboardFactory"
import { shipTypes } from "../scripts/shipFactory"

describe('gameboard functions', () => {
    let gameboard

    beforeEach(() => {
        gameboard = new GameBoard()
    })

    test('place ship h', () => {
        gameboard.placeShip(5, 5, shipTypes.type4, 'h')
        expect(gameboard.board[5][5].ship.length).toBe(4)
        expect(gameboard.board[5][6].shipPos).toBe(1)
    })

    test('place ship v', () => {
        gameboard.placeShip(5, 5, shipTypes.type4, 'v')
        expect(gameboard.board[5][5].ship.length).toBe(4)
        expect(gameboard.board[6][5].shipPos).toBe(1)
        expect(gameboard.areAllSunk()).toBe(false)
    })

    test('receive attack no ship', () => {
        gameboard.receiveAttack(5, 5)
        expect(gameboard.board[5][5]).toBe('miss')
    })

    test('receive attack with ship', () => {
        gameboard.placeShip(5, 5, shipTypes.type1, 'h')
        gameboard.receiveAttack(5, 5)
        expect(gameboard.board[5][5].ship.tiles[0]).toBe('hit')
        expect(gameboard.board[5][5].ship.isSunk()).toBe(true)
        expect(gameboard.areAllSunk()).toBe(true)
    })

    test('receive attack already attacked', () => {
        gameboard.receiveAttack(5, 5)
        expect(gameboard.receiveAttack(5, 5)).toBe(false)
    })
})