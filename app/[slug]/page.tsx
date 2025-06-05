'use client';
import React, { useEffect, useState, Suspense } from 'react';
import AllBlog from '../components/AllBlog/page';
import Blog from '../components/Blog/page';
import AllAuthor from '../components/AllAuthor/page';
import Author from '../components/Author/page';
import Info from '../components/Info/page';
import ContactUs from '../components/ContactUs/page';
import Pricing from '../components/Pricing/page';
import { useParams } from 'next/navigation';
import axios from 'axios';
import dynamic from 'next/dynamic';

const pageComponentMap = {
  3: AllBlog,
  4: Blog,
  5: AllAuthor,
  6: Author,
  7: Info,
  8: ContactUs,
  9: Pricing,
};

const SlugPage = () => {
  const { slug } = useParams();
  const validSlug = Array.isArray(slug) ? slug[0] : slug;
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [DynamicTool, setDynamicTool] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5089/api/page/${validSlug}`, {
          headers: { "Accept": "application/json" }
        });
        const data = response.data;
        setPageData(data);

        if (data.data?.pageType === 1 && data.data?.tool?.name) {
          const toolName = data.data.tool.name;
          console.log("toolName :", toolName);
          try {
            const ToolComponent = dynamic(() =>
              import(`../components/tools/${toolName}/page`)
            );
            setDynamicTool(() => ToolComponent);
          } catch (e) {
            console.error(`Failed to dynamically import tool: ${toolName}`, e);
          }
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (validSlug) fetchData();
  }, [validSlug]);

  if (loading) return <div className='loading-overlay d-flex justify-content-center align-items-center'>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!pageData) return <div>No page data</div>;

  const pageType = pageData.data?.pageType;

  // Render tool dynamically
  if (pageType === 1 && DynamicTool) {
    const ToolComponent = DynamicTool;
    return (
      <Suspense fallback={<div>Loading tool...</div>}>
        <ToolComponent viewModel={pageData} />
      </Suspense>
    );
  }

  // Render regular static pages
  const PageComponent = pageComponentMap[pageType];
  if (!PageComponent) return <div>404 - Page Not Found</div>;

  return <PageComponent viewModel={pageData} />;
};

export default SlugPage;
