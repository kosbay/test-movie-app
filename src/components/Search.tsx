import React, { useContext, useState } from 'react'

import { RiSearchLine } from 'react-icons/ri'

import MovieContext from '../contexts/MovieContext'

const Search = () => {
  const [value, setValue] = useState('')
  const { fetchPopular, fetchSearch } = useContext(MovieContext)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value !== '') {
      const query = value.trim()

      if (query === '') {
        fetchPopular()
      } else {
        fetchSearch(query, 1)
      }
      setValue('')
    }
  }

  return (
    <div className="search-movies">
      <label htmlFor="search">
        <RiSearchLine />
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search for movies"
        onKeyDown={e => handleKeyDown(e)}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Search
