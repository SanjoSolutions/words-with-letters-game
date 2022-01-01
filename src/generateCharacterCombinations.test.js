import { generateCharacterCombinations } from './generateCharacterCombinations.js'
import { words } from './words/words.js'

const result = generateCharacterCombinations(words, { minimumLength: 3, maximumLength: 3 })
