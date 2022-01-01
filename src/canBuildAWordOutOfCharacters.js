import { CharacterCounts } from './CharacterCounts.js'

export function canBuildAWordOutOfCharacters(wordsCharacterCounts, nextCharacterCombination) {
  const nextCharacterCombinationCharacterCounts = CharacterCounts.create(nextCharacterCombination)
  return wordsCharacterCounts
    .some(wordCharacterCount => nextCharacterCombinationCharacterCounts.covers(wordCharacterCount))
}
