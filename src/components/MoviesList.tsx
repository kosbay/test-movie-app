import React, { useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { motion } from 'framer-motion'

import Movie from './Movie'

import MovieContext from '../contexts/MovieContext'

const MoviesList = () => {
  const { filtered, fetchPopular, header, fetchSearch, searchQuery, searchPage, hasMorePage } = useContext(MovieContext)

  useEffect(() => {
    if (header === 'Trending') {
      fetchPopular()
    }
  }, [header])

  const handleFetchSearch = () => {
    if (searchQuery) {
      fetchSearch(searchQuery, searchPage + 1)
    }
  }

  return (
    <>
      <InfiniteScroll
        dataLength={filtered.length}
        next={handleFetchSearch}
        hasMore={hasMorePage}
        loader={<h4>Loading...</h4>}
      >
        <motion.div layout className="popular-movies">
          {filtered.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </motion.div>
      </InfiniteScroll>
      {filtered.length === 0 && <p className="info">No movies to display</p>}
    </>
  )
}

export default MoviesList
