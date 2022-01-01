import { characterCombinationsToWords } from './characterCombinationsToWords.js'
import { CharacterCounts } from './CharacterCounts.js'
import { getRandomValue } from '@sanjo/random'

export function main() {
  const characterCombinationsToWords2 = Array.from(characterCombinationsToWords)

  const $characters = document.getElementById('characters')
  const $input = document.getElementById('input')
  const $numberOfWordsLeft = document.getElementById('numberOfWordsLeft')
  const $solutions = document.getElementById('solutions')

  let characterCounts
  let words

  function updateNumberOfWordsLeft() {
    $numberOfWordsLeft.textContent = words.length + ' words left'
  }

  function newCharactersAndWords() {
    const characterCountsAndWords = getRandomValue(characterCombinationsToWords2)
    characterCounts = CharacterCounts.createForWord(characterCountsAndWords[0])
    words = Array.from(characterCountsAndWords[1])
    updateNumberOfWordsLeft()

    $characters.innerHTML = ''
    for (const [character, count] of characterCounts.entries()) {
      for (let i = 1; i <= count; i++) {
        const $character = document.createElement('div')
        $character.className = 'character'
        $character.textContent = character
        $characters.appendChild($character)
      }
    }

    $solutions.innerHTML = ''
  }

  newCharactersAndWords()

  $input.addEventListener('keyup', function () {
    const value = $input.value
    if (words.includes(value)) {
      const $solution = document.createElement('div')
      $solution.className = 'solution'
      $solution.textContent = value
      $solutions.appendChild($solution)
      $input.value = ''
      words = words.filter(word => word !== value)
      updateNumberOfWordsLeft()
      if (words.length === 0) {
        newCharactersAndWords()
      }
    }
  })
}
