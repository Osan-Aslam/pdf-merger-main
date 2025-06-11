'use client';
import { useApi } from "./context/ApiContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

export default function ClientContent({ children }) {
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
