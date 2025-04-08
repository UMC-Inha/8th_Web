import { useParams } from "react-router-dom"
import useCustomFetch from "../hooks/useCustomFetch"
import { MovieDetailResponse } from "../types/movie"
import { LoadingSpinner } from "../components/LoadingSpinner"

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}`
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`

  const {data: movie, isPending: isMoviePending, isError: isMovieError} = 
  useCustomFetch<MovieDetailResponse>(movieUrl)
  const {data: creditData, isPending: isCreditPending, isError:isCreditError} = 
  useCustomFetch<MovieDetailResponse>(creditUrl)

 
  if (isMoviePending||isCreditPending) {
    return <div className="flex justify-center items-center h-dvh">
      <LoadingSpinner />
    </div>
  }
  if (isMovieError||isCreditError) {
    return <div>
      <span className="text-red-500 text-2xl">에러가 발생했는데얔!!!!!!</span>
    </div>
  }

  if (!movie) return null // data가 undefined일때 대비
  const { poster_path, title, release_date, vote_average, genres, overview } = movie
  const { cast } = creditData

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={`${title} 포스터 이미지`}
          className="rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-500 mb-1">개봉일: {release_date}</p>
          <p className="text-yellow-600 font-semibold mb-2">평점: {vote_average}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {genres.map((genre) => (
              <span key={genre.id} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="leading-relaxed text-gray-700">{overview}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cast.slice(0, 12).map((person) => (
            <div key={person.id} className="flex gap-3 items-center">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                  alt={person.name}
                  className="w-16 h-16 object-cover rounded-full shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full" />
              )}
              <div>
                <p className="font-semibold">{person.name}</p>
                {person.character && (
                  <p className="text-sm text-gray-500">역할: {person.character}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
