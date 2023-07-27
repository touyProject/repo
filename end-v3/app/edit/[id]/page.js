import React from 'react'

const page = () => {
    // DB에 post id 에 따른 GET 요청을 받아와야 함.
    // 그리고 그 요청을 받아와서 title, tag, comment를 POST 요청을 보내야 함.
    // detail/[id]에서 로그인한 유저의 id와 post의 user_id가 일치하는지 확인해야 함.
    // 각 label에 default value로 DB에서 받아온 값을 넣어야 함.

    return (
        <div className='flex m-4 items-center justify-center h-screen'>
            <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="title" className="sr-only">Your title</label>
                        <textarea id="title" rows="1" className="resize-none mt-3 mb-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" defaultValue="" required></textarea>
                        <label for="tag" className="sr-only">Your tag</label>
                        <textarea id="tag" rows="1" className="resize-none mt-3 mb-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" defaultValue="" required></textarea>
                        <label for="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="25" className="resize-none mt-3 w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" defaultValue="" required></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Edit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default page