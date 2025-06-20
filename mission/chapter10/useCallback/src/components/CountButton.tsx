import { memo } from 'react'

interface ICountButton {
    onClick: (count: number) => void;
}

const CountButton = ({ onClick }: ICountButton) => {
    console.log('CountButton rendered');

    return (
        <button className='border p-2 rounded-lg' onClick={() => onClick(10)}>
            카운트 증가
        </button>
    )
}

export default memo(CountButton);
// Props에 전달된 값이 동일하다면, 해당 컴포넌트는 리렌더링이 되지 않음

// 주의 사항
// 1. 의존성 배열을 신중하게 설정
// - 만약 cnt를 넣지 않았으면 제대로 업데이트가 되지 않음
// - 너무 많은 변수를 넣게 되면, 최적화 효과가 사라짐.

// 2. useCallback TradeOff
// - useCallback 함수는 메모리에 저장되기 떄문에, 메모리 사용량이 늘게 된다.
// - 정말 필요할 때만 사용하기.