import { useApi } from "../../context/ApiContext";
import { HomeComponent } from "./page";

export default function ClientHome() {
	const { apiResponse, loading } = useApi();

	return (
		<>
			<HomeComponent apiResponse={apiResponse} />
		</>
	);
}
