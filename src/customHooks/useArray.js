import { useState } from 'react'

export default function useArray (initialValue = []) {
  const [arr, setArr] = useState(initialValue)

  function push (...values) {
    setArr([...arr, ...values])
  }

  function pop (comparator) {
    setArr(arr.filter(comparator))
  }

  function sort (comparator = (a, b) => a - b) {
    setArr([...arr.sort(comparator)])
  }

  function clear () {
    setArr([])
  }

  return { arr, setArr, push, pop, sort, clear }
}
