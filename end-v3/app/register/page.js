'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const emailRegex = /^[A-Za-z0-9]+@[A-Za-z0-9.]+\.+ac\.kr$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;

        if (!emailRegex.test(email)) {
            alert("이메일이 형식에 맞지 않습니다. 학생 이메일을 입력해주세요.");
            return;
        }

        if (!nicknameRegex.test(nickname)) {
            alert("별명은 3~10자 이내의 알파벳, 숫자, 한글만 가능합니다.");
            return;
        }

        if (!passwordRegex.test(password)) {
            alert("비밀번호는 알파벳, 숫자, 특수문자(@$!%*?&)를 포함한 8~16자 이내로 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 유효성 검사를 통과하였으므로, 데이터를 API에 전송한다.
        const payload = { email, password, confirmPassword, nickname };
        try {
            const response = await axios.post('/api/auth/signup', payload);
            if (response.status == 200) {
                alert('회원가입이 완료되었습니다. 메인 페이지로 이동합니다.');
                router.push('/');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.log(error);
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border-gray-900">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">회원가입</h1>

                <form className="mt-6"
                    onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            이메일 (학생용)
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="nickname"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            별명
                        </label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-2">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            회원가입!
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
