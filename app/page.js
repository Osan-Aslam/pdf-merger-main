import ClientHome from "./components/Home/ClientHome";
import { ApiProvider } from "./context/ApiContext";

export default async function Home() {
  const res = await fetch("http://localhost:5089/api/page", { cache: "no-store" });
  const initialData = await res.json();

  return (
    <main className="overflow-hidden">
      <ApiProvider initialData={initialData}>
        <ClientHome />
      </ApiProvider>
    </main>
  );
}
