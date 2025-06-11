import AllBlog from '../components/AllBlog/page';
import Blog from '../components/Blog/page';
import AllAuthor from '../components/AllAuthor/page';
import Author from '../components/Author/page';
import Info from '../components/Info/page';
import ContactUs from '../components/ContactUs/page';
import Pricing from '../components/Pricing/page';
import ToolRenderer from '../components/ToolRender/page';

const pageComponentMap: { [key: number]: any } = {
  3: AllBlog,
  4: Blog,
  5: AllAuthor,
  6: Author,
  7: Info,
  8: ContactUs,
  9: Pricing,
};

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const validSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  let pageData;

  try {
    const res = await fetch(`http://localhost:5089/api/page/${validSlug}`, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      throw new Error(`Failed to fetch page data: ${res.status} ${res.statusText}`);
    }

    if (!contentType.includes('application/json')) {
      const raw = await res.text();
      throw new Error(`Expected JSON, got: ${contentType}. Response:\n${raw}`);
    }

    pageData = await res.json();
  } catch (error: any) {
    return <div>Error: {error.message}</div>;
  }

  if (!pageData || !pageData.data) {
    return <div>No page data found for: {validSlug}</div>;
  }

  const pageType = pageData.data.pageType;

  if (pageType === 1 && pageData.data.tool?.name) {
    return (
      <ToolRenderer toolName={pageData.data.tool.name} viewModel={pageData} />
    );
  }

  const PageComponent = pageComponentMap[pageType];
  if (!PageComponent) {
    return <div>404 - Page Not Found</div>;
  }

  return <PageComponent viewModel={pageData} />;
}
