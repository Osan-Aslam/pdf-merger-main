import ClientHome from "./components/Home/ClientHome";
import { ApiProvider } from "./context/ApiContext";

export default async function Home() {
  let initialData;

  try {
    const res = await fetch("http://localhost:5089/api/page", { cache: "no-store" });

    if (!res.ok) {
      console.error("API response error:", res.status);
      initialData = { error: "Failed to load data. Please try again later." };
    } else {
      initialData = await res.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
    initialData = { error: "Unable to fetch data. Please check your connection." };
  }


  return (
    <main className="overflow-hidden">
      <ApiProvider initialData={initialData}>
        <ClientHome />
      </ApiProvider>
    </main>
  );
}
