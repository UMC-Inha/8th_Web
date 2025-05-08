import { useState } from "react";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValue : {
            email: "",
            password: ""
        },

        validate : validateSignin,
    });

    const handleSubmit = async() => {
        await login(values);
    };

    const [page, setPage] = useState(1);

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
    }

    const isDisabled : boolean = 
    Object.values(errors || {}).some((error : string) => error.length > 0) || 
    Object.values(values).some((value : string) => value === "");

    return (
        <div className='flex flex-col items-center justify-center h-full gap-4 bg-black text-white'>

            <div className="grid grid-cols-3">
                <button 
                    className = "text-white disabled:cursor-pointer disabled:cursor-not-allowed"
                    disabled = {page === 1} 
                    onClick = {() => setPage((prev) => prev - 1)}> 
                        {`<`}
                </button>

                <h1 className="flex items-center justify-center text-xl"> 로그인 </h1>
            </div>

            <div className='flex flex-col gap-7'>
                <button className='border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm'>
                    구글 로그인
                </button>

                <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <hr className="flex-grow border-t border-gray-300" />
                        <span className='text-white'> OR </span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className='flex flex-col gap-3'>
                    <input 
                    {...getInputProps('email')}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm 
                    ${errors?.email && touched?.email ? 'border-red-500 bg-red-200' : 'border-gray-300'}`} 
                    type={"email"}
                    placeholder={"이메일을 입력해주세요"} 
                    />

                    {errors?.email && touched?.email && (<div className="text-red-500 text-sm"> {errors.email} </div>)} 

                    <input 
                    {...getInputProps('password')}
                    className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? 'border-red-500 bg-red-200' : 'border-gray-300'}`} 
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요"} 
                    />

                    {errors?.password && touched?.password && (<div className="text-red-500 text-sm"> {errors.password} </div>)} 

                    <button 
                    className="w-full bg-[pink] text-white py-3 rounded-md text-lg font-medium hover:bg-[hotpink] transition-colors cursor-pointer disabled:bg-gray-300"
                    type = {"button"}
                    onClick={handleSubmit} 
                    disabled={isDisabled}> 
                        로그인
                    </button>

                    <button
                    className="w-full bg-[pink] text-white py-3 rounded-md text-lg font-medium hover:bg-[hotpink] transition-colors cursor-pointer disabled:bg-gray-300"
                    type = {"button"}
                    onClick={handleGoogleLogin}>
                        구글 로그인
                    </button>

                    <div className="flex items-center justify-center gap-4">
                        <img src = {'vite.svg'} alt = 'Google Logo Image'/>
                        <span> 구글이미지 </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
