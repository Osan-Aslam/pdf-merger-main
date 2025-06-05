import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar({ apiResponse }) {
  return (
    <>
      <nav className="navbar">
        <div className="container py-4">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={40} priority className="cursor-pointer" />
          </Link>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='d-lg-block d-none'>
            <ul className="navbar-nav justify-content-end flex-row align-items-center">
              <li className="nav-item">
                <Link href={apiResponse?.data.menuDict?.insights_url || "#"} className="nav-link">{apiResponse?.data.menuDict?.insights || "insights"}</Link>
              </li>
              <li className="nav-item">
                <Link href={apiResponse?.data.menuDict.aboutus_url || "#"} className="nav-link">{apiResponse?.data.menuDict?.AboutUs || "About Us"}</Link>
              </li>
              <button className="btn nav-item login-btn">
                <Link href='#' className='nav-link text-white'>Login</Link>
              </button>
            </ul>
          </div>
          <div className="offcanvas offcanvas-end" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href={apiResponse?.data.menuDict?.insights_url || "#"} className="nav-link">{apiResponse?.data.menuDict?.insights || "insights"}</Link>
                </li>
                <li className="nav-item">
                  <Link href={apiResponse?.data.menuDict.aboutus_url || "#"} className="nav-link">{apiResponse?.data.menuDict?.AboutUs || "About Us"}</Link>
                </li>
                <button className="btn nav-item login-btn">
                  <Link href='#' className='nav-link text-white'>Login</Link>
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <header classNameName="mt-[10px] z-20 lg:px-[70px] px-[20px]">
        <div classNameName="py-4">
          <div>
            <div classNameName="flex md:flex-row flex-col md:gap-[0px] gap-[20px] items-center justify-between">
              <Link href="/">
                <Image src="/logo.svg" alt="Logo" height={40} width={40} priority classNameName="cursor-pointer" />
              </Link>
              <nav classNameName="flex gap-[19px] text-black/60 items-center">
                <Link href={apiResponse?.data.menuDict?.insights_url || "#"} classNameName="text-[#333333] w-[83px] text-[14px] md:block hidden font-semibold hover:text-red">{apiResponse?.data.menuDict?.insights || "insights"}</Link>
                <Link href={apiResponse?.data.menuDict.aboutus_url || "#"} classNameName="text-[#333333] w-[83px] text-[14px] font-semibold hover:text-red md:block hidden">{apiResponse?.data.menuDict?.AboutUs || "About Us"}</Link>
                <button classNameName="bg-[#FE3323] text-white px-[26px] py-[10px] rounded-[6px] font-semibold text-[16px] w-[93px] h-[42px] inline-flex align-items justify-center hover:shadow-[0px_0px_14px_rgba(254,51,35,0.8)]">
                  Login
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header> */}
    </>
  )
}

export default Navbar
