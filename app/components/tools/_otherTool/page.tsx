import React, { useState } from 'react'

function page() {
	const [input, setInput] = useState('');
	const [result, setResult] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setResult(`Processed: ${input}`);
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Simple Tool</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Enter text"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
					>
						Submit
					</button>
				</form>
				{result && (
					<div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
						{result}
					</div>
				)}
			</div>
		</div>
	)
}

export default page
