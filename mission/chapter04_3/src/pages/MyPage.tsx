import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from '../../types/auth';

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto>([]);
    useEffect(() => {
        const setData = async() => {
            const response = await getMyInfo();
        }
    }, [])

    return (
        <div>
            {data.data.name} {data.data.email}
        </div>
    )
}

export default MyPage
