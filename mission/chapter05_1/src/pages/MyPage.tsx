import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from '../../types/auth';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto>([]);
    useEffect(() => {
        const getData = async() => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }

    return (
        <div className= "flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
            <div className= "flex flex-col gap-4 items-center">
                <h1 className="flex items-center justify-center text-3xl col-span-1"> 
                    {data.data?.name} 님의 페이지입니다. 
                </h1>

                <img src = {data.data?.avatar as string} alt = {"로고 이미지"}/>

                <h1> {data.data?.email} </h1>

                <button 
                className ='cursor-pointer bg-pink-500 rounded-sm p-5 hover:scale-90' 
                onClick={handleLogout}> 
                    로그아웃 
                </button>
            </div>
        </div>
    )
}

export default MyPage
