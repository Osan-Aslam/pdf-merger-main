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

  //axios request to api
  useEffect(() => {
    const fetchHomePage = async () => {
      try {   
        const response = await axios.get('http://localhost:5089/api/page',{
          headers: {
            "Accept": "application/json",
          }
        });
        setApiResponse(response.data);
        console.log("Response Data: ", response.data);
      } catch (error) {
        console.error("Error while fetching page: ", error);
      }
    }
    fetchHomePage();
  }, []);
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar apiResponse={apiResponse}/>
        {children}
        <Footer apiResponse={apiResponse}/>
      </body>
    </html>
  );
}
