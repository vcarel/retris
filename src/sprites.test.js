import {
  sprites,
  rotateLeft,
  rotateRight,
  mergeIntoStack,
  wouldCollide
} from './sprites'

const { I, J, T } = sprites

describe('rotateLeft', () => {
  it('should rotate any matrix to the left', () => {
    expect(rotateLeft([
      ['1', '1x', '1y'],
      ['2', '2x', '2y'],
      ['3', '3x', '3y'],
      ['4', '4x', '4y']
    ])).toEqual([
      ['1y', '2y', '3y', '4y'],
      ['1x', '2x', '3x', '4x'],
      ['1', '2', '3', '4']
    ]) // prettier-ignore

    expect(rotateLeft(I)).toEqual([
      ['I'],
      ['I'],
      ['I'],
      ['I']
    ]) // prettier-ignore

    expect(rotateLeft(J)).toEqual([
      ['J', 'J'],
      ['J', ' '],
      ['J', ' ']
    ]) // prettier-ignore

    expect(rotateLeft(T)).toEqual([
      ['T', ' '],
      ['T', 'T'],
      ['T', ' ']
    ]) // prettier-ignore
  })
})

describe('rotateRight', () => {
  it('should rotate any matrix to the right', () => {
    expect(rotateRight([
      ['1z', '2z', '3z', '4z'],
      ['1y', '2y', '3y', '4y'],
      ['1x', '2x', '3x', '4x']
    ])).toEqual([
      ['1x', '1y', '1z'],
      ['2x', '2y', '2z'],
      ['3x', '3y', '3z'],
      ['4x', '4y', '4z']
    ]) // prettier-ignore

    expect(rotateRight(I)).toEqual([
      ['I'],
      ['I'],
      ['I'],
      ['I']
    ]) // prettier-ignore

    expect(rotateRight(J)).toEqual([
      [' ', 'J'],
      [' ', 'J'],
      ['J', 'J']
    ]) // prettier-ignore

    expect(rotateRight(T)).toEqual([
      [' ', 'T'],
      ['T', 'T'],
      [' ', 'T']
    ]) // prettier-ignore
  })
})

describe('mergeIntoStack', () => {
  it('should merge sprite when completly inside stack', () => {
    const tetromino = { sprite: T, bottom: 3, left: 2 }
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I']
    ]
    expect(mergeIntoStack(tetromino, stack)).toEqual([
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'T', 'T', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I']
    ])
  })

  it('should merge sprite when partially above top', () => {
    const tetromino = { sprite: T, bottom: 0, left: 2 }
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I']
    ]
    expect(mergeIntoStack(tetromino, stack)).toEqual([
      [' ', ' ', ' ', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I']
    ])
  })
})

describe('wouldCollide', () => {
  it('should return true when tetromino will crash in the stack', () => {
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I']
    ]
    expect(wouldCollide({ sprite: T, bottom: 3, left: 4 }, stack)).toBe(true)
    expect(wouldCollide({ sprite: T, bottom: 2, left: 8 }, stack)).toBe(true)
  })

  it('should return true when tetromino will crash in the bottom, left or right', () => {
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]
    expect(wouldCollide({ sprite: T, bottom: 3, left: 4 }, stack)).toBe(true)
    expect(wouldCollide({ sprite: T, bottom: 2, left: -1 }, stack)).toBe(true)
    expect(wouldCollide({ sprite: T, bottom: 2, left: 10 }, stack)).toBe(true)
  })

  it('should return false when no collision', () => {
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', ' ', ' ', 'T', 'T', 'T', 'I'],
      ['S', ' ', 'O', 'O', 'L', ' ', 'J', 'J', 'Z', 'T', ' ', 'I']
    ]
    expect(wouldCollide({ sprite: T, bottom: 1, left: 0 }, stack)).toBe(false)
    expect(wouldCollide({ sprite: T, bottom: 1, left: 9 }, stack)).toBe(false)
    expect(wouldCollide({ sprite: T, bottom: 2, left: 8 }, stack)).toBe(false)
  })

  it('should return false when partially above top', () => {
    const stack = [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    ]
    expect(wouldCollide({ sprite: T, bottom: 0, left: 0 }, stack)).toBe(false)
  })
})
