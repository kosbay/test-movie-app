import React, { createContext, Dispatch, useState } from 'react'

import _ from 'lodash'

import { Movie } from 'interfaces/Movie'

import { useLocalStorage } from '../hooks/useLocalStorage'

const ITEMS_PER_PAGE = 20

interface MovieContextType {
  header: string
  setHeader: Dispatch<string>
  addToFavourites: (movie: Movie) => void
  filtered: Movie[]
  setFiltered: Dispatch<Movie[]>
  fetchPopular: () => void
  movies: Movie[]
  setMovies: Dispatch<Movie[]>
  activeGenre: number
  setActiveGenre: Dispatch<number>
  fetchSearch: (query: string, page: number) => void
  getFavourites: () => void
  isFav: (id: string) => boolean
  fetchNowPlaying: () => void
  fetchTopRated: () => void
  fetchUncoming: () => void
  searchQuery: string
  searchPage: number
  hasMorePage: boolean
}

const initialState = {
  header: '',
  setHeader: _.noop,
  addToFavourites: _.noop,
  filtered: [],
  setFiltered: _.noop,
  fetchPopular: _.noop,
  movies: [],
  setMovies: _.noop,
  activeGenre: 0,
  setActiveGenre: _.noop,
  fetchSearch: _.noop,
  getFavourites: _.noop,
  isFav: () => true,
  fetchNowPlaying: _.noop,
  fetchTopRated: _.noop,
  fetchUncoming: _.noop,
  searchQuery: '',
  searchPage: 1,
  hasMorePage: false,
}

const MovieContext = createContext<MovieContextType>(initialState)

export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filtered, setFiltered] = useState<Movie[]>([])
  const [activeGenre, setActiveGenre] = useState<number>(0)
  const [header, setHeader] = useState<string>('Trending')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchPage, setSearchPage] = useState<number>(1)
  const [hasMorePage, setHasMorePage] = useState<boolean>(false)

  // localstorage state
  const [favourites, setFavourites] = useLocalStorage('fav', [])

  const resetSearch = () => {
    setActiveGenre(0)
    setSearchQuery('')
    setHasMorePage(false)
  }

  const fetchPopular = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1',
    )
    const movies = await data.json()

    setMovies(movies.results)
    setFiltered(movies.results)
    setHeader('Trending')
    resetSearch()
  }

  const fetchSearch = async (query: string, page = 1) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&query=${query}&page=${page}&include_adult=false`,
    )
    const response = await data.json()

    if (page === 1) {
      setMovies(response.results)
      setFiltered(response.results)
    } else {
      setMovies([...movies, ...response.results])
      setFiltered([...filtered, ...response.results])
    }

    if (response.total_results > page * ITEMS_PER_PAGE) {
      setHasMorePage(true)
    } else {
      setHasMorePage(false)
    }

    setHeader(`Results for "${query}"`)
    setActiveGenre(0)
    setSearchQuery(query)
    setSearchPage(page)
  }

  const fetchNowPlaying = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1',
    )
    const movies = await data.json()

    setMovies(movies.results)
    setFiltered(movies.results)
    setHeader('Now playing')
    resetSearch()
  }

  const fetchTopRated = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1',
    )
    const movies = await data.json()

    setMovies(movies.results)
    setFiltered(movies.results)
    setHeader('Top rated')
    resetSearch()
  }

  const fetchUncoming = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=b454aa11fb4b5fc5b515d2e80a898a1c&language=en-US&page=1',
    )
    const movies = await data.json()

    setMovies(movies.results)
    setFiltered(movies.results)
    setHeader('Uncoming')
    resetSearch()
  }

  const addToFavourites = (movie: Movie) => {
    let isOnArray = false

    favourites.map(fav => {
      if (fav.id === movie.id) {
        isOnArray = true
      }
    })

    if (isOnArray) {
      setFavourites(favourites.filter((fav: Movie) => fav.id !== movie.id))
    } else {
      setFavourites(prevState => [...prevState, movie])
    }
  }

  const getFavourites = () => {
    setMovies(favourites)
    setFiltered(favourites)
    setHeader('Your favourites')
    resetSearch()
  }

  const isFav = (id: string) => {
    const fav = favourites.filter((fav: Movie) => fav.id === id)

    return fav.length === 0 ? true : false
  }

  return (
    <MovieContext.Provider
      value={{
        header,
        setHeader,
        addToFavourites,
        filtered,
        setFiltered,
        fetchPopular,
        movies,
        setMovies,
        activeGenre,
        setActiveGenre,
        fetchSearch,
        getFavourites,
        isFav,
        fetchNowPlaying,
        fetchTopRated,
        fetchUncoming,
        searchQuery,
        searchPage,
        hasMorePage,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext
