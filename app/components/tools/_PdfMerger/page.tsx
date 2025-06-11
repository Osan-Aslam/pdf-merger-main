"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocument, degrees } from "pdf-lib";
import addImage from '../../../../public/add.svg'
import rotateImage from '../../../../public/rotate.svg'
import rotatewImage from '../../../../public/rotatew.svg'
import rotatesecImage from '../../../../public/rotatesec.svg'
import rotatesecwImage from '../../../../public/rotatesecw.svg'
import delImage from '../../../../public/del.svg'
import delwImage from '../../../../public/delw.svg'
import doc2Image from '../../../../public/doc2.svg'
import VectorImage from '../../../../public/Vector.svg'
import prevImage from '../../../../public/prev.svg'
import redrotateImage from '../../../../public/redrotate.svg'
import reddeleteImage from '../../../../public/reddelete.svg'
import redrotatesecImage from '../../../../public/redrotatesec.svg'
import { Alert } from 'react-bootstrap';
interface PdfPreview {
	imageUrl: string;
	name: string;
	file: File;
	rotation: number;
}
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function MergePdfTool({ apiResponse }) {
	const fileInputRef = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [pdfPreviews, setPdfPreviews] = useState([]);
	const SelectRef = useRef([]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const [selectedPopupIndex, setSelectedPopupIndex] = useState(null);
	const [loading, setLoading] = useState(false);
	const [alertVisible, setAlertVisible] = useState(false);

	const openPopup = (index) => {
		setSelectedPopupIndex(index);
		setIsPopupVisible(true);
	};

	const closePopup = () => {
		setIsPopupVisible(false);
		setSelectedPopupIndex(null);
	};

	const rotateSinglePdf = (index) => {
		setPdfPreviews((prevPreviews) => {
			return prevPreviews.map((preview, i) => {
				if (i === index) {
					const newRotation = (preview.rotation + 90) % 360;
					return { ...preview, rotation: newRotation };
				}
				return preview;
			});
		});
	};

	const rotateSinglePdfAnti = (index) => {
		setPdfPreviews((prevPreviews) => {
			return prevPreviews.map((preview, i) => {
				if (i === index) {
					const newRotation = (preview.rotation - 90) % 360;
					return { ...preview, rotation: newRotation };
				}
				return preview;
			});
		});
	};

	const rotateAllPdfs = () => {
		setPdfPreviews((prevPreviews) =>
			prevPreviews.map((preview) => {
				const newRotation = (preview.rotation + 90) % 360;
				return { ...preview, rotation: newRotation };
			})
		);
	};

	const rotateAllPdfsAnti = () => {
		setPdfPreviews((prevPreviews) =>
			prevPreviews.map((preview) => {
				const newRotation = (preview.rotation - 90) % 360;
				return { ...preview, rotation: newRotation };
			})
		);
	};

	const handleClick = (index) => {
		setSelectedIndex(index);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				selectedIndex !== null &&
				SelectRef.current[selectedIndex] &&
				!SelectRef.current[selectedIndex].contains(event.target)
			) {
				setSelectedIndex(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [selectedIndex]);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	// const handleDragEnter = (event) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	setDragging(true);
	// };

	// const handleDragLeave = (event) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	setDragging(false);
	// };

	// const handleDragOver = (event) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// };

	// const handleDrop = (event) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	setDragging(false);
	// 	const droppedFiles = Array.from(event.dataTransfer.files);
	// 	if (droppedFiles.length > 0) {
	// 		handleFiles(droppedFiles);
	// 	}
	// };

	const deleteFiles = () => {
		setPdfPreviews([]);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const deleteSingle = (index) => {
		setPdfPreviews((prevPreviews) => {

			const updatePreviews = prevPreviews.filter((_, i) => i !== index)
			if (updatePreviews.length === 0 && fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			return updatePreviews;
		});
		closePopup();
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputFiles = Array.from(event.target.files || []);
		const maxSize = 20 * 1024 * 1024; // 20MB
		const hasLargeFile = inputFiles.some(file => file.size > maxSize);
		if (hasLargeFile) {
			setAlertVisible(true);
			event.target.value = ''; // reset input
			return;
		}
		if (inputFiles.length > 0) {
			setAlertVisible(false);
			setLoading(true);
			handleFiles(inputFiles);
		}
	};

	useEffect(() => {
		if (alertVisible) {
			const timeout = setTimeout(() => {
				setAlertVisible(false);
			}, 3000);

			return () => clearTimeout(timeout); // Clean up
		}
	}, [alertVisible]);
	
	const handleFiles = (newFiles) => {
		const pdfFiles = newFiles.filter((file) => file.type === "application/pdf");
		if (pdfFiles.length > 0) {
			generatePdfPreviews(pdfFiles);
		} else {
			setLoading(false);
		}
	};

	const generatePdfPreviews = async (files) => {
		setLoading(true);
		try {

			const allPreviews = [];
			for (const file of files) {
				const previewsForFile = await renderAllPages(file);
				allPreviews.push(...previewsForFile);
			}
			setPdfPreviews((prevPreviews) => [...prevPreviews, ...allPreviews]);
		} finally {
			setLoading(false);
		}
	};

	const renderAllPages = (file: File): Promise<PdfPreview[]> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = async (e) => {
				const arrayBuffer = e.target!.result as ArrayBuffer;
				const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

				const pages: PdfPreview[] = [];
				const numPages = pdf.numPages;

				for (let i = 1; i <= numPages; i++) {
					const page = await pdf.getPage(i);
					const scale = 3.0;
					const viewport = page.getViewport({ scale });

					const canvas = document.createElement("canvas");
					const context = canvas.getContext("2d")!;
					canvas.height = viewport.height;
					canvas.width = viewport.width;

					const renderContext = {
						canvasContext: context,
						viewport: viewport,
					};
					await page.render(renderContext).promise;

					const imageUrl = canvas.toDataURL();
					pages.push({
						imageUrl,
						name: `${file.name} - Page ${i}`,
						file,
						rotation: 0,
					});
				}

				resolve(pages);
			};

			reader.onerror = (error) => reject(error);
			reader.readAsArrayBuffer(file);
		});
	};

	const mergePdfs = async () => {
		const pdfDoc = await PDFDocument.create();
		const fileMap = new Map();

		for (const preview of pdfPreviews) {
			if (!fileMap.has(preview.file.name)) {
				const pdfBytes = await preview.file.arrayBuffer();
				const pdf = await PDFDocument.load(pdfBytes);
				fileMap.set(preview.file.name, pdf);
			}
		}

		for (const preview of pdfPreviews) {
			const pdf = fileMap.get(preview.file.name);
			const pageIndex = parseInt(preview.name.split(" - Page ")[1]) - 1;
			const [copiedPage] = await pdfDoc.copyPages(pdf, [pageIndex]);

			const rotationDegrees = preview.rotation || 0;
			copiedPage.setRotation(
				degrees((copiedPage.getRotation().angle + rotationDegrees) % 360)
			);

			pdfDoc.addPage(copiedPage);
		}

		const mergedPdfBytes = await pdfDoc.save();
		const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = "merged.pdf";
		link.click();
	};

	return (
		<>
			<div className='col-lg-5 mx-auto'>
				{alertVisible && (
					<Alert variant="danger" onClose={() => setAlertVisible(false)} dismissible>
						Your file exceed the 30MB limit.
					</Alert>
				)}
			</div>
			<div className="row">
				<div className="col-lg-8 mx-auto merge-tool p-3">
					<div className={`d-flex justify-content-between pb-2 ${pdfPreviews.length === 0 ? 'd-none' : ''}`}>
						<div className="d-flex align-items-start">
							<input ref={fileInputRef} type="file" className="second-input" multiple accept=".pdf" onChange={handleInputChange} />
							<button onClick={handleButtonClick} className="btn border-btn d-flex px-3 py-1">
								<Image src={addImage} alt="Logo" className='me-2' />
								Add More
							</button>
							<span className='ms-2 count mt-2'>{pdfPreviews.length} selected</span>
						</div>
						<div className="d-lg-flex">
							<button onClick={rotateAllPdfs} className="btn border-btn d-flex px-3 py-1 ">
								<Image src={rotateImage} alt="Logo" className='me-2' />
								Rotate All
							</button>
							<button onClick={rotateAllPdfsAnti} className="btn border-btn d-flex px-3 py-1 mx-lg-2 my-2 my-lg-0">
								<Image src={rotatesecImage} alt="Logo" className='me-2' />
								Rotate All
							</button>
							<button onClick={deleteFiles} className="btn border-btn d-flex px-3 py-1">
								<Image src={delImage} alt="Logo" className='me-2' />
								Delete All
							</button>
						</div>
					</div>
					<div className={`text-center col-lg-5 col-8 mx-auto position-relative load ${loading ? '' : 'd-none'}`}>
						<span>Your PDF is processing. Please Wait!</span>
						<div className="progress" role="progressbar" aria-label="Animated striped example">
							<div className="progress-bar progress-bar-striped progress-bar-animated w-100"></div>
						</div>
					</div>
					<div className={`pdf-preview d-flex py-4 ${pdfPreviews.length > 0 ? 'justify-content-start' : 'justify-content-center'} ${loading ? 'custom-loader-height' : ''}`}>
						<div className={`d-flex align-items-center flex-column ${dragging ? "bg-[#fff8f8]" : "bg-white"} ${pdfPreviews.length > 0 || loading ? "d-none" : ""}`}>
							<Image src={doc2Image} alt="Logo" className="mb-3" />
							<button className="btn upload-btn mb-2"
								onClick={handleButtonClick}>
								<Image src={VectorImage} alt="Logo" className="me-3" />
								{apiResponse?.data?.tool.contentDict.key_0 || "Upload PDF file"}
							</button>
							<p className="text-[16px] text-[#9A9A9A] font-semibold">
								{apiResponse?.data?.tool.contentDict.key_1 || "or drop PDFs here"}
							</p>
							<input ref={fileInputRef} type="file" className="input-file" multiple accept=".pdf" onChange={handleInputChange} />
						</div>
						{pdfPreviews.map((file, index) => (
							<div onClick={() => handleClick(index)}
								ref={(el) => { SelectRef.current[index] = el }}
								style={{
									backgroundColor:
										selectedIndex === index ? "#FFEAE9" : "#F6F6F6",
									borderColor:
										selectedIndex === index ? "#FE3323" : "#DEDEDE",
								}}
								key={index} className="pdf-display">
								<div className="pdf-icons">
									<Image src={prevImage} alt="Logo" height={24} width={24} onClick={() => openPopup(index)} />
									<Image src={redrotatesecImage} alt="Logo" height={24} width={24} onClick={() => rotateSinglePdf(index)} />
									<Image src={redrotateImage} alt="Logo" height={24} width={24} onClick={() => rotateSinglePdfAnti(index)} />
									<Image src={reddeleteImage} alt="Logo" height={24} width={24} onClick={() => deleteSingle(index)} />
								</div>
								<img src={file.imageUrl} alt="PDF Preview"
									style={{
										transform: `rotate(${file.rotation}deg)`,
										transition: "transform 0.3s ease",
									}} className="pdf-image" />
								<p className="count-pdf">
									{index + 1}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
			{pdfPreviews.length !== 0 && (
				<div className='d-flex justify-content-center mt-4'>
					<button onClick={mergePdfs} className="btn save-btn">Merge and Save</button>
				</div>
			)}
			{isPopupVisible && (
				<div className="popup-visible">
					<div className="position-relative w-100 h-100">
						<div className="popup-navbar d-flex justify-content-between align-items-center px-5">
							<div className="d-flex">
								<button onClick={() => rotateSinglePdf(selectedPopupIndex)} className="btn p-2">
									<Image src={rotatewImage} alt="Rotate" width={15} height={15} />
								</button>
								<button onClick={() => rotateSinglePdfAnti(selectedPopupIndex)} className="btn p-2 mx-3">
									<Image src={rotatesecwImage} alt="Rotate Counterclockwise" width={15} height={15} />
								</button>
								<button onClick={() => deleteSingle(selectedPopupIndex)} className="btn p-2">
									<Image src={delwImage} alt="Delete" width={15} height={15} />
								</button>
							</div>
							<button onClick={closePopup} className="btn p-2 text-white">
								Close
							</button>
						</div>
						<div className="d-flex justify-content-center align-items-center pdf-image-popup">
							<Image width={50} height={50} src={pdfPreviews[selectedPopupIndex].imageUrl} alt="Full PDF Preview"
								style={{
									transform: `rotate(${pdfPreviews[selectedPopupIndex].rotation}deg)`,
									transition: "transform 0.3s ease",
								}}
								className="pdf-popupImage" />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
