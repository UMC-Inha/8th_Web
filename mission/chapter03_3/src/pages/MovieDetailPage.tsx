import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

type MovieDetail = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    genres: { id: number; name: string }[];
    vote_average: number;
    tagline: string;
    runtime: number;
    budget: number;
    revenue: number;
    production_companies: { id: number; name: string; logo_path: string | null }[];
};

type Credit = {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
    job?: string;
};

const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movies, setMovies] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<{ cast: Credit[]; crew: Credit[] }>({ cast: [], crew: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMoviesDetails = async () => {
            setIsLoading(true);
            try {
                const [movieResponse, creditsResponse] = await Promise.all([
                    axios.get<MovieDetail>(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                    axios.get<{ cast: Credit[]; crew: Credit[] }>(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                ]);

                setMovies(movieResponse.data);
                setCredits(creditsResponse.data);

            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesDetails();
    }, [movieId]);

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-xl font-bold">
                영화 정보를 불러오는 데 실패했습니다.
            </div>
        );
    }

    const directors = credits.crew.filter(person => person.job === "Director");
    const castToShow = credits.cast;

    return (
        <div className="max-dvh mx-auto p-6 bg-black">
            <div>
                <div
                    className="w-full h-64 bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies?.backdrop_path})`}}
                />
            </div>

            <div className="flex flex-col md:flex-row gap-6 mt-6">

            <div>
                <h1 className="text-3xl font-bold text-white">{movies?.title}</h1>
                <p className="mt-2 text-gray-200"><strong>평균:</strong> {movies?.vote_average}</p>
                <p className="text-gray-300"> {movies?.release_date} </p>
                <p className="text-gray-300"> {movies?.runtime}분 </p>
                {movies?.tagline && <p className="italic text-lg text-gray-400 mt-2">"{movies.tagline}"</p>}

                <p className="mt-2 text-lg text-gray-300">{movies?.overview}</p>
            </div>
        </div>

            <div>
                <h2 className="text-2xl font-bold mt-8 text-gray-200">감독 / 출연</h2>

                <div className="grid grid-cols-5 gap-6 mt-4">
                    {directors.map(director => (
                        <div key={director.id} className="flex flex-col items-center">
                            {director.profile_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                                    alt={director.name}
                                    className="w-24 h-24 rounded-full shadow-lg text-gray-200 border-1"
                                />
                            )}
                            <p className="text-sm mt-2 text-white">{director.name}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-5 gap-6 mt-4">
                    {castToShow.map(cast => (
                        <div key={cast.id} className="flex flex-col items-center">
                            {cast.profile_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                                    alt={cast.name}
                                    className="w-24 h-24 rounded-full shadow-lg text-gray-200 border-1"
                                />
                            )}
                            <p className="text-sm mt-2 text-white">{cast.name}</p>
                            <p className="text-xs text-gray-200">{cast.character}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
