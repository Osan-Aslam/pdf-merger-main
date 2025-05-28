"use client";
import React, { useEffect, useState } from 'react'
import placeholderImage from '../../public/placeholder-image.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { fetchPageContent } from '../utils/fetchPageContent';
import Link from 'next/link';

function Insights() {
  const path = usePathname();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const slug = path === '/' ? 'home' : path.replace('/', '');
      try {
        const response = await fetchPageContent(slug);
        const blogList = response?.data?.blogs || [];
        setBlogs(blogList);
        setError(null);
      } catch (err) {
        setError('Error loading blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path]);
  if (loading) return <div className="w-full h-screen bg-black flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
  if (error) return <p>Error loading page content</p>;

  return (
    <>
      <div className='mb-[40px] mt-[10px]'>
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>Insights</h1>
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
                      <Link href="#" className="flex items-center">
                        <Image src={blog.asset?.url || placeholderImage} width={40} height={40} alt="nancy-oliver" loading="lazy" className="w-10 h-10 object-cover rounded-full" />
                        <p className="mb-0 pl-3 text-sm font-medium">{blog.author.title}</p>
                      </Link>
                      <span className="text-xs text-gray-500">{new Date(blog.createdDate).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-lg font-semibold pt-2">
                      <Link href={`blog${blog.canonical}`} className="hover:text-blue-600 transition line-clamp-1">
                        {blog.title}
                      </Link>
                    </h2>
                    <Link href={`blog${blog.canonical}`} className="mt-2 text-sm text-gray-600 hover:text-gray-800 transition line-clamp-3">
                      {blog.description}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </>
  )
}

export default Insights
