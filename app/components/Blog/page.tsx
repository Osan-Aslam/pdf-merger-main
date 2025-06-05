
import Link from 'next/link'
import React from 'react'

function Blog({ viewModel }) {
  let rawContent = viewModel?.data?.contentDict?.key_0 ?? '';
  const cleanedContent = rawContent.replace(/{"\s*"}/g, ' ');
  return (
    <>
      <div className='container'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-3">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-item"><Link href={viewModel.data?.menuDict.insights_url}>{viewModel.data?.menuDict.insights}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{viewModel?.data?.title}</li>
          </ol>
        </nav>
        <article dangerouslySetInnerHTML={{ __html: cleanedContent }}>
        </article>
      </div>
    </>
  )
}

export default Blog

