import { fetchPageContent } from '@/app/utils/fetchPageContent';
import Link from 'next/link';
import React from 'react'

export default async function Blog({ params }) {
	const { slug } = params;
	const response = await fetchPageContent(slug);
	const contentHtml = response.data.contentDict.key_0 ?? '<p>No content</p>';
	const sanitized = contentHtml.replace(/classname=/g, 'class=').replace(/{"\s*"}/g, ' ');
	return (
		<>
			<div className='mb-10 justify-center content-section px-[100px]'>
				<div className="w-full my-2 pb-[20px]">
					<nav aria-label="breadcrumb">
						<ol className="flex flex-wrap text-sm text-gray-600 space-x-2">
							<li>
								<Link href="/" className="hover:underline text-blue-600">Home</Link>
								<span className="mx-2">/</span>
							</li>
							<li>
								<Link href={response.data?.menuDict.insights_url} className="hover:underline text-blue-600">{response.data?.menuDict.insights}</Link>
								<span className="mx-2">/</span>
							</li>
							<li className="text-gray-500" aria-current="page">
								{response?.data?.title}
							</li>
						</ol>
					</nav>
				</div>
				<div dangerouslySetInnerHTML={{ __html: sanitized }}>
				</div>
			</div>
		</>
	)
}