'use client'

import { Switch } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useState } from "react"

export default function ReComment(props) {
    let [reply, setReply] = useState('')
    let [data, setData] = useState([])
    let [isTextareaVisible, setTextareaVisible] = useState(false)

    const fetchReplyComment = () => {
        fetch('/api/v1/recomment/list/' + props.parentId)
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

    useEffect(fetchReplyComment, []);

    return (
        <div style={{ marginLeft: '20px', padding: "3px" }} className="bg-white p-4 border rounded shadow-xs mt-2 mb-4">
            {
                data.map((v, i) => {
                    return (
                        <div key={i} className="mb-2 border-b-2">
                            <div>{v.author}</div>
                            <div>{v.comment}</div>
                        </div>
                    )
                })
            }
            <div className="flex items-center justify-start">
                <Switch
                    checked={isTextareaVisible}
                    onChange={setTextareaVisible}
                    className={`${isTextareaVisible ? 'bg-blue-600' : 'bg-gray-200'}
                    relative inline-flex items-center h-4 rounded-full w-8 transition-colors focus:outline-none`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${isTextareaVisible ? 'translate-x-4' : 'translate-x-1'}
                        inline-block w-3 h-3 transform bg-white rounded-full transition-transform`}
                    />
                </Switch>
            </div>
            {isTextareaVisible && (
                <div>
                    <div className="w-full mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                            댓글 작성
                        </label>
                        <textarea
                            id="comment"
                            placeholder="당신의 기발한 댓글을 남겨주세요!"
                            className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={reply}
                            onChange={(e) => { setReply(e.target.value) }}
                        ></textarea>
                    </div>
                    <button onClick={() => {
                        axios.post('/api/v1/recomment/new',
                            {
                                comment: reply,
                                reCommentAuthor: props._id,
                                parentCommentId: props.parentId
                            })
                            .then(fetchReplyComment)
                            .then(() => setReply(''))
                            .catch((error) => console.log(error));
                    }} className="bg-blue-500 text-white p-1 rounded m-3 right">등록</button>
                </div>
            )}
        </div >
    )
}
