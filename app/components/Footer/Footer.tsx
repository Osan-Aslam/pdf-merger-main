import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer({apiResponse}) {
  const { title, description, menuDict = {} } = apiResponse?.data ?? {};
  const { about, aboutus_url, AboutUs, contactus_url, ContactUs, PrivacyPolicy_url, PrivacyPolicy, TermsandConditions_url, TermsandConditions, OurEditorialProcess_url, OurEditorialProcess, authors_url, Authors, resources, insights_url, insights, connectwithus } = menuDict;
  return (
    <>
      <div className="container-fluid footers">
        <div className="container py-5 p-2 pb-lg-0">
          {apiResponse?.data && (
            <div className="row justify-content-between bord pb-lg-0 pb-4">
              <div className="col-lg-2 col-6">
                <h5>{title || "Merge"}</h5>
                <p>{description || "Description"}</p>
              </div>
              <div className="col-lg-3 col-6 ps-lg-5">
                <h5>{menuDict.about}</h5>
                <ul>
                  <li><Link href={menuDict.aboutus_url}>{menuDict.AboutUs}</Link></li>
                  <li><Link href={menuDict.contactus_url}>{menuDict.ContactUs}</Link></li>
                  <li><Link href={menuDict.PrivacyPolicy_url}>{menuDict.PrivacyPolicy}</Link></li>
                  <li><Link href={menuDict.TermsandConditions_url}>{menuDict.TermsandConditions}</Link></li>
                  <li><Link href={menuDict.OurEditorialProcess_url}>{menuDict.OurEditorialProcess}</Link></li>
                  <li><Link href={menuDict.authors_url}>{menuDict.Authors}</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 col-4">
                <h5>{menuDict.resources}</h5>
                <ul>
                  <li><Link href={menuDict?.insights_url || "#"}>{menuDict?.insights || "Insights"}</Link></li>
                </ul>
              </div>
              <div className="col-lg-3 col-8">
                <h5>{menuDict.connectwithus}</h5>
                <div className="d-flex justify-content-between col-lg-9 mb-2">
                  <Link href="#">
                    <Image src="/fb.svg" alt="fb" height={44} width={44}/>
                  </Link>
                  <Link href="#">
                    <Image src="/twitter.svg" alt="twitter" height={44} width={44}/>
                  </Link>
                  <Link href="#">
                    <Image src="/insta.svg" alt="insta" height={44} width={44}/>
                  </Link>
                  <Link href="#">
                    <Image src="/pinterest.svg" alt="pinterest" height={44} width={44}/>
                  </Link>
                </div>
                <h5>{menuDict.connectwithus}</h5>
                <div className='d-flex justify-content-between pe-3'>
                  <Link href="#">
                    <Image src={'/appstore.svg'} alt='appstore' width={120} height={50}></Image>
                  </Link>
                  <Link href="#">
                    <Image src={'/google-play.svg'} alt='googlePlay' width={120} height={50}></Image>
                  </Link>
                </div>
              </div>
            </div>
          )}
          <p className="text-center pt-5 pb-4 mb-0">
            Copyright © 2024
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
