import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto|null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch(error) {
        console.error("오류입니다", error)
      }
    };
    getData();
  }, []);

  return (
    <div>
      {data?.data.name}, {data?.data.email}
    </div>
  );
};

export default MyPage;
