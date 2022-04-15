import { CELL_VALUE, GAME_STATUS, TURN } from './constants.js'
import {
  getCellElementAtIdx,
  getCellElementList,
  getCurrentTurnElement,
  getGameStatusElement,
  getReplayGameButtonElement,
} from './selectors.js'
import { checkGameStatus } from './util.js'

let currentTurn = TURN.CROSS
let isGameEnded = false
let cellValues = new Array(9).fill('')

function toggleTurn() {
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS

  const currentTurnElement = getCurrentTurnElement()
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
    currentTurnElement.classList.add(currentTurn)
  }
}

function changeCellValue(index) {
  const checkTurn = currentTurn === TURN.CROSS ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS
  cellValues[index] = checkTurn
}

// update game status
function updateGameStatus(gameStatus) {
  if (!gameStatus) return

  const gameStatusElement = getGameStatusElement()
  gameStatusElement.textContent = gameStatus
}

// show replay button
function showButtonReplaying() {
  const buttonElementReplayGame = getReplayGameButtonElement()

  buttonElementReplayGame.classList.add('show')
}

// hide replay button
function hideReplayButton() {
  const buttonElementReplayGame = getReplayGameButtonElement()

  buttonElementReplayGame.classList.remove('show')
}

// highlight cell value when win
function highlightCellValues(windowPositions) {
  if (!Array.isArray(windowPositions) || windowPositions.length !== 3) {
    throw new Error('Invalid win position')
  }

  for (const index of windowPositions) {
    const liElementIndex = getCellElementAtIdx(index)
    liElementIndex.classList.add(CELL_VALUE.WIN)
  }
}

function handleCellElementClick(cell, index) {
  // check click
  const isClicked = cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS)
  if (isClicked || isGameEnded) return

  // add class current turn
  cell.classList.remove(TURN.CIRCLE, TURN.CROSS)
  cell.classList.add(currentTurn)

  // toggle turn
  toggleTurn()

  // update cell value
  changeCellValue(index)

  // check status
  const game = checkGameStatus(cellValues)

  switch (game.status) {
    case GAME_STATUS.ENDED: {
      // update game status
      updateGameStatus(game.status)

      // show button replay game
      showButtonReplaying()

      // check isEndedGame
      isGameEnded = true

      break
    }
    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN: {
      // update game status
      updateGameStatus(game.status)

      // show button replay game
      showButtonReplaying()

      // highlight cell value when win
      highlightCellValues(game.windowPositions)

      // check isEndGame
      isGameEnded = true
      break
    }

    default: {
    }
  }
}

function initCellElementList() {
  const cellElementList = getCellElementList()

  cellElementList.forEach((cellElement, index) => {
    cellElement.addEventListener('click', () => handleCellElementClick(cellElement, index))
  })
}

function handleResetGame() {
  const cellElementList = getCellElementList()
  const turnElement = getCurrentTurnElement()
  const buttonReplayGameElement = getReplayGameButtonElement()

  // remove class cell item
  for (const cell of cellElementList) {
    cell.className = ''
  }
  // reset game status
  updateGameStatus(GAME_STATUS.PLAYING)
  // reset turn
  turnElement.classList.remove(TURN.CROSS, TURN.CIRCLE)
  turnElement.classList.add(TURN.CROSS)
  // hide button replay game
  hideReplayButton()

  // reset current turn
  currentTurn = TURN.CROSS
  // set ended game false
  isGameEnded = false
  // reset cell values
  // cellValues = new Array(9).fill('')
  cellValues = cellValues.map((x) => '')
}

function initButtonResetGame() {
  const buttonElementReplayGame = getReplayGameButtonElement()
  if (buttonElementReplayGame) {
    buttonElementReplayGame.addEventListener('click', handleResetGame)
  }
}

;(() => {
  initCellElementList()
  initButtonResetGame()
})()
