import axios from 'axios';

export async function fetchPageContent(slug) {
	try {
		const response = await axios.get(`http://localhost:5089/api/page/${slug}`, {
			headers: {
				Accept: 'application/json',
			},
		});
		const contentDict = response.data?.data?.contentDict ?? {};
		const firstKey = Object.keys(contentDict)[0];
		const content = contentDict[firstKey] ?? '';

		const fixedHtml = content
			.replace(/\bclassname=/g, 'class=')
			.replace(/{"\s*"}/g, ' ');

		return {
			rawHtml: fixedHtml,
			error: null,
			data: response.data?.data || {},
		};
	} catch (error) {
		console.error('Error fetching page content:', error);
		return { rawHtml: '', error };
	}
}
