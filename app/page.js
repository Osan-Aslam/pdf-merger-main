"use client";
import { HomeComponent } from "./components/Home/page";
import { useApi } from "./context/apiContext";

export default function Home() {
  const { apiResponse, loading } = useApi();
  console.log("Response: ", apiResponse);
  return (
    <main className="overflow-hidden">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HomeComponent apiResponse={apiResponse} />
      )}
    </main>
  );
}
