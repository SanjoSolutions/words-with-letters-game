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

  toString() {
    let string = ''
    const characters = Array.from(this.counts.keys())
    characters.sort()
    for (const character of characters) {
      for (let i = 1; i <= this.counts.get(character); i++) {
        string += character
      }
    }
    return string
  }
}
