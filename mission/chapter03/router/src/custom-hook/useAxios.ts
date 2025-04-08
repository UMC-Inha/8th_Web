import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/movie';

const useAxios = (
    axiosParams: AxiosRequestConfig,
    dependencies: any[]
) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            const result = await axios.request(params);
            setResponse(result);
        } catch (e) {
            setError(e as AxiosError);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (axiosParams.method === "GET" || axiosParams.method === "get") {
            fetchData(axiosParams);
        }
    }, dependencies);

    return { response, error, loading };
}

export default useAxios;