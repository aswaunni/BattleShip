export const shipTypes = {
    type1 : {
        length: 1
    },
    type2 : {
        length: 2
    },
    type3 : {
        length: 3
    },
    type4 : {
        length: 4
    }
}

export class Ship {
    constructor(shipType) {
        this.length = shipType.length
        this.tiles = [...Array(this.length).keys()]
        this.domTargets = []
    }

    hit(pos) {
        if (this.tiles[pos] === 'hit') 
            return false
        this.tiles.splice(pos, 1, 'hit')
        return 'hit'
    }

    isSunk() {
        if (this.tiles.some((tile) => tile != 'hit'))
            return false
        return true
    }

    isHit(pos) {
        return this.tiles[pos] === 'hit'
    }
}