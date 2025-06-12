import { ApiProvider } from "./context/ApiContext";
import ClientContent from "./Clientcontent";

export default function ClientWrapper({ children, apiData }) {
	return (
		<ApiProvider initialData={apiData}>
			<ClientContent>{children}</ClientContent>
		</ApiProvider>
	);
}
