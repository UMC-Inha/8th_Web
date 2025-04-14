// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { LoadingSpinner } from "../components/LoadingSpinner";

// export default function MovieDetailPage() {
//   const { movieId, category } = useParams<{ movieId: string; category: string }>();
//   const [movie, setMovie] = useState<any>(null);
//   const [credits, setCredits] = useState<any>(null);
//   const [videos, setVideos] = useState<any[]>([]);
//   const [recommendations, setRecommendations] = useState<any[]>([]);
//   const [isPending, setIsPending] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     const fetchMovieDetail = async () => {
//       if (!movieId) return;
//       setIsPending(true);
//       try {
//         const [movieRes, creditsRes, videosRes, recRes] = await Promise.all([
//           axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
//             headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
//           }),
//           axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`, {
//             headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
//           }),
//           axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`, {
//             headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
//           }),
//           axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=ko-KR`, {
//             headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` },
//           }),
//         ]);
//         setMovie(movieRes.data);
//         setCredits(creditsRes.data);
//         setVideos(videosRes.data.results);
//         setRecommendations(recRes.data.results);
//         setIsError(false);
//       } catch (err) {
//         console.error(err);
//         setIsError(true);
//       } finally {
//         setIsPending(false);
//         window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단 이동
//       }
//     };

//     fetchMovieDetail();
//   }, [movieId]);

//   if (isPending) return <LoadingSpinner />;
//   if (isError || !movie) return <div className="text-red-500">정보를 불러오지 못했습니다.</div>;

//   const mainCast = credits?.cast?.slice(0, 5) ?? [];
//   const director = credits?.crew?.find((c: any) => c.job === "Director");

//   return (
//     <div className="p-6 max-w-6xl mx-auto text-white">
//       {/* 포스터 + 정보 */}
//       <div className="flex flex-col md:flex-row gap-8 mb-10">
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           className="w-full md:w-1/3 rounded-xl shadow-lg"
//         />
//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
//             <p className="text-gray-300 mb-4">{movie.overview}</p>
//           </div>
//           <div className="bg-gray-800/50 p-4 rounded-xl shadow-inner">
//             <ul className="space-y-2 text-sm text-gray-200">
//               <li><strong>개봉일:</strong> {movie.release_date}</li>
//               <li><strong>상영 시간:</strong> {movie.runtime}분</li>
//               <li><strong>평점:</strong> {movie.vote_average} / 10</li>
//               <li><strong>장르:</strong> {movie.genres.map((g: any) => g.name).join(', ')}</li>
//               <li><strong>감독:</strong> {director?.name}</li>
//               <li><strong>제작사:</strong> {movie.production_companies.map((c: any) => c.name).join(', ')}</li>
//               <li><strong>공식 사이트:</strong> {
//                 movie.homepage
//                   ? <a href={movie.homepage} target="_blank" className="text-blue-400 underline">바로가기</a>
//                   : '없음'
//               }</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* 예고편 */}
//       {videos.length > 0 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-3">예고편</h2>
//           <div className="aspect-video w-full mb-10">
//             <iframe
//               className="w-full h-full rounded-xl"
//               src={`https://www.youtube.com/embed/${videos[0].key}`}
//               title={videos[0].name}
//               allowFullScreen
//             ></iframe>
//           </div>
//         </>
//       )}

//       {/* 출연 배우 */}
//       <h2 className="text-2xl font-semibold mb-3">주요 출연진</h2>
//       <div className="flex gap-4 overflow-x-auto mb-10">
//         {mainCast.map((actor: any) => (
//           <div key={actor.id} className="w-28 flex-shrink-0 text-center">
//             <img
//               src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
//               alt={actor.name}
//               className="rounded-lg mb-1 w-full h-36 object-cover"
//             />
//             <p className="text-sm font-medium">{actor.name}</p>
//             <p className="text-xs text-gray-400">{actor.character}</p>
//           </div>
//         ))}
//       </div>

//       {/* 추천 영화 */}
//       {recommendations.length > 0 && (
//         <>
//           <h2 className="text-2xl font-semibold mb-3">추천 영화</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//             {recommendations.slice(0, 10).map((rec) => (
//               <Link key={rec.id} to={`/movies/${category}/${rec.id}`}>
//                 <div className="text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
//                     alt={rec.title}
//                     className="rounded-lg mb-2 shadow"
//                   />
//                   <p className="text-sm">{rec.title}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react"
// import { Movie, MovieDetailResponse } from "../types/movie";
// import axios from "axios";
// import MovieCard from "../components/MovieCard";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse } from "../types/movie";
// import { LoadingSpinner } from "../components/LoadingSpinner";


const MovieDetailPage=()=>{
  const params=useParams();
  const url =`https://api.themoviedb.org/3/movie/${params.movieId}`
   
  const {isPending,isError,data:movie}=useCustomFetch<MovieDetailResponse>(url,'ko-KR');
    if(isPending){
      return<div>Loading...</div>
    }

    if (isError) {
        return (
            <div className="flex justify-center">
                <span className="text-red-500 text-2xl">
                    에러가 발생했습니다.
                </span>
            </div>
        )
    }             



  return<div>MovieDetailPage{params.movieId}</div>
}

export default MovieDetailPage;