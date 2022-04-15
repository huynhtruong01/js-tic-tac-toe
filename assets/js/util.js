import { CELL_VALUE, GAME_STATUS } from './constants.js'

export function checkGameStatus(cellValues) {
  if (!Array.isArray(cellValues) || cellValues.length === 0) throw new Error('Value is not invalid')

  const checkStatusList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ]

  // win
  const windowIndex = checkStatusList.findIndex((set) => {
    const first = cellValues[set[0]]
    const second = cellValues[set[1]]
    const third = cellValues[set[2]]

    return first !== '' && first === second && second === third
  })

  if (windowIndex >= 0) {
    const windowValueIndex = checkStatusList[windowIndex][0]
    const windowValue = cellValues[windowValueIndex]

    return {
      status:
        windowValue.toLowerCase() === CELL_VALUE.CROSS.toLowerCase()
          ? GAME_STATUS.X_WIN
          : GAME_STATUS.O_WIN,
      windowPositions: checkStatusList[windowIndex],
    }
  }

  // end
  if (cellValues.every((cell) => cell !== ''))
    return {
      status: GAME_STATUS.ENDED,
      windowPositions: [],
    }

  // playing
  return {
    status: GAME_STATUS.PLAYING,
    windowPositions: [],
  }
}
