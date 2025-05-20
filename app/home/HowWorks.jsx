import React from "react";
import Image from "next/image";

const HowWorks = ({ apiResponse }) => {
  const rawHtml = apiResponse?.data?.contentDict?.key_0?.replace(/classname=/g, 'class=');
  return (
    <div className="flex md:flex-row flex-col xl:mt-[40px] mt-[70px] justify-center  w-full lg:gap-[100px] gap-[20px] lg:h-[276px]  px-[20px]  ">
      {apiResponse && (
        <div className="sm:w-[365px] xs:w-[315px] h-[276px] flex flex-col md:pr-[0px] sm:pr-[10px] gap-[10px]">
          {rawHtml ? (
            <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
          ) : (
            <p>Loading content...</p>
          )}
        </div>
      )}
      <div className="lg:w-[420px] md:w-[370px] w-full h-[268px] bg-[#F6F6F6] rounded-[20px]  "></div>
    </div>
  );
};

export default HowWorks;
