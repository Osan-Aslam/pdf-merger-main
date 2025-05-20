"use client";
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  const [rawHtml, setRawHtml] = useState('');
  const path = usePathname();
  const router = useRouter();
  
  //axios request to api
  useEffect(() => {
    const fetchHomePage = async () => {
      try {   
        const slug = path === "/" ? "home" : path.replace("/", "");
        const response = await axios.get(`http://localhost:5089/api/page/${slug}`,{
          headers: {
            "Accept": "application/json",
          }
        });
        const content = response.data?.data?.contentDict?.key_0 ?? '';
        const fixedHtml = content.replace(/\bclassname=/g, 'class=').replace(/{"\s*"}/g, ' ');
        setRawHtml(fixedHtml);
        console.log("Response Data for pages: ", response.data);
      } catch (error) {
        console.error("Error while fetching page: ", error);
      }
    }
    fetchHomePage();
  }, [path]);

  // useEffect(() => {
  //   if (typeof window === 'undefined') return;
  //   const handleClick = (e) => {
  //     // Find the closest anchor in case the click is on a child element
  //     const anchor = e.target.closest('a');
  //     if (!anchor) return;

  //     const href = anchor.getAttribute('href');

  //     // Only handle internal links
  //     if (href && href.startsWith('/') && !href.startsWith('//')) {
  //       e.preventDefault();
  //       router.push(href);
  //     }
  //   };

  //   const container = document.getElementById('article-content');
  //   container?.addEventListener('click', handleClick);

  //   return () => container?.removeEventListener('click', handleClick);
  // }, [router]);

  return (
    <div>
      <div className='mb-[40px] mt-[10px]'>
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>About</h1>
      </div>
      {rawHtml ? (
        <div id='article-content' dangerouslySetInnerHTML={{ __html: rawHtml}} />
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default page
