import { useEffect, useState } from 'react'

import { Movie } from 'interfaces/Movie'

const getStorageValue = (key: string, defaultValue: Movie[]) => {
  // getting stored value
  const saved = localStorage.getItem(key)

  if (!saved) {
    return defaultValue
  }

  const initial = JSON.parse(saved)

  return initial
}

export const useLocalStorage = (
  key: string,
  defaultValue: Movie[],
): [Movie[], React.Dispatch<React.SetStateAction<Movie[]>>] => {
  const [value, setValue] = useState<Movie[]>(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
