"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
	const [apiResponse, setApiResponse] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await axios.get("http://localhost:5089/api/page", {
					headers: { "Accept": "application/json" },
				});
				setApiResponse(response.data);
				console.log("Response data: ", response.data);
			} catch (error) {
				console.error("API fetch error:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchApi();
	}, []);

	return (
		<ApiContext.Provider value={{ apiResponse, loading }}>
			{children}
		</ApiContext.Provider>
	);
};

export const useApi = () => useContext(ApiContext);
