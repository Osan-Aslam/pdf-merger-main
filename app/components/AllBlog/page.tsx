import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import placeholderImage from "../../../public/placeholder-image.svg"

function AllBlog({ viewModel }) {  
  const Blogs = (viewModel?.data.blogs) ? viewModel.data.blogs : [];
  return (
    <div className='container'>
      <div className='mb-5 text-center'>
        <h1>{viewModel?.data.title}</h1>
      </div>
      <div className='row flex-wrap justify-content-center mb-5'>
        {
          viewModel.length === 0 ? (
            <p>No Blogs Found</p>
          ) : (
            Blogs.map((blog, index) => (
              <div key={index} className="col-lg-4 blogs my-lg-0 my-2">
                <div className="card p-4">
                    <div className="d-flex align-items-center justify-content-between pb-3">
                      <Link href={blog.author.canonical} className="d-flex align-items-center">
                        <Image src={blog.asset?.url || placeholderImage} width={40} height={40} alt="nancy-oliver" loading="lazy" className="img-fluid" />
                        <p className='mb-0 ms-2'>{blog.author.title}</p>
                      </Link>
                      <span>{new Date(blog.createdDate).toLocaleDateString()}</span>
                    </div>
                    <Link className='blog-title' href={blog.canonical}>
                      {blog.title}
                    </Link>
                    <Link className='blog-discription' href={blog.canonical}>
                      {blog.description}
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

export default AllBlog

