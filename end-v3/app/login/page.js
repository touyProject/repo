'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        axios.post('/user', {
            id: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        const data = await response.json();

    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     axios.post('/user', {
    //         id: email,
    //         password: password
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //             // jwt 토큰을 쿠키에 저장
    //             // 실제 토큰이 어디에 위치하고 있는지에 따라 response.data 또는 다른 경로를 사용할 수 있습니다.
    //             Cookies.set('auth', response.data);
    //             router.push('/main');
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden border-gray-900">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">로그인</h1>

                <form className="mt-6" onSubmit={handleLogin}>
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
                    <br />
                    <div className="mt-2">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-center text-gray-700">
                    아직도 계정이 없다구요?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        회원가입 ㄱㄱ
                    </Link>
                </p>
            </div>
        </div>
    );
}