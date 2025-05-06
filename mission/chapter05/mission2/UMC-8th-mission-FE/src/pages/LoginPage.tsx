import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigate('/my'); // 로그인 성공 시 마이페이지 이동
    } catch (error) {
      console.error(error);
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="login-page">
      <h2>로그인</h2>
      <input
        name="email"
        type="email"
        value={email}
        onChange={onChange}
        className="login-input"
        placeholder="이메일을 입력하세요"
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={onChange}
        className="login-input"
        placeholder="비밀번호를 입력하세요"
      />
      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default LoginPage;
