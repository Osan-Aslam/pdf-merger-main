import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientWrapper from './ClientWrapper';

const nunito = Nunito_Sans({ subsets: ["latin"] });

// Fetch API data
async function getApiData() {
  const res = await fetch("http://localhost:5089/api/page", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

// Helper to parse meta/link tags into JSX
function parseMetaTag(tag, index) {
  if (tag.startsWith("<meta")) {
    const attrs = [...tag.matchAll(/(\w+)=["']([^"']+)["']/g)];
    const props = Object.fromEntries(attrs.map(([_, key, val]) => [key, val]));
    return <meta key={index} {...props} />;
  } else if (tag.startsWith("<link")) {
    const attrs = [...tag.matchAll(/(\w+)=["']([^"']+)["']/g)];
    const props = Object.fromEntries(attrs.map(([_, key, val]) => [key, val]));
    return <link key={index} {...props} />;
  }
  return null; // skip unsupported tags
}

export default async function RootLayout({ children }) {
  const apiData = await getApiData();
  const metaList = apiData?.data?.metaList || [];

  // Extract <title>
  const titleTag = metaList.find(tag => tag.startsWith("<title>"));
  const pageTitle = titleTag
    ? titleTag.replace("<title>", "").replace("</title>", "")
    : "Default Title";

  const otherMetaTags = metaList
    .filter(tag => !tag.startsWith("<title>"))
    .map(parseMetaTag);

  return (
    <html lang="en">
      <head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {otherMetaTags}
      </head>
      <body className={nunito.className}>
        <ClientWrapper apiData={apiData}>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
