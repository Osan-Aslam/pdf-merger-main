import React from 'react'
import parse, { domToReact } from 'html-react-parser'
import Link from 'next/link'

function Info({ viewModel }) {
  let rawContent = viewModel?.data?.contentDict?.key_0 ?? '';

  const options = {
    replace: (domNode) => {
      if (domNode.name === 'a' && domNode.attribs?.href) {
        const href = domNode.attribs.href
        return (
          <Link href={href}>
            {domToReact(domNode.children, options)}
          </Link>
        )
      }
    }
  }

  const parsedContent = parse(rawContent, options)

  return (
    <div className='container'>
      <div className='mt-5 text-center mb-3'>
        <h1>{viewModel.data.title}</h1>
      </div>
      {viewModel ? (
        <div className='mb-5' id='article-content'>
          {parsedContent}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}
export default Info
