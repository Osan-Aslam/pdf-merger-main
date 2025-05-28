"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { fetchPageContent } from '../utils/fetchPageContent';

function Privacy() {
  const path = usePathname();
  const [rawHtml, setRawHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      const slug = path === '/' ? 'home' : path.replace('/', '');
      const { rawHtml, error } = await fetchPageContent(slug);
      setRawHtml(rawHtml);
      setError(error);
      setLoading(false);
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
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>Privacy</h1>
      </div>
      {rawHtml ? (
        <div id='article-content' dangerouslySetInnerHTML={{ __html: rawHtml }} />
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default Privacy
