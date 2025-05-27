import { axiosInstance } from "./axios";

export const updateUserProfile = async ({
    name,
    bio,
    avatar,
}: {
    name: string;
    bio: string;
    avatar: string;
}) => {
    
    const { data } = await axiosInstance.put("/v1/users/me", {
        name,
        bio,
        avatar,
    });
    
    return data;
};