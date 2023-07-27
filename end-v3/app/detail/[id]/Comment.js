'use client'

import { useEffect, useState } from "react"
import ReComment from "./ReComment"
import axios from "axios"

export default function CommentComponent(props) {
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])
    let [loading, setLoading] = useState(true)

    const fetchComment = () => {
        axios.get(`/api/v1/comment/list/${props.detailId}`)
            .then((response) => {
                setData(response.data)
                setLoading(false)
            })
            .catch((error) => console.log(error));
    }

    useEffect(fetchComment, []);

    return (
        <div>
            <div className="m-3 bg-white p-4 border-solid border-zinc-900 rounded shadow-xl">
                <div className="font-bold text-lg mb-2 border-b-2">댓글</div>
                {
                    loading ?
                        <div>Loading...</div>
                        : data.length > 0 ?
                            data.map((v, i) => {
                                return (
                                    <div key={i} className="mb-2 border-b-2">
                                        <div className="ml-4">{v.author}</div>
                                        <div className="ml-8">{v.comment}</div>
                                        <ReComment _id={props._id} parentId={v._id} />
                                    </div>
                                )
                            })
                            : <div>댓글을 작성해보세요!</div>
                }
            </div >

            <div>
                <div className="w-full mt-6 ">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                        댓글 작성
                    </label>
                    <textarea
                        id="comment"
                        placeholder="당신의 기발한 댓글을 남겨주세요!"
                        className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={comment}
                        onChange={(e) => { setComment(e.target.value) }}
                    ></textarea>
                </div>
                <button onClick={() => {
                    console.log(comment)
                    axios.post('/api/v1/comment/new',
                        {
                            comment: comment,
                            commentAuthor: props._id,
                            parentId: props.detailId
                        })
                        .then(fetchComment)
                        .then(() => setComment(''))
                        .catch((error) => console.log(error));
                }} className="bg-blue-500 text-white p-1 rounded m-3 w-14">등록</button>
            </div>
        </div>
    )
}
