import { TURN, GAME_STATUS, CELL_VALUE } from './constants.js'

export function checkGameStatus(cellValues) {
  if (!Array.from(cellValues) || cellValues.length !== 9) return

  const positionCellList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ]

  const index = positionCellList.findIndex((positionCell) => {
    const first = cellValues[positionCell[0]]
    const second = cellValues[positionCell[1]]
    const third = cellValues[positionCell[2]]

    return first !== '' && first === second && second === third
  })

  if (index >= 0) {
    const checkTurn =
      cellValues[positionCellList[index][0]] === CELL_VALUE.CROSS
        ? GAME_STATUS.X_WIN
        : GAME_STATUS.O_WIN

    return {
      status: checkTurn,
      windowPositions: positionCellList[index],
    }
  }

  const isEnded = cellValues.every((cell) => cell !== '')
  if (isEnded)
    return {
      status: GAME_STATUS.ENDED,
      windowPositions: [],
    }

  return {
    status: GAME_STATUS.PLAYING,
    windowPositions: [],
  }
}
