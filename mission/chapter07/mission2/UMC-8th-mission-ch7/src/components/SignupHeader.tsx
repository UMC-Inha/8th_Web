import { IoChevronBack } from "react-icons/io5";

interface Props {
  onBack?: () => void;
}

const SignupHeader = ({ onBack }: Props) => {
  return (
    <div className="flex items-center text-white gap-2 mb-6">
      {onBack && (
        <button onClick={onBack}>
          <IoChevronBack size={20} />
        </button>
      )}
      <h2 className="text-lg font-semibold">회원가입</h2>
    </div>
  );
};

export default SignupHeader;
