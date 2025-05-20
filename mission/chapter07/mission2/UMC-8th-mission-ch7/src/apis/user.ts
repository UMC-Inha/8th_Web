import { ResponseMyInfoDto } from "../types/auth";
import { UpdateUserDto } from "../types/user";
import { axiosInstance } from "./axios";

export const updateUser = async (payload: UpdateUserDto): Promise<ResponseMyInfoDto["data"]> => {
    const { data } = await axiosInstance.patch<{ data: ResponseMyInfoDto["data"] }>(
        "/v1/users",
        payload
    );
    return data.data;
};

export const withdrawUser = async () => {
    await axiosInstance.delete("/v1/users");
};