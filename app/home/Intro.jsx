import React from "react";

const Intro = ({ apiResponse }) => {
  let rawHtml = apiResponse?.data?.contentDict?.key_1?.replace(/classname=/g, "class=");
  rawHtml = rawHtml?.replace(/{"\s*"}/g, ' ');
  return (
    <div className=" flex flex-col mx-auto lg:max-w-[890px] w-full gap-[40px]   lg:px-[0px] px-[20px] xl:mt-[0px] mt-[70px] ">
      {rawHtml ? (
        <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
};

export default Intro;
