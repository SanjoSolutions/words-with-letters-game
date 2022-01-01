import fs from 'fs/promises'
import { alphabet } from './alphabet.js'
import { associateWordsWithCharacterCombinations } from './associateWordsWithCharacterCombinations.js'
import { canBuildAWordOutOfCharacters } from './canBuildAWordOutOfCharacters.js'
import { CharacterCounts } from './CharacterCounts.js'
import { words as wordList } from './words/words.js'

const words2 = wordList.filter(word => word.length >= 3)

export function generateCharacterCombinations(words, { minimumLength, maximumLength }) {
  const wordsCharacterCounts = words.map(CharacterCounts.createForWord)

  let characterCombinations = []

  let characterCombinationsToExpand = Array.from(alphabet).map(character => [character])

  if (minimumLength <= 1) {
    characterCombinations = characterCombinations.concat(characterCombinationsToExpand)
  }

  for (let length = 2; length <= maximumLength; length++) {
    const nextCharacterCombinationsToExpand = []
    for (const characterCombination of characterCombinationsToExpand) {
      const lastCharacter = characterCombination[characterCombination.length - 1]
      const lastCharacterIndex = alphabet.indexOf(lastCharacter)
      for (let index = lastCharacterIndex; index < alphabet.length; index++) {
        const character = alphabet[index]
        const nextCharacterCombination = characterCombination.concat([character])
        if (
          nextCharacterCombination.length >= minimumLength &&
          canBuildAWordOutOfCharacters(wordsCharacterCounts, nextCharacterCombination)
        ) {
          characterCombinations.push(nextCharacterCombination)
        }
        nextCharacterCombinationsToExpand.push(nextCharacterCombination)
      }
    }
    characterCombinationsToExpand = nextCharacterCombinationsToExpand
  }

  return characterCombinations
}

const characterCombinationsToWords = associateWordsWithCharacterCombinations(
  words2,
  generateCharacterCombinations(words2, { minimumLength: 3, maximumLength: 7 })
)

const file = await fs.open('characterCombinationsToWords.js', 'w')
await file.write('export const characterCombinationsToWords = new Map([\n')
for (const [characterCounts, words] of characterCombinationsToWords) {
  await file.write(`  ['${characterCounts.toString()}', [${words.map(word => `'${word}'`).join(', ')}]],\n`)
}
await file.write('])\n')
await file.close()
