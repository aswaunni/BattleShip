import { Player } from "./playerFactory";
import { renderBoards, renderButtons } from "./dom";

let p1, p2; //needed p1 and p2 to be exported for button listeners

function initGame() {
  p1 = new Player('You')
  p2 = new Player('Enemy')
  p1.setTurn(p2)
  p1.randomFleet()
  p2.randomFleet()

  renderButtons()
  renderBoards(p1, p2)
}

export { initGame, p1, p2 };