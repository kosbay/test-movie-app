import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import { Movie as MovieType } from 'interfaces/Movie'

// import defaultImage from '../assets/no-image.jpg'
import MovieContext from '../MovieContext'

function Movie({ movie }: { movie: MovieType }) {
  const { addToFavourites, isFav } = useContext(MovieContext)

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} layout className="movie">
      {isFav(movie.id) ? (
        <AiOutlineStar onClick={() => addToFavourites(movie)} />
      ) : (
        <AiFillStar onClick={() => addToFavourites(movie)} />
      )}
      <Link to={`/movie/${movie.id}`} key={movie.id}>
        <div className="shadow"></div>
      </Link>
      {movie.poster_path !== null ? (
        <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
      ) : (
        <img src={undefined} />
      )}
      <h2>{movie.title}</h2>
    </motion.div>
  )
}

export default Movie
