import Link from 'next/link'
import React from 'react'
import placeholderImage from "../../../public/placeholder-image.svg";
import Image from 'next/image'

function AllAuthor({ viewModel }) {
	const authors = Array.isArray(viewModel?.data.authors) ? viewModel.data.authors : [];
	// console.log("Auhtor :", authors);
	return (
		<div className='container'>
			<div className='mb-5 text-center'>
				<h1>{viewModel?.data.title}</h1>
			</div>
			<div className='row justify-content-center'>
				{
					authors.length === 0 ? (
						<p>No Blogs Found</p>
					) : (
						authors.map((author, index) => (
							<div key={index} className="col-lg-4 mb-3 authors">
								<div className="card px-4 py-3">
									<Link href={author.canonical} className="d-flex align-items-center ">
										<div>
											<Image src={placeholderImage} alt="Evelyn Lucas" width={40} height={40} priority className="img-fluid" />
										</div>
										<div className='ms-4'>
											<span className="text-gray">{new Date(author.createdDate).toLocaleDateString()}</span>
											<p className='mb-0'>{author.title}</p>
											<p>{author.description}</p>
										</div>
									</Link>
								</div>
							</div>
						))
					)
				}
			</div>
		</div>
	)
}

export default AllAuthor

