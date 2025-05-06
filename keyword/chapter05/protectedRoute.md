## Refresh Token 🍠

- XSS 공격 / CSRF 공격 🍠
    
    
    🍠 XSS 공격과 CSRF 공격에 대해 직접 정리해보세요!
    
    
    - XSS 공격 (Cross-Site Scripting)
        - 공격자가 게시글에 악의적인 코드를 올리면, 그 게시글을 보러 들어온 모든 사용자에게 그 악의적인 코드가 실행되면서 피해를 입게되는 공격기법
        - “웹 페이지에 악성 스크립트를 삽입”하여 사용자의 브라우저에서 실행되게 하는 공격
        - 이 취약점으로 해커가 사용자의 정보(쿠키, 세션 등)를 탈취하거나, 자동으로 비정상적인 기능을 수행하게 하거나 할 수 있다. 주로 다른 웹사이트와 정보를 교환하는 식으로 작동한다.
    - CSRF 공격 (Cross-Site Request Forgery)
        - 공격자가 일반 사용자의 권한 도용 후, 무방비 상태의 서버를 공격하는 기법
        - “로그인한 사용자의 권한을 이용”하여 웹사이트에 악성 요청을 보냄
        → 해커는 사용자의 권한을 이용하여 해당 사용자가 권한이 있는 일을 수행, 사용자의 의지와 무관하게 시행된다.


## Protected Route 니가 뭔데~🎶

### 실습 🍠

서버가 없으니, 아래와 같이 가상의 역할을 만들어 직접 구현해보세요!

```tsx
const role = 'ADMIN' as const;

// publicRoutes: 인증없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// protectedRoutes: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [{ path: "my", element: 
    role === 'ADMIN' ? <MyPage /> : <Navigate to="/login" replace /> }],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
```
