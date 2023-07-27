'use client'
import { signIn } from 'next-auth/react'

export default function LoginBtn() {
    return (
        <button
            onClick={() => { signIn() }}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-8 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            로그인
        </button>
    )
}