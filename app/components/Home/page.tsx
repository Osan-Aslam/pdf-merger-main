import MergePdfTool from '../tools/_PdfMerger/page';

export const HomeComponent = ({ apiResponse }) => {
  const cleanHtmlContent = (raw: unknown): string => {
    if (typeof raw !== 'string') return '';
    return raw.replace(/{"\s*"}/g, ' ');
  };
  const contentDict = apiResponse?.data?.contentDict ?? {};
  const cleanedContents: Record<string, string> = Object.entries(contentDict).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = cleanHtmlContent(value);
    } else {
      acc[key] = '';
    }
    return acc;
  }, {} as Record<string, string>);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center mb-3">
          <h1>{apiResponse?.data?.title}</h1>
          <p>{apiResponse?.data?.description}</p>
        </div>
      </div>
      <MergePdfTool apiResponse={apiResponse} />
      <div className="bg-custom-gradient mt-lg-3 d-none d-lg-block"></div>
      {apiResponse ? (
        <div className='row justify-content-between px-lg-5 p-4 my-lg-5 my-3 align-items-center' dangerouslySetInnerHTML={{ __html: cleanedContents.key_0 }}>
        </div>
      ) : (
        <p>Loading content...</p>
      )}
      <article className="mb-5 article-content">
        {apiResponse ? (
          <div className='row justify-content-between px-lg-5' dangerouslySetInnerHTML={{ __html: cleanedContents.key_1 }} />
        ) : (
          <p>Loading content...</p>
        )}
      </article>
    </div>

  );
};

export default HomeComponent;
