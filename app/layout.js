"use client";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ApiProvider, useApi } from "./context/apiContext";

const nunito = Nunito_Sans({ subsets: ["latin"] });

function LayoutContent({ children }) {
  const { apiResponse, loading } = useApi();
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <>
          <Navbar apiResponse={apiResponse} />
          {children}
          <Footer apiResponse={apiResponse} />
        </>
      )}
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ApiProvider>
          <LayoutContent children={children} />
        </ApiProvider>
      </body>
    </html>
  );
}
