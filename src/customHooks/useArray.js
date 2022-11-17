import { useState } from 'react'

export default function useArray (initialValue = []) {
  const [arr, setArr] = useState(initialValue)

  function push (val) {
    setArr([...arr, val])
  }

  function pop (comparator) {
    setArr(arr.filter(comparator))
  }

  function sort (comparator = (a, b) => a - b) {
    setArr([...arr.sort(comparator)])
  }

  return { arr, push, pop, sort }
}
