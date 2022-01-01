import { randomFloat } from './randomFloat.js'

export function randomInteger(min, max) {
  return Math.floor(randomFloat(min, max))
}
