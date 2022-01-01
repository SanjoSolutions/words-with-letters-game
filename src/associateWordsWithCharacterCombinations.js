import { convertCharacterCombinationsToCharacterCounts } from './convertCharacterCombinationsToCharacterCounts.js'

export function associateWordsWithCharacterCombinations(words, characterCombinations) {
  const counts = convertCharacterCombinationsToCharacterCounts(characterCombinations)
  const associations = new Map()
  for (const word of words) {
    const countsForWord = counts.filter(count => count.hasAllCharacters(word))
    for (const countForWord of countsForWord) {
      let association
      if (associations.has(countForWord)) {
        association = associations.get(countForWord)
      } else {
        association = []
        associations.set(countForWord, association)
      }
      association.push(word)
    }
  }
  return associations
}
