/* prettier-ignore */
export const overlays = {
  I: [
    ['I', 'I', 'I', 'I']
  ],
  J: [
    ['J', 'J', 'J'],
    [' ', ' ', 'J']
  ],
  L: [
    ['L', 'L', 'L'],
    ['L', ' ', ' ']
  ],
  O: [
    ['O', 'O'],
    ['O', 'O']
  ],
  S: [
    [' ', 'S', 'S'],
    ['S', 'S', ' ']
  ],
  T: [
    ['T', 'T', 'T'],
    [' ', 'T', ' ']
  ],
  Z: [
    ['Z', 'Z', ' '],
    [' ', 'Z', 'Z']
  ]
}

export function rotateLeft (overlay) {
  return overlay[0].map((col, c) =>
    overlay.map((row, r) => overlay[r][row.length - c - 1])
  )
}

export function rotateRight (overlay) {
  return overlay[0].map((col, c) =>
    overlay.map((row, r) => overlay[overlay.length - r - 1][c])
  )
}

export function mergeIntoStack (tetromino, stack) {
  const { overlay, bottom, left } = tetromino
  const top = bottom - overlay.length + 1
  const right = left + overlay[0].length - 1
  return stack.map(
    (row, r) =>
      r < top || r > bottom
        ? row
        : row.map((stackShape, c) => {
          if (c < left || c > right) {
            return stackShape
          }
          const overlayShape = overlay[r - top][c - left]
          return overlayShape === ' ' ? stackShape : overlayShape
        })
  )
}

export function wouldCollide (tetromino, stack) {
  const { overlay, bottom, left } = tetromino
  const top = bottom - overlay.length + 1
  const right = left + overlay[0].length - 1
  return (
    left < 0 ||
    bottom >= stack.length ||
    right >= stack[0].length ||
    overlay.some(
      (row, r) =>
        r + top >= 0 &&
        row.some(
          (overlayShape, c) =>
            overlayShape !== ' ' && stack[r + top][c + left] !== ' '
        )
    )
  )
}
