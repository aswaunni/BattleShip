import { Ship, shipTypes } from "../scripts/shipFactory";

describe('ship functions', () => {
    let type1
    let type2
    let type3
    let type4

    beforeEach(() => {
        type1 = new Ship(shipTypes.type1)
        type2 = new Ship(shipTypes.type2)
        type3 = new Ship(shipTypes.type3)
        type4 = new Ship(shipTypes.type4)
    })

    test('Accept Hit', () => {
        type4.hit(2)
        expect(type4.tiles[2]).toBe('hit')
    })

    test('Accept multiple hits', () => {
        type3.hit(0)
        type3.hit(1)
        expect(type3.tiles[0]).toBe('hit')
        expect(type3.tiles[1]).toBe('hit')
    })

    test('Not sunk', () => {
        type2.hit(0)
        expect(type2.isSunk()).toBe(false)
    })

    test('Sunk', () => {
        type1.hit(0)
        expect(type1.isSunk()).toBe(true)
    })

    test('is sunk only', () => {
        expect(type4.isSunk()).toBe(false)
    })
})