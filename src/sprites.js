/* prettier-ignore */
export const sprites = {
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

export function rotateLeft (sprite) {
  return sprite[0].map((col, c) =>
    sprite.map((row, r) => sprite[r][row.length - c - 1])
  )
}

export function rotateRight (sprite) {
  return sprite[0].map((col, c) =>
    sprite.map((row, r) => sprite[sprite.length - r - 1][c])
  )
}

export function mergeIntoStack (tetromino, stack) {
  const { sprite, bottom, left } = tetromino
  const top = bottom - sprite.length + 1
  const right = left + sprite[0].length - 1
  return stack.map(
    (row, r) =>
      r < top || r > bottom
        ? row
        : row.map((stackShape, c) => {
          if (c < left || c > right) {
            return stackShape
          }
          const spriteShape = sprite[r - top][c - left]
          return spriteShape === ' ' ? stackShape : spriteShape
        })
  )
}

export function wouldCollide (tetromino, stack) {
  const { sprite, bottom, left } = tetromino
  const top = bottom - sprite.length + 1
  const right = left + sprite[0].length - 1
  return (
    left < 0 ||
    bottom >= stack.length ||
    right >= stack[0].length ||
    sprite.some(
      (row, r) =>
        r + top >= 0 &&
        row.some(
          (spriteShape, c) =>
            spriteShape !== ' ' && stack[r + top][c + left] !== ' '
        )
    )
  )
}

export function dropLastLines (stack, nb) {
  return [
    ...Array(nb).fill(Array(stack[0].length).fill(' ')),
    ...stack.slice(0, stack.length - nb)
  ]
}
