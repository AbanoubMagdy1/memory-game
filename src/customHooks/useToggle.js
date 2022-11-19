import { useState } from 'react'

export default function useToggle (val = false) {
  const [value, setValue] = useState(val)

  function toggle (val) {
    setValue(typeof val === 'boolean' ? val : !value)
  }

  return [value, toggle]
}
