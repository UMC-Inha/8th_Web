import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

type Credit = {
  id: number;
  name: string;
  job?: string;
  character?: string;
  profile_path: string | null;
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>()
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [credits, setCredits] = useState<Credit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const apiKey = import.meta.env.VITE_TMDB_KEY

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en`)
        ])

        setMovie(movieRes.data) // 영화정보보
        setCredits(creditRes.data.cast.slice(0, 12)) // 상위 12명만 표시
      } catch (err) {
        console.error(err)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (movieId) {
      fetchData()
    }
  }, [movieId])

  if (isLoading) {
    return <div className="text-center text-xl mt-10">로딩 중...</div>
  }

  if (isError || !movie) {
    return <div className="text-red-500 text-center text-xl mt-10">영화 정보를 불러올 수 없습니다.</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-500 mb-1">Date: {movie.release_date}</p>
          <p className="text-yellow-600 font-semibold mb-2">Rate: {movie.vote_average}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="leading-relaxed text-gray-700">{movie.overview}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Casts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {credits.map((person) => (
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
                {person.character && <p className="text-sm text-gray-500">character: {person.character}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
