import { useParams } from "react-router-dom";
import LoadingSpinner from "../component/LoadingSpinner";
import MovieDetailCard from "../component/MovieDetailCard";
import useAxios from "../custom-hook/useAxios";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { response: detailResponse, loading: detailLoading, error: detailError } = useAxios({
    method: "GET",
    url: `/${id}?language=en-US`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    }
  }, [id]);

  const { response: creditResponse, loading: creditLoading, error: creditError } = useAxios({
    method: "GET",
    url: `/${id}/credits?language=en-US`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
    }
  }, [id]);

  if (detailLoading || creditLoading) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="p-4 text-center text-red-500">
        영화 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  if (creditError) {
    return (
      <div className="p-4 text-center text-red-500">
        출연 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  const movie = detailResponse?.data;
  const credits = creditResponse?.data;

  if (!movie || !credits) return null;

  const director = credits.crew.find((member) => member.job === "Director");
  const allCast = credits.cast;

  return (
    <div className="container mx-auto p-4">
      <MovieDetailCard movie={movie} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex flex-col gap-6">
          {director && (
            <div className="flex items-center gap-4">
              {director.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                  No Image
                </div>
              )}
              <p className="text-xl font-bold">감독: {director.name}</p>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold mb-2">출연진</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {allCast.map((castMember) => {
                const { id = '',
                  profile_path = '',
                  name = '',
                  character = ''
                } = castMember;
                return (
                  <div key={id} className="text-center">
                    {profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                        alt={name}
                        className="rounded-full w-20 h-20 mx-auto object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-gray-500">{character}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;