import axiosInstance from "../api/axios";

const TestRequest = () => {
  const handleClick = async () => {
    try {
      const response = await axiosInstance.get("v1/users/me");
      console.log("[요청 결과] 사용자 정보:", response.data);
    } catch (error) {
      console.error("[요청 실패]", error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>사용자 정보 요청 (테스트)</button>
    </div>
  );
};

export default TestRequest;
