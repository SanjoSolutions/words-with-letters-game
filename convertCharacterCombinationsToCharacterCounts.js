import { convertCharacterCombinationToCharacterCounts } from './convertCharacterCombinationToCharacterCounts.js'

export function convertCharacterCombinationsToCharacterCounts(characterCombinations) {
  return characterCombinations.map(convertCharacterCombinationToCharacterCounts)
}
