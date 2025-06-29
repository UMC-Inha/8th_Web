import { useEffect, useRef, useState } from "react";

export const WebSocketStatus = {
  CONNECTING: "CONNECTING",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  RECONNECTING: "RECONNECTING",
} as const;

export type WebSocketStatus =
  (typeof WebSocketStatus)[keyof typeof WebSocketStatus];

export interface WebSocketHook {
  lastMessage: string | null;
  status: WebSocketStatus;
  sendMessage: (message: string) => void;
}

export interface WebSocketOptions {
  maxReconnectAttempts?: number; // 최대 재연결 시도 횟수
  reconnectDelay?: (attempt: number) => number; // 시도 횟수 기반 딜레이 함수
  onOpen?: () => void; // 연결 성공 시 콜백
  onMessage?: (message: string) => void; // 메세지 수신 시 콜백
  onClose?: (event: CloseEvent) => void; // 연결 종료 시 콜백
  onError?: (error: Event) => void; // 오류 발생 시 콜백
}

export const useWebSocket = (
  url: string,
  {
    maxReconnectAttempts = 5,
    //기본: 지수 백오프 (최대 5초)
    reconnectDelay = (attempt) => Math.min(5000, Math.pow(2, attempt) * 1000),
    onOpen,
    onMessage,
    onClose,
    onError,
  }: WebSocketOptions = {}
): WebSocketHook => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<WebSocketStatus>(
    WebSocketStatus.CONNECTING
  ); // 현재 웹소켓 상태

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef<number>(0); // 재연결 시도 횟수

  // WebSocket 연결 및 이벤트 핸들러 설정
  const connectWebSocket = () => {
    setStatus(WebSocketStatus.CONNECTING);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    // WebSocket 공식문서에 다 있는거여!!
    // 연결 성공
    ws.onopen = () => {
      setStatus(WebSocketStatus.OPEN);
      reconnectAttempts.current = 0;
      onOpen?.(); // 사용자가 정의한 콜백 호출
    };

    // 메세지 수신
    ws.onmessage = (event) => {
      setLastMessage(event.data);
      onMessage?.(event.data); // 사용자가 정의한 콜백 호출
    };

    // 에러 발생
    ws.onerror = (error) => {
      onError?.(error);
    };

    // 연결 종료
    ws.onclose = (event) => {
      setStatus(WebSocketStatus.CLOSED);
      onClose?.(event);

      // 재연결 시도 조건 확인
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1; // 시도 횟수 증가
        setStatus(WebSocketStatus.RECONNECTING);
        // 재연결 예약
        setTimeout(connectWebSocket, reconnectDelay(reconnectAttempts.current));
      }
    };
  };

  // 메세지 전송 함수
  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message); // 연결이 오픈되어 있을 때만 전송
    } else {
      console.warn("WebSocket is not open. Cannot send message."); // 경고
    }
  };

  useEffect(() => {
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      connectWebSocket(); // 컴포넌트가 마운트될 때 WebSocket 연결
    }
    return () => {
      wsRef.current?.close(); // 언마둔트 시 연결 종료
    };
  }, [url]);

  return { lastMessage, status, sendMessage };
};
