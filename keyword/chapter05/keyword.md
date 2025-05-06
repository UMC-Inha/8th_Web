- XSS 공격 / CSRF 공격 🍠

    - XSS 공격
        
        공격자가 웹사이트에 악성 스크립트(JavaScript 등)를 삽입해서
        
        그 웹사이트를 방문한 다른 사용자의 브라우저에서 악성 코드를 실행시키는 공격
        
    - CSRF 공격
        
        사용자가 로그인된 상태를 악용해서
        
        공격자가 원하지 않는 요청을 보내도록 만드는 공격

- Protected Route를 직접 구현해보세요 🍠

import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

const role = 'ADMIN';

interface ProtectedRouteProps {
  requiredRole: string;
}

function ProtectedRoute({ children, requiredRole }: PropsWithChildren<ProtectedRouteProps>) {
  if (role !== requiredRole) {
   
    alert('접근 권한이 없습니다.');
    return <Navigate to="/" replace />;
  }

  
  return <>{children}</>;
}

export default ProtectedRoute;
