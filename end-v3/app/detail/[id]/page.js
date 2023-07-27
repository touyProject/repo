'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CommentComponent from './Comment'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const page = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const [postData, setPostData] = useState(null);

    const pathName = usePathname();
    const id = pathName.split('/')[2];

    useEffect(() => {
        async function getPost() {
            try {
                const response = await axios.get(`/api/v1/detail/${id}`);
                setPostData(response.data); // 받아온 데이터를 postData에 저장
            } catch (error) {
                console.error('오류 발생! 처음 페이지로 돌아갑니다.', error);
                router.push('/');
            }
        }

        if (id) {
            getPost(); // id가 있을 때만 getPost 함수 실행
        }
    }, [id]);

    if (!postData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-4 items-center justify-center h-screen'>
            <div className="bg-white p-4 border-solid border-neutral-900 rounded shadow-md mt-5 m-3 min-w-[70%] mx-auto">
                <h4 className="text-xl font-semibold mb-2 border-b-2">
                    <div className='m-3 ml-0'>{postData.title}</div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <div>
                            작성자 : {postData.author}
                            <div id='inlineBlock' className="inline-block mx-3 h-3 w-px bg-gray-400 align-middle" />
                            조회수 : {postData.views}
                        </div>
                        <div>
                            태그 : {postData.tag}
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        작성일자 : {new Date(postData.createdAt).toLocaleString()}
                    </div>
                </h4>
                <div className='m-5'>
                    <p className="mb-4 h-[50vh] overflow-y-auto">{postData.content}</p>
                </div>
                <div className='mx-6 mb-4 flex justify-between text-sm font-semibold'>
                    <div>
                        <Link href={`/api/v1/edit/${postData._id}`}>수정</Link>
                        <div id='inlineBlock' className="inline-block mx-3 h-3 w-px bg-gray-400 align-middle" />
                        <button onClick={() => { }}>삭제</button>
                    </div>
                </div>


                <div className='border-t-2'>
                    {session && session.user ? (
                        <CommentComponent _id={session.user.id} detailId={id} />
                    )
                        : (
                            <div className='text-center mt-6 mb-3'>로그인 후 댓글을 확인, 작성 할 수 있습니다.</div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default page;