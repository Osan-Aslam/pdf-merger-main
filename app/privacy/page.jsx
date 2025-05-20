"use client";
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
  const [apiResponse, setApiResponse] = useState(null);
    const path = usePathname();
  
    let rawHtml = apiResponse?.data?.contentDict?.key_1?.replace(/classname=/g, "class=").replace(/{"\s*"}/g, ' ');
  
    //axios request to api
    useEffect(() => {
      const fetchHomePage = async () => {
        try {
          const slug = path === "/" ? "home" : path.replace("/", "");
          const response = await axios.get(`http://localhost:5089/api/page/${slug}`, {
            headers: {
              "Accept": "application/json",
            }
          });
          setApiResponse(response.data);
          console.log("Response Data for pages: ", response.data);
        } catch (error) {
          console.error("Error while fetching page: ", error);
        }
      }
      fetchHomePage();
    }, []);
  return (
    <div>
      <div className='mb-[40px] mt-[10px]'>
        <h1 className='lg:text-[35px] text-[15px] font-extrabold text-center'>Privacy</h1>
      </div>
      {rawHtml ? (
        <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default page
