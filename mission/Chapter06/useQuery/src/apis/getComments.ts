import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export const getComments = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = "asc",
}: {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
}) => {
  const res = await axios.get(`http://localhost:8000/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });
  return res.data;
};
