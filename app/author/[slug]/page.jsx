import placeholderImage from '../../../public/placeholder-image.svg';
import { fetchPageContent } from '@/app/utils/fetchPageContent';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default async function slug({params}) {
  const {slug} = params
  const response = await fetchPageContent(slug);
  const blogs = response?.data?.blogs || [];
  const author = response?.data?.author ?? (blogs.length > 0 ? blogs[0]?.author : null);
  return (
    <div>
      <div className="w-full my-2 pb-[20px] px-[200px]">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap text-sm text-gray-600 space-x-2">
            <li>
              <Link href="/" className="hover:underline text-blue-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href={response.data?.menuDict.authors_url} className="hover:underline text-blue-600">{response.data?.menuDict.Authors}</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-500" aria-current="page">
              {response?.data?.title}
            </li>
          </ol>
        </nav>
      </div>
      <div className="w-[70%] m-auto my-3 px-[10px]">
        {author ? (
          <div className="bg-[#ededf4] rounded-xl p-6">
            <div className="flex items-center mb-6">
              <Image src={placeholderImage} alt="placeholder-image" priority className="w-16 h-16 object-cover" />
              <div className="pl-4">
                <small className="text-sm text-gray-600">Our Team</small>
                <h2 className="text-xl font-semibold">{author?.title}</h2>
                <p className="text-sm text-gray-500">{author?.description}</p>
              </div>
            </div>
            <p className="mb-6 text-gray-700">
              {response.data?.contentDict.key_0}
            </p>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-5/12">
                <h3 className="text-lg font-semibold mb-2">Expertise</h3>
                <p className="text-gray-700">
                  {response?.data?.contentDict.Expertise}
                </p>
              </div>
              <div className="lg:w-7/12 lg:pl-6">
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>
                    {response?.data?.contentDict.Education}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>Author not found</div>
        )}
      </div>
      <div className='mb-[40px] mt-[20px]'>
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>Related Blogs</h1>
      </div>
      <div className='px-[50px] flex flex-wrap justify-center'>
        {
          blogs.length === 0 ? (
            <p>No Blogs Found</p>
          ) : (
            blogs.map((blog, index) => (
              <div key={index} className="w-full lg:w-1/3 my-3 px-[10px]">
                <div className="bg-[#ededf4] shadow-md rounded-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between pb-2">
                      <Link href={`/author${blog.author.canonical}`} className="flex items-center">
                        <Image src={blog.asset?.url || placeholderImage} width={40} height={40} alt="nancy-oliver" loading="lazy" className="w-10 h-10 object-cover rounded-full" />
                        <p className="mb-0 pl-3 text-sm font-medium">{blog.author.title}</p>
                      </Link>
                      <span className="text-xs text-gray-500">{new Date(blog.createdDate).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-lg font-semibold pt-2">
                      <Link href={`/blog${blog.canonical}`} className="hover:text-blue-600 transition line-clamp-1">
                        {blog.title}
                      </Link>
                    </h2>
                    <Link href={`/blog${blog.canonical}`} className="mt-2 text-sm text-gray-600 hover:text-gray-800 transition line-clamp-3">
                      {blog.description}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

