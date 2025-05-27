
import { useEffect, useState } from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SettingsModal } from '../components/SettingsModal';
import { updateMyInfo } from '../apis/auth';

const MyPage = () => {
    const navigate = useNavigate();
    const { logout, name, setName, accessToken } = useAuth();
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getData = async () => {
        try {
            const response = await getMyInfo(accessToken || '');
            setData(response);

            console.log(accessToken);
        } catch (error) {
            alert('로그인 후 다시 실행해 주세요');
            navigate('/');
        }
        };

        getData();
    }, []);

    const handleNicknameChange = async (newName: string) => {
        const prevName = name;
        setName(newName);
        try {
            await updateMyInfo({ name: newName });
            alert('닉네임이 변경되었습니다!');
        }
        catch {
            setName(prevName || null);
            alert('변경 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-black text-white">
        <div className="flex flex-col gap-4 items-center">
            {data && (
            <>
                <h1 className="text-3xl">{name}님의 페이지입니다.</h1>

                <img src={data.data.avatar as string} alt="프로필 이미지" className="rounded-full w-32 h-32 object-cover" />
                <p>{data.data.email}</p>

                <button
                className="cursor-pointer bg-pink-500 rounded-sm p-3 hover:scale-90"
                onClick={logout}
                >
                로그아웃
                </button>

                <button
                className="cursor-pointer bg-gray-600 rounded-sm p-3 hover:scale-90"
                onClick={() => setShowModal(true)}
                >
                설정
                </button>

                {showModal && (
                <SettingsModal
                    onClose={() => setShowModal(false)}
                    initialName={name || data.data.name}
                    initialBio={data.data.bio || ''}
                    initialAvatar={data.data.avatar || ''}
                    onNameChange={handleNicknameChange} 
                />
                )}
            </>
            )}
        </div>
        </div>
    );
};

export default MyPage;
