import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import { LpCard } from "../components/LpCard/LpCard";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";
import { LpCardSkeleton } from "../components/LpCard/LpCardSkeleton";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center text-center">
      <h1 className="text-3xl font-bold">
      TERI LP SERVICE
      </h1>
      
    </div>
  );
};

export default HomePage;
