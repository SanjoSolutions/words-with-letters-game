import { randomInteger } from './randomInteger.js'

export function randomValue(values) {
  return values[randomInteger(0, values.length)]
}
