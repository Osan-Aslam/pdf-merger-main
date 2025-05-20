import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ apiResponse }) => {
  let rawHtml = apiResponse?.data.menuDict.googlelink?.replace(/classname=/g, "class=");
  const { title, description , menuDict = {}} = apiResponse?.data ?? {}; //destructuring
  const {about, aboutus_url, AboutUs, contactus_url, ContactUs, PrivacyPolicy_url, PrivacyPolicy, TermsandConditions_url, TermsandConditions, OurEditorialProcess_url, OurEditorialProcess, authors_url, Authors, resources, insights_url, insights, connectwithus} = menuDict;

  return (
    <div className="bg-[#333333] pt-[70px] pb-[30px] mt-[80px]">
      <div className="lg:px-[70px]  px-[20px] w-full   mx-auto">
        {apiResponse?.data && (
          <div className="flex lg:flex-row flex-col lg:gap-[0px] gap-[40px] justify-between border-b-[1px] border-[#DEDEDE] pb-[20px]">
            <div className="flex flex-col w-[215px] gap-[10px]">
              <h2 className="text-white text-[14px] w-[76px] border-b-[1px] border-[#DEDEDE] font-bold">
                {title || "Merge"}
              </h2>
              <p className="text-white text-[16px] font-medium leading-[26px]">
                {description || "Description"}
              </p>
            </div>
            <div className="flex flex-col w-[151px] gap-[10px]">
              <h2 className="text-white text-[14px] w-[39px] border-b-[1px] border-[#DEDEDE] font-bold">
                {menuDict.about}
              </h2>
              <Link href={menuDict.aboutus_url} className="text-white text-[16px] font-light leading-[26px] cursor-pointer">
                {menuDict.AboutUs}
              </Link>
              <Link href={menuDict.contactus_url} className="text-white text-[16px] font-light leading-[26px] cursor-pointer">
                {menuDict.ContactUs}
              </Link>
              <Link href={menuDict.PrivacyPolicy_url} className="text-white text-[16px] font-lightleading-[26px] cursor-pointer">
                {menuDict.PrivacyPolicy}
              </Link>
              <Link href={menuDict.TermsandConditions_url} className="text-white text-[16px] font-light leading-[26px] cursor-pointer">
                {menuDict.TermsandConditions}
              </Link>
              <Link href={menuDict.OurEditorialProcess_url} className="text-white text-[16px] font-lightleading-[26px] cursor-pointer">
                {menuDict.OurEditorialProcess}
              </Link>
              <Link href={menuDict.authors_url} className="text-white text-[16px] font-light leading-[26px] cursor-pointer">
                {menuDict.Authors}
              </Link>
            </div>
            <div className="flex flex-col w-[57px] gap-[10px]">
              <h2 className="text-white text-[14px] w-[67px] border-b-[1px] border-[#DEDEDE] font-bold">
                {menuDict.resources}
              </h2>
              <Link href={menuDict?.insights_url || "#"} className="text-white text-[16px] font-medium leading-[26px] cursor-pointer">
                {menuDict?.insights || "Insights"}
              </Link>
            </div>
            <div className="flex flex-col w-[268.94px] gap-[10px]">
              <h2 className="text-white text-[14px]  font-bold">
                {menuDict.connectwithus}
              </h2>
              <div className="flex flex-row gap-[8px]">
                <Image src="/fb.svg" alt="fb" height={44} width={44} className="cursor-pointer" />
                <Image src="/twitter.svg" alt="twitter" height={44} width={44} className="cursor-pointer" />
                <Image src="/insta.svg" alt="insta" height={44} width={44} className="cursor-pointer" />
                <Image src="/pinterest.svg" alt="pinterest" height={44} width={44} className="cursor-pointer" />
              </div>
              <h2 className="text-white text-[14px]  font-bold">
                {menuDict.connectwithus}
              </h2>
              {rawHtml ? (
                <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
              ) : (
                <p></p>
              )}
            </div>
          </div>
        )}
        <p className="text-[16px] font-medium text-white text-center pt-[30px] ">
          Copyright © 2024
        </p>
      </div>
    </div>
  );
};

export default Footer;
