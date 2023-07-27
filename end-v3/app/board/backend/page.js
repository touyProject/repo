'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [currentPage, setCurrentPage] = useState(1);

    let [data, setData] = useState([])

    const fetchList = () => {
        fetch(`/api/v1/list/backend/all`)
            .then(r => r.json())
            .then((result) => {
                if (Array.isArray(result)) {
                    setData(result)
                } else {
                    console.error('Error: Expected array but received', result);
                    setData([])
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([])
            });
    }


    useEffect(fetchList, []);


    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleClickPrev = () => {
        setCurrentPage(currentPage - 1);
    };

    return (

        <div className='flex flex-col m-4 items-center justify-center h-screen'>
            <div><p className='text-6xl text-gray-900 mb-4'>백엔드 전체게시판</p></div>
            {/*서치 박스*/}
            <div className="w-full max-w-md flex justify-between items-start">
                <form className="flex-grow">
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="지금 바로 검색!"
                            required />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            검색
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex mt-4 justify-between text-sm text-gray-800">
                <div>
                    <Link href="/board/backend">전체</Link>
                    <div id='inlineBlock' className="inline-block mx-3 h-3 w-px bg-gray-400 align-middle" />
                    <Link href="/board/backend/free">자유</Link>
                    <div id='inlineBlock' className="inline-block mx-3 h-3 w-px bg-gray-400 align-middle" />
                    <Link href="/board/backend/question">질문</Link>
                    <div id='inlineBlock' className="inline-block mx-3 h-3 w-px bg-gray-400 align-middle" />
                    <Link href="/board/post">글 작성</Link>
                </div>
            </div>
            {/*게시글 테이블*/}
            <div className="w-full max-w-6xl mt-6 min-w-[70%]">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="mb-6 table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400   min-h-[70%]">
                        <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    작성자
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    제목
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    조회수
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    태그
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-300 text-gray-900 ">
                                        <th scope="row" className="px-4 py-4 font-medium whitespace-nowrap">
                                            {item.author}
                                        </th>
                                        <td className="px-6 py-4">
                                            <Link href={`/detail/${item._id}`}>{item.title}</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.views}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.tag}
                                        </td>
                                    </tr>
                                ))
                            }
                            {/* 여기에 빈 row*/}
                            {[...Array(itemsPerPage - data.length)].map((item, index) => (
                                <tr key={index + data.length} className="border-b border-white text-gray-900 ">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        &nbsp;
                                    </th>
                                    <td className="px-6 py-4">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 py-4">
                                        &nbsp;
                                    </td>
                                    <td className="px-6 py-4">
                                        &nbsp;
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div class="flex flex-col items-center">
                        <span class="text-sm ">
                            <span class="font-semibold">{data.length}</span>개의 게시글 중<span class="font-semibold"> {(currentPage - 1) * itemsPerPage + 1}</span> - <span class="font-semibold">{currentPage * itemsPerPage}</span> 개
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0 mb-4">
                            <button onClick={handleClickPrev} disabled={currentPage === 1} class={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}>
                                <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                이전
                            </button>
                            <button onClick={handleClickNext} disabled={currentPage === totalPages} class={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}>
                                다음
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

