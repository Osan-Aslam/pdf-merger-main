import React from 'react';

function ContactUs({ viewModel }) {
  let rawContent = viewModel?.data?.contentDict?.key_0 ?? '';
  return (
    <div className='container'>
      <div className='mb-5 text-center'>
        <h1>{viewModel?.data.title}</h1>
      </div>
      {rawContent ? (
        <div className='mb-4' dangerouslySetInnerHTML={{ __html: rawContent }} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}

export default ContactUs;
