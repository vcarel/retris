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
