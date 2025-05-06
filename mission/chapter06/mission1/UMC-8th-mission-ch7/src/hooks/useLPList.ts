import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLpList = (sort: "latest" | "oldest") => {
  return useQuery({
    queryKey: ["lpList", sort],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/v1/lps?sort=${sort}`);
      return res.data;
    },
  });
};
