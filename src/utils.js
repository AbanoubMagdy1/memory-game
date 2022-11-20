import photos from './photos.js'

function generateId () {
  return Math.random().toString(36).substring(2, 9)
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export function createGameGrid (dim = 4) {
  const grid = Array(dim).fill(0).map(i => Array.from({ length: dim }, () => ({
    value: '',
    id: generateId()
  })))

  const values = [...photos, ...photos]
  shuffleArray(values)

  for (const row of grid) {
    for (const cell of row) {
      cell.value = values.pop()
    }
  }

  return grid
}
