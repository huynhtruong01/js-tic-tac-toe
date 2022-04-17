import { CELL_VALUE, GAME_STATUS, TURN } from './constants.js'
import {
  getButtonReplayElement,
  getCellElementIndex,
  getCellElementList,
  getCellListElement,
  getCurrentTurnElement,
  getGameStatusElement,
} from './selectors.js'
import { checkGameStatus } from './util.js'

let cellValues = new Array(9).fill('')
let isEndedGame = false

// change game status
function changeGameStatus(status) {
  const gameStatusElement = getGameStatusElement()
  if (!gameStatusElement) return
  gameStatusElement.textContent = status
}

// show button replay
function showButtonReplay() {
  const btnReplayElement = getButtonReplayElement()
  if (!btnReplayElement) return
  btnReplayElement.classList.add('show')
}

// hide button replay
function hideButtonReplay() {
  const btnReplayElement = getButtonReplayElement()
  if (!btnReplayElement) return
  btnReplayElement.classList.remove('show')
}

// highlight cell when win
function highlightCellValue(windowPositions) {
  for (const position of windowPositions) {
    const cellIndexElement = getCellElementIndex(position)
    // console.log(cellIndexElement)
    if (!cellIndexElement) return

    cellIndexElement.classList.add(CELL_VALUE.WIN)
  }
}

function toggleCurrentTurn() {
  const currentTurn = getCurrentTurnElement()
  if (!currentTurn) return

  const turn = currentTurn.className === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS

  currentTurn.classList.remove(TURN.CIRCLE, TURN.CROSS)
  currentTurn.classList.add(turn)
}

function handleCellElementClick(cellElement, index) {
  if (!cellElement || index < 0) return

  // check cell element isClicked
  const isClicked =
    cellElement.classList.contains(TURN.CIRCLE) || cellElement.classList.contains(TURN.CROSS)
      ? false
      : true
  if (!isClicked || isEndedGame) return
  console.log('click')

  // check turn to add class cross or circle
  const currentTurn = getCurrentTurnElement()
  if (!currentTurn) return
  const cellTurnClass = currentTurn.className === TURN.CROSS ? TURN.CROSS : TURN.CIRCLE
  cellElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
  cellElement.classList.add(cellTurnClass)

  // change cell value when clicked
  cellValues[index] = currentTurn.className === TURN.CROSS ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE

  // toggle current turn
  toggleCurrentTurn()

  // check game status
  const game = checkGameStatus(cellValues)

  switch (game.status) {
    case GAME_STATUS.ENDED: {
      // isEndedGame = true
      isEndedGame = true
      // change status game
      changeGameStatus(game.status)
      // show button replay game
      showButtonReplay()
      break
    }

    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN: {
      // isEnded
      isEndedGame = true
      // change status game
      changeGameStatus(game.status)
      // show button replay game
      showButtonReplay()
      // highlight cell value
      highlightCellValue(game.windowPositions)
      break
    }

    default: {
      changeGameStatus(game.status)
    }
  }
}

function initHandleClickGame() {
  const cellElementList = getCellElementList()
  const cellListElement = getCellListElement()
  if (cellElementList.length === 0) return
  if (!cellListElement) return

  cellElementList.forEach((cell, index) => {
    cell.dataset.idx = index
  })

  cellListElement.addEventListener('click', (e) => {
    const index = Number.parseInt(e.target.dataset.idx)
    handleCellElementClick(e.target, index)
  })

  // cellElementList.forEach((cellElement, index) => {
  //   cellElement.addEventListener('click', () => handleCellElementClick(cellElement, index))
  // })
}

function handleReplayGame() {
  // reset game status
  const gameStatusElement = getGameStatusElement()
  if (!gameStatusElement) return
  changeGameStatus('LOADING')
  // reset turn
  const turnElement = getCurrentTurnElement()
  if (!turnElement) return
  turnElement.className = ''
  turnElement.classList.add(TURN.CROSS)
  // reset isEnded
  isEndedGame = false
  // reset cellValues
  cellValues = new Array(9).fill('')
  // hide button replay
  hideButtonReplay()
  // remove class cell value
  const cellElementList = getCellElementList()
  if (cellElementList.length === 0) return
  for (const cell of cellElementList) {
    cell.className = ''
  }
}

function initReplayGame() {
  const btnReplay = getButtonReplayElement()
  if (!btnReplay) return

  btnReplay.addEventListener('click', handleReplayGame)
}

;(() => {
  initHandleClickGame()
  initReplayGame()
})()
