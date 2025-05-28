"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import { PDFDocument, degrees } from "pdf-lib";
import addImage from '../../public/add.svg'
import docwImage from '../../public/docw.svg'
import rotateImage from '../../public/rotate.svg'
import rotatewImage from '../../public/rotatew.svg'
import rotatesecImage from '../../public/rotatesec.svg'
import rotatesecwImage from '../../public/rotatesecw.svg'
import delImage from '../../public/del.svg'
import delwImage from '../../public/delw.svg'
import doc2Image from '../../public/doc2.svg'
import VectorImage from '../../public/Vector.svg'
import prevImage from '../../public/prev.svg'
import redrotateImage from '../../public/redrotate.svg'
import reddeleteImage from '../../public/reddelete.svg'
import redrotatesecImage from '../../public/redrotatesec.svg'

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

const Hero = ({ apiResponse }) => {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [pdfPreviews, setPdfPreviews] = useState([]);
  const SelectRef = useRef([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPopupIndex, setSelectedPopupIndex] = useState(null);

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

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const deleteFiles = () => {
    setPdfPreviews([]);
  };

  const deleteSingle = (index) => {
    setPdfPreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    closePopup();
  };

  const handleInputChange = (event) => {
    const inputFiles = Array.from(event.target.files);
    if (inputFiles) {
      handleFiles(inputFiles);
    }
  };

  const handleFiles = (newFiles) => {
    const pdfFiles = newFiles.filter((file) => file.type === "application/pdf");
    if (pdfFiles.length > 0) {
      generatePdfPreviews(pdfFiles);
    }
  };

  const generatePdfPreviews = async (files) => {
    const allPreviews = [];
    for (const file of files) {
      const previewsForFile = await renderAllPages(file);
      allPreviews.push(...previewsForFile);
    }
    setPdfPreviews((prevPreviews) => [...prevPreviews, ...allPreviews]);
  };

  const renderAllPages = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        const pages = [];
        const numPages = pdf.numPages;

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 3.0;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
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
    <div className="flex flex-col justify-center items-center md:px-[80px]">
      <div className="lg:w-[700px]">
        <h1 className="text-[34px] font-extrabold text-center">
          <span className="text-red">{apiResponse?.data.title}</span>
        </h1>
        <p className="text-[#333333] leading-[24px] text-center text-[16px] font-[400px]">
          {apiResponse?.data?.description}
        </p>
      </div>
      <div className="flex flex-col gap-[8px] mt-[40px]">
        <div className="bg-white rounded-[20px] p-[12px] m-[10px] mt-[40px] shadow-custom-black z-100 md:w-[700px] w-[390px]">
          <div className={`flex flex-row md:gap-[0px] gap-[5px] justify-between pb-[10px] ${pdfPreviews.length === 0 ? 'hidden' : ''}`}>
            <div className="flex lg:flex-row flex-col items-center md:gap-[20px] gap-[10px]">
              <input ref={fileInputRef} type="file" className="hidden" multiple accept=".pdf" onChange={handleInputChange} />
              <button onClick={handleButtonClick} className="bg-[#F6F6F6] text-red hover:bg-red hover:text-white p-[12px] flex flex-row gap-[10px] h-[33px] w-[118px] text-[14px] justify-center items-center font-semibold border-[1px] border-red rounded-[6px] group">
                <Image src={addImage} alt="Logo" className="cursor-pointer group-hover:hidden h-[30] w-auto" />
                <Image src={docwImage} alt="Logo" className="cursor-pointer hidden group-hover:block h-[30] w-auto" />
                Add More
              </button>
              <p className="text-[12px] font-semibold text-[#9A9A9A]">
                {pdfPreviews.length} selected
              </p>
            </div>
            <div className="flex lg:flex-row flex-col items-center gap-[10px]">
              <button onClick={rotateAllPdfs} className="bg-white text-red hover:bg-red group hover:text-white p-[12px] flex flex-row gap-[10px] h-[33px] w-[117px] text-[14px] justify-center items-center font-semibold border-[1px] border-red rounded-[6px] ">
                <Image src={rotateImage} alt="Logo" className="cursor-pointer group-hover:hidden h-[30] w-auto" />
                <Image src={rotatewImage} alt="Logo" className="cursor-pointer hidden group-hover:block h-[30] w-auto" />
                Rotate All
              </button>
              <button onClick={rotateAllPdfsAnti} className="bg-white text-red hover:bg-red group hover:text-white p-[12px] flex flex-row gap-[10px] h-[33px] w-[117px] text-[14px] justify-center items-center font-semibold border-[1px] border-red rounded-[6px] ">
                <Image src={rotatesecImage} alt="Logo" className="cursor-pointer group-hover:hidden h-[30] w-auto" />
                <Image src={rotatesecwImage} alt="Logo" className="cursor-pointer hidden group-hover:block h-[30] w-auto" />
                Rotate All
              </button>
              <button onClick={deleteFiles} className="bg-white text-red hover:bg-red group hover:text-white p-[12px] flex flex-row gap-[10px] h-[33px] w-[117px] text-[14px] justify-center items-center font-semibold border-[1px] border-red rounded-[6px] ">
                <Image src={delImage} alt="Logo" className="cursor-pointer group-hover:hidden h-[30] w-auto" />
                <Image src={delwImage} alt="Logo" className="cursor-pointer hidden group-hover:block h-[30] w-auto" />
                Delete All
              </button>
            </div>
          </div>
          <div className={`h-[265px] p-[10px] flex gap-[12px] items-center overflow-auto shrink-0 border-[2px] rounded-[10px] border-[#DEDEDE] border-dashed ${pdfPreviews.length > 0 ? 'justify-start' : 'justify-center'}`}>
            <div className={`lg:w-[746px] relative lg:p-[0px] p-[10px] lg:h-[235px] flex flex-col gap-[12px] justify-center items-center
              ${dragging ? "bg-[#fff8f8]" : "bg-white"} ${pdfPreviews.length > 0 ? "hidden" : ""}`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
              <Image src={doc2Image} alt="Logo" className="cursor-pointer lg:w-[84px] w-[60px]" />
              <button className="bg-red text-white lg:text-[22px] text-[15px] flex flex-row gap-[10px] justify-center items-center font-bold lg:w-[312px] lg:h-[62px] h-[50px] lg:px-[56px] px-[30px] lg:py-[16px] py-[10px] rounded-[10px] transition-all duration-400 ease-in hover:shadow-[0px_0px_14px_rgba(254,51,35,0.8)] hover:lg:w-[340px] hover:lg:h-[70px] hover:lg:px-[70px] hover:lg:py-[20px]"
                onClick={handleButtonClick}>
                <Image src={VectorImage} alt="Logo" className="cursor-pointer h-[30] w-auto" />
                {apiResponse?.data?.tool.contentDict.key_0 || "Upload PDF file"}
              </button>
              <p className="text-[16px] text-[#9A9A9A] font-semibold">
                {apiResponse?.data?.tool.contentDict.key_1 || "or drop PDFs here"}
              </p>
              <input ref={fileInputRef} type="file" className="hidden" multiple accept=".pdf" onChange={handleInputChange} />
            </div>
            {pdfPreviews.map((file, index) => (
              <div onClick={() => handleClick(index)}
                ref={(el) => (SelectRef.current[index] = el)}
                style={{
                  backgroundColor:
                    selectedIndex === index ? "#FFEAE9" : "#F6F6F6",
                  borderColor:
                    selectedIndex === index ? "#FE3323" : "#DEDEDE",
                }}
                key={index} className="group border relative rounded-[10px] p-2 w-[160px] h-[210px] flex flex-col items-center justify-center shrink-0 transition-all duration-300 ease-in">
                <div className=" flex flex-row justify-center absolute top-[10px] gap-[4px] w-[114px] mb-[8px]  -mt-[0px]">
                  <Image src={prevImage} alt="Logo" height={24} width={24} onClick={() => openPopup(index)} className="cursor-pointer hidden group-hover:flex" />
                  <Image src={redrotatesecImage} alt="Logo" height={24} width={24} onClick={() => rotateSinglePdf(index)} className="cursor-pointer hidden group-hover:flex" />
                  <Image src={redrotateImage} alt="Logo" height={24} width={24} onClick={() => rotateSinglePdfAnti(index)} className="cursor-pointer hidden group-hover:flex" />
                  <Image src={reddeleteImage} alt="Logo" height={24} width={24} onClick={() => deleteSingle(index)} className="cursor-pointer hidden group-hover:flex" />
                </div>
                <img src={file.imageUrl} alt="PDF Preview"
                  style={{
                    transform: `rotate(${file.rotation}deg)`,
                    transition: "transform 0.3s ease",
                  }} className="w-[108px] h-[140px] mt-[32px]" />
                <div className="w-[27px] h-[15px] rounded-[34px] bg-red mt-[4px] flex justify-center items-center">
                  <p className="font-bold text-[13px] text-white">
                    {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {pdfPreviews.length !== 0 && (
        <button onClick={mergePdfs} className="bg-red align-center mt-[20px] mb-[10px]  text-white lg:text-[18px]  text-[18px] flex flex-row  justify-center items-center font-bold lg:w-[237px] lg:h-[49px] h-[40px] lg:px-[50px] px-[30px] lg:py-[12px] py-[10px] rounded-[10px] hover:shadow-[0px_0px_14px_rgba(254,51,35,0.8)]  ">
          Merge and Save
        </button>
      )}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="relative w-full h-full">
            <div className="bg-[#424242] w-full h-[60px] flex justify-between items-center px-[50px]">
              <div className="flex gap-[10px]">
                <button onClick={() => rotateSinglePdf(selectedPopupIndex)} className="text-white p-2  hover:text-white rounded-[6px]">
                  <Image src={rotatewImage} alt="Rotate" width={15} height={15} />
                </button>
                <button onClick={() => rotateSinglePdfAnti(selectedPopupIndex)} className="text-white p-2  hover:text-white rounded-[6px]">
                  <Image src={rotatesecwImage} alt="Rotate Counterclockwise" width={15} height={15} />
                </button>
                <button onClick={() => deleteSingle(selectedPopupIndex)} className="text-white p-2   rounded-[6px]">
                  <Image src={delwImage} alt="Delete" width={15} height={15} />
                </button>
              </div>
              <button onClick={closePopup} className="text-white p-2  hover:text-white rounded-[6px]">
                Close
              </button>
            </div>
            <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-[#000000] bg-opacity-80">
              <Image src={pdfPreviews[selectedPopupIndex].imageUrl} alt="Full PDF Preview"
                style={{
                  transform: `rotate(${pdfPreviews[selectedPopupIndex].rotation}deg)`,
                  transition: "transform 0.3s ease",
                }}
                className="w-[400px] h-[500px] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
