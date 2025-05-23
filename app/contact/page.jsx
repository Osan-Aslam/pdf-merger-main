"use client";
import React, { useEffect, useState } from 'react'
import { fetchPageContent } from '../utils/fetchPageContent';
import { usePathname } from 'next/navigation';

function ContactUs() {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading page content</p>;

  return (
    <div className="page-type-7 px-4 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: rawHtml || 'No content available' }}
      />
    </div>
  )
}
export default ContactUs
