"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { fetchPageContent } from '../utils/fetchPageContent';
import placeholderImage from '../../public/placeholder-image.svg';
import Image from 'next/image';
import Link from 'next/link';

function Author() {
  const path = usePathname();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const slug = path === '/' ? 'home' : path.replace('/', '');
      try {
        const response = await fetchPageContent(slug);
        const authorList = response?.data?.authors || [];
        console.log(response);
        setAuthors(authorList);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error loading blog posts');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [path]);

  if (loading) return <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 z-50 flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
  </div>
  if (error) return <p>Error loading page content</p>;
  return (
    <div>
      <div className='mb-[40px] mt-[10px]'>
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>Authors</h1>
      </div>
      <div className='px-[50px] flex flex-wrap justify-center'>
        {
          authors.length === 0 ? (
            <p>No Author Found</p>
          ) : (
            authors.map((author, index) => (
              <div key={index} className="w-full lg:w-[30%] md:w-1/3 mb-4 me-4">
                <div className="bg-[#ededf4] rounded-md shadow p-4 hover:shadow-md transition duration-300">
                  <Link href={author.canonical} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <div className="w-full h-24 rounded-full overflow-hidden bg-gray-100">
                        <Image src={author?.asset?.url || placeholderImage} alt="Evelyn Lucas" width={40} height={40} priority className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="w-2/3">
                      <span className="text-sm text-gray-500">{new Date(author.createdDate).toLocaleDateString()}</span>
                      <p className="font-semibold text-lg leading-snug mt-1 mb-1">{author.title}</p>
                      <p className="text-gray-700 text-base leading-6 mt-1">
                        {author.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default Author
