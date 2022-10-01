import React, { useContext } from 'react'

import { AiOutlineStar } from 'react-icons/ai'
import { BiCameraMovie, BiMoviePlay } from 'react-icons/bi'
import { BsStars } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineMovieFilter } from 'react-icons/md'

import MovieContext from '../contexts/MovieContext'

const Panel = () => {
  const { header, fetchPopular, getFavourites, fetchNowPlaying, fetchTopRated, fetchUncoming } =
    useContext(MovieContext)

  return (
    <div className="panel">
      <div>
        <MdOutlineMovieFilter onClick={() => fetchPopular()} className={header === 'Trending' ? 'active' : ''} />

        <BiMoviePlay onClick={() => fetchNowPlaying()} className={header === 'Now playing' ? 'active' : ''} />

        <BsStars onClick={() => fetchTopRated()} className={header === 'Top rated' ? 'active' : ''} />

        <BiCameraMovie onClick={() => fetchUncoming()} className={header === 'Uncoming' ? 'active' : ''} />
      </div>
      <div>
        <AiOutlineStar onClick={() => getFavourites()} className={header === 'Your favourites' ? 'active' : ''} />

        <FaUserCircle></FaUserCircle>
      </div>
    </div>
  )
}

export default Panel
