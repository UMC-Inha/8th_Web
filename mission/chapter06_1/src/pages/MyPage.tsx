import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async() => {
            const token = localStorage.getItem("accessToken");
            console.log("현재 accessToken 은 : ", token);

            try {
                const response = await getMyInfo();
                console.log("response", response);

                setData(response);
            } 
            
            catch (error) {
                console.error("데이터를 받아오지 못했습니다 : ", error);
                alert("로그인 후 다시 실행해 주세요")
                
                navigate("/");
            }
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <div className= "flex flex-col items-center justify-center min-h-screen gap-4 bg-black text-white">
            <div className= "flex flex-col gap-4 items-center">
                { data && (
                <>
                    <h1 className="flex items-center justify-center text-3xl col-span-1"> 
                    {data.data.name}님의 페이지입니다. 
                    </h1>

                    <img src = {data.data.avatar as string} alt = {"로고 이미지"}/>

                    <h1> {data.data.email} </h1>

                    <button 
                    className ='cursor-pointer bg-pink-500 rounded-sm p-5 hover:scale-90' 
                    onClick={handleLogout}> 
                        로그아웃 
                    </button>
                </>
                )}
            </div>
        </div>
    )
}

export default MyPage
