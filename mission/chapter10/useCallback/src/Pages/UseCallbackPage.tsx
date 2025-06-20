import { useCallback, useState } from "react";
import CountButton from "../components/CountButton";
import TextInput from "../components/TextInput";

function heavyComputation() {
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += i;
    }
    return result;
}

const UseCallbackPage = () => {

    // useState의 initial 과정일 때,

    // case1. 함수 참조 방식
    // const [count, setCount] = useState(heavyComputation);

    // case2. 콜백 함수 방식
    // const [count, setCount] = useState(() => heavyComputation());

    // case3. 함수 호출 방식
    // const [count, setCount] = useState(heavyComputation());

    // case1,2의 경우 첫 렌더링할 때만 직접 계산이 이뤄지는 형태!
    // but, case3의 경우 렌더링이 될 때마다 매번 계산이 이뤄지는 형태!

    const [count, setCount] = useState(heavyComputation);

    const handleIncrease = (): void => {
        setCount((prev) => prev + 1);
    }

    const [cnt, setCnt] = useState<number>(0);
    const [text, setText] = useState<string>('');

    const handleIncreaseCount = useCallback((number: number) => {
        setCnt(cnt + number);
        // 빈 배열은 이 함수가 처음 한번만 만들어져야 한다.
        // 함수 내부에서 cnt 값은 0으로 기억함.
        // 따라서 두 번째 클릭을 해도, 0+10이 되어서 cnt 값이 변하지 않아요.
        // 첫 번째 클릭도 0 + 10
        // 두 번째 클릭도 0 + 10
    }, [cnt]);

    const handleText = useCallback((text: string) => {
        setText(text);
    }, [text]);

    return (
        <>
            <div>
                <h3>{count}</h3>
                <button onClick={handleIncrease}>증가</button>

                <h1>같이 배우는 리액트 useCallback편</h1>
                <h2>Count : {cnt}</h2>
                <CountButton onClick={handleIncreaseCount} />

                <h2>Text</h2>
                <div className='flex flex-col'>
                    <span>{text}</span>
                    <TextInput onChange={handleText} />
                </div>
            </div>
        </>
    )
}

export default UseCallbackPage