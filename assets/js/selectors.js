export function getCellElementList() {
  return document.querySelectorAll('#cellList > li')
}

export function getCurrentTurnElement() {
  return document.getElementById('currentTurn')
}

export function getGameStatusElement() {
  return document.getElementById('gameStatus')
}

export function getCellListElement() {
  return document.getElementById('cellList')
}

export function getButtonReplayElement() {
  return document.getElementById('replayGame')
}

export function getCellElementIndex(index) {
  return document.querySelector(`#cellList > li:nth-child(${index + 1})`)
}
