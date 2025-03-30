import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface DarkContextType {
    isDark: boolean;
    setIsDark: Dispatch<SetStateAction<boolean>>;
}

// createContext 함수를 이용해, context 생성
export const DarkContext = createContext<DarkContextType | undefined>(undefined);

// context Provider로 감싸기
export const DarkProvider = ({children} : {children: React.ReactNode}) => {
    const [isDark, setIsDark] = useState<boolean>(false);

    return(
        <DarkContext.Provider value={{isDark, setIsDark}}>
            {children}
        </DarkContext.Provider>
    );
};

// context를 쉽게 가져오는 커스텀 훅
// useContext로 값 사용하기
export const useDark = (): DarkContextType => {
    const context = useContext(DarkContext);
    if(!context){
        throw new Error('useDark는 반드시 DarkProvider 내부에서 사용되어야 합니다.');
    }
    return context;
};