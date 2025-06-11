"use client";
import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children, initialData }) => {
	const [apiResponse] = useState(initialData);
	const loading = false;

	return (
		<ApiContext.Provider value={{ apiResponse, loading }}>
			{children}
		</ApiContext.Provider>
	);
};

export const useApi = () => useContext(ApiContext);
