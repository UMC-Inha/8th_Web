import { useEffect } from "react"
import { useLocalsStorage } from "../hooks/useLocalsStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
    const {setItem : setAccessToken} = useLocalsStorage(LOCAL_STORAGE_KEY.accessToken);
    const {setItem : setRefreshToken} = useLocalsStorage(LOCAL_STORAGE_KEY.refreshToken)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);

            window.location.href = "/my"
        }
        
        console.log(urlParams.get("name"));
    }, [setAccessToken, setRefreshToken]);

    return (
        <div>
            구글 로그인 리다이렉 화면
        </div>
    )
}

export default GoogleLoginRedirectPage
