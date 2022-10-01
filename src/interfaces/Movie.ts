export interface Movie {
  id: string
  title: string
  poster_path?: string
  original_title: string
  overview: string
  vote_average: string
  genres: {
    id: string
    name: string
  }[]
  production_companies: {
    id: string
    name: string
  }[]
  production_countries: {
    name: string
  }[]
  release_date: string
  homepage: string
  genre_ids: number[]
}
