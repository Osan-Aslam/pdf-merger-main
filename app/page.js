"use client";
import Hero from "./home/Hero";
import Curved from "./home/Curved";
import HowWorks from "./home/HowWorks";
import Intro from "./home/Intro";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState();
  //axios request to api
  useEffect(() => {
    const fetchHomePage = async () => {
      try {   
        const response = await axios.get('http://localhost:5089/api/page',{
          headers: {
            "Accept": "application/json",
          }
        });
        setLoading(true);
        setApiResponse(response.data);
        console.log("Response Data: ", response.data);
      } catch (error) {
        console.error("Error while fetching page: ", error);
      } finally{
        setLoading(false);
      }
    }
    fetchHomePage();
  }, []);
  return (
    <main className="overflow-hidden">
      <Hero apiResponse={apiResponse}/>
      <Curved />
      <HowWorks apiResponse={apiResponse}/>
      <Intro  apiResponse={apiResponse}/>
    </main>
  );
}
