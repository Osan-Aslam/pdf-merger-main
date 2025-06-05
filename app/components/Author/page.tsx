import Link from 'next/link'
import React from 'react'
import placeholderImage from '../../../public/placeholder-image.svg'
import Image from 'next/image';

function Author({ viewModel }) {
  const blogs = Array.isArray(viewModel?.data.blogs) ? viewModel.data.blogs : [];
  return (
    <div className='container'>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-3">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href={viewModel.data?.menuDict.authors_url}>{viewModel.data?.menuDict.Authors}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{viewModel?.data?.title}</li>
        </ol>
      </nav>
      <div className="row">
        {viewModel ? (
          <div className="col-lg-9 rounded-3 mx-auto bg-light p-4">
            <div className="d-flex align-items-center mb-3">
              <Image src={placeholderImage} alt="placeholder-image" priority className="authorImage" />
              <div className="ps-3">
                <small>Our Team</small>
                <h3 className='mb-0'>{viewModel?.data.title}</h3>
                <p>{viewModel?.data.description}</p>
              </div>
            </div>
            <p>
              {viewModel.data?.contentDict.key_0}
            </p>
            <div className="row flex-lg-row">
              <div className="col-lg-6">
                <h3>Expertise</h3>
                <p>
                  {viewModel?.data?.contentDict.Expertise}
                </p>
              </div>
              <div className="col-lg-6">
                <h3>Education</h3>
                <ul className="ps-4">
                  <li>
                    {viewModel?.data?.contentDict.Education}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>Author not found</div>
        )}
      </div>
      <div className='my-5 text-center'>
        <h1>Related Blogs</h1>
      </div>
      <div className='row justify-content-center mb-4'>
        {
          blogs.length === 0 ? (
            <p>No Blogs Found</p>
          ) : (
            blogs.map((blog, index) => (
              <div key={index} className="col-lg-4 blogs">
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

export default Author
