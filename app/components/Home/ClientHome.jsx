"use client";
import { HomeComponent } from "./page";
import { useApi } from "../../context/ApiContext";

export default function ClientHome() {
	const { apiResponse, loading } = useApi();

	return (
		<>
			<HomeComponent apiResponse={apiResponse} />
		</>
	);
}
