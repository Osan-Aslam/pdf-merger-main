"use client";
import placeholderImage from '../../public/placeholder-image.svg';
import { fetchPageContent } from '@/app/utils/fetchPageContent';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';

export default async function slug() {
  const params = useParams();
  console.log('params', params);
  let response;
  try {
    response = await fetchPageContent(params.slug);
    console.log("response :", response);

  } catch (error) {
    console.error(error);
    return <div>Error loading author details</div>;
  }

  const blogs = response?.data?.blogs || [];
  const author = response?.data?.author || blogs[0]?.author;

  console.log("Authors :", author);
  console.log("Blog :", blogs);

  if (!author) return <div>Author not found</div>;
  return (
    <div>
      <div class="w-[70%] m-auto my-3 px-[10px]">
        {author ? (
          <div class="bg-[#ededf4] rounded-xl p-6">
            <div class="flex items-center mb-6">
              <Image src={placeholderImage} alt="placeholder-image" loading="lazy" class="w-16 h-16 object-cover" />
              <div class="pl-4">
                <small class="text-sm text-gray-600">Our Team</small>
                <h2 class="text-xl font-semibold">{author.title}</h2>
                <p class="text-sm text-gray-500">{author.description}</p>
              </div>
            </div>
            <p class="mb-6 text-gray-700">
              Amanda Montell is a writer who knows a lot about how we use words. She studied how people talk and write in groups and how this affects our culture. She likes to write about why we talk the way we do and how it shapes our relationships. She explains complicated language ideas in a way that's easy to understand. Amanda's writing is fun and interesting, and she uses humor to help explain tricky concepts.
            </p>
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="lg:w-5/12">
                <h3 class="text-lg font-semibold mb-2">Expertise</h3>
                <p class="text-gray-700">
                  Language and how people use it Communication Understanding how words affect our society
                </p>
              </div>
              <div class="lg:w-7/12 lg:pl-6">
                <h3 class="text-lg font-semibold mb-2">Education</h3>
                <ul class="list-disc pl-5 text-gray-700">
                  <li>
                    Bachelor's degree in the study of language, from University of California, Los Angeles. Master's degree in studying how language works in groups, from Stanford University
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
              <div key={index} class="w-full lg:w-1/3 my-3 px-[10px]">
                <div className="bg-[#ededf4] shadow-md rounded-md overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between pb-2">
                      <a href="#" className="flex items-center">
                        <Image src={blog.asset?.url || placeholderImage} width={40} height={40} alt="nancy-oliver" loading="lazy" className="w-10 h-10 object-cover rounded-full" />
                        <p className="mb-0 pl-3 text-sm font-medium">{blog.author.title}</p>
                      </a>
                      <span className="text-xs text-gray-500">{new Date(blog.createdDate).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-lg font-semibold pt-2">
                      <a href={blog.canonical} className="hover:text-blue-600 transition line-clamp-1">
                        {blog.title}
                      </a>
                    </h2>
                    <a href="#" className="mt-2 text-sm text-gray-600 hover:text-gray-800 transition line-clamp-3">
                      {blog.description}
                    </a>
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

