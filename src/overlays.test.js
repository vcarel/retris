import { overlays, rotateLeft, rotateRight } from './overlays'

const { I, J, T } = overlays

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
