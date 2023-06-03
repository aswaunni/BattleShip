import { renderAttackOnp1 } from "./dom"

let lastHitPos = []
let firstHitPos = []
let secondHitPos = []
let wasHit = false
let surroundingPos = []
let attackDirection = ""
let status = false

export function setHitPos(value, stat, pos1, pos2) {
    wasHit = value
    if (stat !== undefined) status = stat;
    
    if (pos1 !== undefined) {
        lastHitPos = [pos1, pos2];

        if (firstHitPos.length == 0)
            firstHitPos = [pos1, pos2];
        else if (firstHitPos.length !== 0 && secondHitPos.length == 0)
            secondHitPos = [pos1, pos2];
    }
}

export function aiPlay(p1, p2, repeat, isSunk) {

    if (isSunk) {
        lastHitPos = []
        firstHitPos = []
        secondHitPos = []
        wasHit = false
        surroundingPos = []
        attackDirection = ""
        status = false
    }

    if (!wasHit && !status) {
        let [x, y] = p2.randomPos()
        while (p1.checkIfAnyHitNearby(x, y)) 
            [x, y] = p2.randomPos()

        return renderAttackOnp1(x, y, p1, p2)
    } else if (secondHitPos.length !== 0 && wasHit && !repeat) {
        let newPos;
        if (firstHitPos[0] == secondHitPos[0] - 1) newPos = attackTowards("down");
        if (firstHitPos[0] == secondHitPos[0] + 1) newPos = attackTowards("up");
        if (firstHitPos[1] == secondHitPos[1] - 1) newPos = attackTowards("right");
        if (firstHitPos[1] == secondHitPos[1] + 1) newPos = attackTowards("left");
        if (newPos[0] >= 0 && newPos[0] <= 9 && newPos[1] >= 0 && newPos[1] <= 9)
          return renderAttackOnp1(newPos[0], newPos[1], p1, p2);
      } else if (secondHitPos.length !== 0 && status && !wasHit) {
        lastHitPos = firstHitPos;
        secondHitPos = [];
        let newPos;
        if (attackDirection === "up") newPos = attackTowards("down");
        if (attackDirection === "down") newPos = attackTowards("up");
        if (attackDirection === "right") newPos = attackTowards("left");
        if (attackDirection === "left") newPos = attackTowards("right");
        if (newPos[0] >= 0 && newPos[0] <= 9 && newPos[1] >= 0 && newPos[1] <= 9)
          return renderAttackOnp1(newPos[0], newPos[1], p1, p2);
      } else if (status) {
        if (surroundingPos.length == 0)
          registerSurroundingPos(lastHitPos[0], lastHitPos[1]);
        let newPos = surroundingPos.pop();
        return renderAttackOnp1(newPos[0], newPos[1], p1, p2);
      }
}

function registerSurroundingPos(pos1, pos2) {
    surroundingPos = [];
    if (pos2 !== 0) surroundingPos.push([pos1, pos2 - 1]);
    if (pos2 !== 9) surroundingPos.push([pos1, pos2 + 1]);
    if (pos1 !== 0) surroundingPos.push([pos1 - 1, pos2]);
    if (pos1 !== 9) surroundingPos.push([pos1 + 1, pos2]);
    return surroundingPos;
  }

  function attackTowards(dir) {
    if (dir === "left") {
      attackDirection = "left";
      return [lastHitPos[0], lastHitPos[1] - 1];
    }
    if (dir === "right") {
      attackDirection = "right";
      return [lastHitPos[0], lastHitPos[1] + 1];
    }
    if (dir === "down") {
      attackDirection = "down";
      return [lastHitPos[0] + 1, lastHitPos[1]];
    }
    if (dir === "up") {
      attackDirection = "up";
      return [lastHitPos[0] - 1, lastHitPos[1]];
    }
  }
  