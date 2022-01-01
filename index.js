import { words as wordList } from './words/words.js'

const alphabet = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z',
]

export function generateCharacterCombinations({ minimumLength, maximumLength }) {
  let characterCombinations = Array.from(alphabet).map(character => [character])

  for (let length = 2; length <= maximumLength; length++) {
    const nextCharacterCombinations = []
    for (const characterCombination of characterCombinations) {
      const lastCharacter = characterCombination[characterCombination.length - 1]
      const lastCharacterIndex = alphabet.indexOf(lastCharacter)
      for (let index = lastCharacterIndex; index < alphabet.length; index++) {
        const character = alphabet[index]
        const nextCharacterCombination = characterCombination.concat([character])
        nextCharacterCombinations.push(nextCharacterCombination)
      }
    }
    characterCombinations = characterCombinations.concat(nextCharacterCombinations)
  }

  characterCombinations = characterCombinations.filter(
    characterCombination => characterCombination.length >= minimumLength
  )

  return characterCombinations
}

export class CharacterCounts {
  static create(characters) {
    const characterCounts = new CharacterCounts()
    for (const character of characters) {
      characterCounts.incrementCount(character)
    }
    return characterCounts
  }

  static createForWord(word) {
    return CharacterCounts.create(word)
  }

  constructor() {
    this.counts = new Map()
  }

  entries() {
    return this.counts.entries()
  }

  getCount(character) {
    return this.counts.get(character) ?? 0
  }

  setCount(character, count) {
    this.counts.set(character, count)
  }

  incrementCount(character) {
    this.setCount(character, this.getCount(character) + 1)
  }

  hasAllCharacters(word) {
    const wordCharacterCounts = CharacterCounts.createForWord(word)
    return this.covers(wordCharacterCounts)
  }

  covers(characterCounts) {
    return Array.from(characterCounts.entries())
      .every(([character, count]) => this.counts.has(character) && this.counts.get(character) >= count)
  }
}

export function convertCharacterCombinationsToCharacterCounts(characterCombinations) {
  return characterCombinations.map(convertCharacterCombinationToCharacterCounts)
}

function convertCharacterCombinationToCharacterCounts(characterCombination) {
  return CharacterCounts.create(characterCombination)
}

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

export function main() {
  const words2 = wordList.filter(word => word.length >= 3)
  const characterCombinationsToWords = associateWordsWithCharacterCombinations(
    words2,
    generateCharacterCombinations({minimumLength: 3, maximumLength: 3})
  )

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
    const characterCountsAndWords = randomValue(Array.from(characterCombinationsToWords))
    characterCounts = characterCountsAndWords[0]
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

function randomValue(values) {
  return values[randomInteger(0, values.length)]
}

function randomInteger(min, max) {
  return Math.floor(randomFloat(min, max))
}

function randomFloat(min, max) {
  return min + (max - min) * Math.random()
}
