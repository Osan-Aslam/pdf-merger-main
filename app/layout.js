"use client";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "./home/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./home/Footer";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  //axios request to api
  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const response = await axios.get('http://localhost:5089/api/page', {
          headers: {
            "Accept": "application/json",
          }
        });
        setLoading(true);
        setApiResponse(response.data);
        // console.log("Response Data: ", response.data);
      } catch (error) {
        console.error("Error while fetching page: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomePage();
  }, []);
  return (
    <html lang="en">
      <body className={nunito.className}>
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
      </body>
    </html>
  );
}
