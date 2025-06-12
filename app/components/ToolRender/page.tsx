'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

export default function ToolRenderer({ toolName, viewModel }: { toolName: string, viewModel: any }) {
	let ToolComponent;
	try {
		ToolComponent = dynamic(() => import(`../tools/${toolName}/page`), {
			ssr: false,
		});
	} catch (e) {
		return <div>Failed to load tool: {toolName}</div>;
	}
	return (
		<Suspense fallback={<div>Loading tool...</div>}>
			<ToolComponent viewModel={viewModel} />
		</Suspense>
	);
}
