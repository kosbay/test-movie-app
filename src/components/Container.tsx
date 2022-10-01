import React, { useContext } from 'react'

import Filter from './Filter'
import Header from './Header'
import MoviesList from './MoviesList'
import Search from './Search'

import MovieContext from '../contexts/MovieContext'

const Container = () => {
  const { searchQuery } = useContext(MovieContext)

  return (
    <div className="container">
      <Search />
      {!searchQuery && <Filter />}
      <Header />
      <MoviesList />
    </div>
  )
}

export default Container
