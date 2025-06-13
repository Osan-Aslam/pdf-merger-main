import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientWrapper from './ClientWrapper';

const nunito = Nunito_Sans({ subsets: ["latin"] });

// Fetch API data
async function getApiData() {
  try {
    const res = await fetch("http://localhost:5089/api/page", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API responded with status:", res.status);
      return { error: "Failed to fetch data. Please try again later." };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Unable to connect to the server. Please try again later." };
  }
}


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
  return null;
}

export default async function RootLayout({ children }) {
  const apiData = await getApiData();
  const metaList = apiData?.data?.metaList || [];

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