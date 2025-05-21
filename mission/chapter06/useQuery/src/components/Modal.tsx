import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    const ref = useRef<HTMLDivElement>(null);

    // ✏️ useRef 사용 시점
    // • 값이 바뀌어도 “렌더링을 트리거하지 않아야” 할 때
    // • 주로 DOM 요소나, 컴포넌트 생명주기에 걸쳐 유지할 mutable 값을 저장할 때

    // ✏️ useState 사용 시점
    // • 값이 바뀔 때마다 “화면을 다시 그려야” 할 때
    // • 변경된 값을 UI에 즉시 반영해야 할 때

    // 예시 비교: 텍스트 입력
    //
    // - useState  
    //   • input 값을 한 글자마다 상태로 관리하고  
    //     onChange 시마다 렌더링해 화면에 반영해야 할 때  
    //
    // - useRef  
    //   • “완료” 버튼을 눌렀을 때만 최종 입력값을 읽어 처리하고,  
    //     글자수가 바뀔 때마다 불필요하게 렌더링하고 싶지 않을 때  

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, onClose]);
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 z-40" />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                <div
                    ref={ref}
                    className="relative bg-gray-800 rounded-2xl w-full max-w-md p-6 space-y-6"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                    >
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}