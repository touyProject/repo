'use client'

import Link from 'next/link'
import RegisterBtn from './RegisterBtn'
import LoginBtn from './LoginBtn'
import { useSession } from 'next-auth/react'
import LogoutBtn from './LogoutBtn'

export const Navbar = () => {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Home</span>
                    </a>
                    <div className="flex md:order-2">
                        {
                            loading ? <div className='text-white'>Loading...</div>
                                : session
                                    ? <><div className='text-white'>{session.user.name}&nbsp;&nbsp;</div> <LogoutBtn /></>
                                    : <><LoginBtn /> <RegisterBtn /></>
                        }
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/board/backend" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">백엔드</Link>
                            </li>
                            <li>
                                <Link href="/board/frontend" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">프론트엔드</Link>
                            </li>
                            <li>
                                <Link href="/board/design" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">디자인</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
