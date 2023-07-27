'use client'

import { Navbar } from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {

  let [backData, setBackData] = useState([])
  let [frontData, setFrontData] = useState([])
  let [designData, setDesignData] = useState([])

  const fetchList = () => {
    fetch(`/api/v1/home`)
      .then(r => r.json())
      .then((result) => {
        setBackData(result.backList)
        setFrontData(result.frontList)
        setDesignData(result.designList)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setData([])
      });
  }

  useEffect(fetchList, []);

  return (
    <SessionProvider>
      <div>
        <div className='flex flex-col m-4 items-center justify-center h-screen'>

          <Navbar />
          {/*서치 박스*/}
          <div className="w-full max-w-md mb-14">
            <form>
              <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
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
          {/*인기글 테이블*/}
          <div className='flex'>
            <div className="w-[400px] h-[450px] m-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900">백엔드 인기글</h5>
                <Link href="/board/backend" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 ">
                  {/* 반복되는 항목들에 대해서는 map() 함수를 사용하여 동적으로 생성할 수 있습니다 */}
                  {backData.map((item, index) => (
                    <li className="py-3 sm:py-4" key={index}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <Link href={`/detail/` + item._id} className="text-sm font-medium text-gray-900 truncate">{item.title}</Link>
                          <p className="text-sm text-gray-500 truncate ">{item.author}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">조회수:{item.views}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/*프론트 인기글*/}
            <div className="w-[400px] h-[450px] m-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900">프론트엔드 인기글</h5>
                <Link href="/board/frontend" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 ">
                  {/* 반복되는 항목들에 대해서는 map() 함수를 사용하여 동적으로 생성할 수 있습니다 */}
                  {frontData.map((item, index) => (
                    <li className="py-3 sm:py-4" key={index}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <Link href={`/detail/` + item._id} className="text-sm font-medium text-gray-900 truncate">{item.title}</Link>
                          <p className="text-sm text-gray-500 truncate ">{item.author}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">조회수:{item.views}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/*디자인 인기글*/}
            <div className="w-[400px] h-[450px] m-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900">디자인 인기글</h5>
                <Link href="/board/design" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                  View all
                </Link>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 ">
                  {/* 반복되는 항목들에 대해서는 map() 함수를 사용하여 동적으로 생성할 수 있습니다 */}
                  {designData.map((item, index) => (
                    <li className="py-3 sm:py-4" key={index}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <Link href={`/detail/` + item._id} className="text-sm font-medium text-gray-900 truncate">{item.title}</Link>
                          <p className="text-sm text-gray-500 truncate ">{item.author}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">조회수:{item.views}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
