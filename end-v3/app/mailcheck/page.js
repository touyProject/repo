'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MailCheck() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 5000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        메일이 전송되었습니다.
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        메일함을 확인해주세요.
                    </p>
                </div>
            </div>
        </div>
    );
}
