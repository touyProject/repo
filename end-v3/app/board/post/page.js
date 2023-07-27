'use client'

import React, { useState } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {

    const router = useRouter();

    const { data: session, status } = useSession();

    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [comment, setComment] = useState('');

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [COpen, setCOpen] = useState(false);
    const [SOpen, setSOpen] = useState(false);


    const handleSelectC = (value) => {
        setCategory(value);
        setCOpen(false);
    };

    const toggleCDropdown = () => {
        setCOpen(!COpen);
    }

    const handleSelectS = (value) => {
        setSubCategory(value);
    };


    const toggleSDropdown = () => {
        setSOpen(!SOpen);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            author: session.user.id,
            title: title,
            tag: tag,
            comment: comment,
            category: category,
            subCategory: subCategory
        };

        try {
            const response = await axios.post('/api/v1/posts', newPost);
            if (response.data.success) {
                alert('작성완료!');
                router.push(`/detail/${response.data._id}`);
            } else {
                alert('작성 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('포스팅 오류', error);
        }
    };

    return (status === "loading" ? (
        <div>Loading...</div>) : (
        <div className='flex m-4 items-center justify-center h-screen'>
            <form onSubmit={handleSubmit}>
                <div className='mb-10'>
                    <button id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        type="button"
                        onClick={toggleCDropdown}>
                        {category || "게시판"}
                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {COpen && <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <button onClick={() => handleSelectC('백엔드')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">백엔드</button>
                            </li>
                            <li>
                                <button onClick={() => handleSelectC('프론트엔드')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">프론트엔드</button>
                            </li>
                            <li>
                                <button onClick={() => handleSelectC('디자인')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">디자인</button>
                            </li>
                        </ul>
                    </div>
                    }
                    <button id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        type="button"
                        onClick={toggleSDropdown}>
                        {subCategory || "분류"}
                        <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {SOpen && <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">

                            <button onClick={() => handleSelectS('자유')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <li>
                                    자유
                                </li>
                            </button>

                            <li>
                                <button onClick={() => handleSelectS('질문')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">질문</button>
                            </li>
                        </ul>
                    </div>
                    }
                </div>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="title" className="sr-only">Your title</label>
                        <textarea id="title" rows="1"
                            className="resize-none mt-3 mb-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a title..."
                            required onChange={(e) => setTitle(e.target.value)}
                            value={title}></textarea>
                        <label htmlFor="tag" className="sr-only">Your tag</label>
                        <textarea id="tag" rows="1"
                            className="resize-none mt-3 mb-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a tag..."
                            required onChange={(e) => setTag(e.target.value)}
                            value={tag}></textarea>
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea id="comment" rows="25"
                            className="resize-none mt-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..."
                            required onChange={(e) => setComment(e.target.value)}
                            value={comment}></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            작성
                        </button>
                    </div>
                </div>
            </form>
        </div>
    ))
}

export default Page
