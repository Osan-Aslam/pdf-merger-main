"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

function Navbar({ apiResponse }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
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
              <Link href={apiResponse?.data.menuDict?.insights_url || "#"} className="nav-link">
                {apiResponse?.data.menuDict?.insights || "insights"}
              </Link>
            </li>
            <li className="nav-item">
              <Link href={apiResponse?.data.menuDict.aboutus_url || "#"} className="nav-link">
                {apiResponse?.data.menuDict?.AboutUs || "About Us"}
              </Link>
            </li>
            <button className="btn nav-item login-btn">
              <Link href="#" className='nav-link text-white'>Login</Link>
            </button>
          </ul>
        </div>

        <div className="offcanvas offcanvas-end" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href={apiResponse?.data.menuDict?.insights_url || "#"} className="nav-link">
                  {apiResponse?.data.menuDict?.insights || "insights"}
                </Link>
              </li>
              <li className="nav-item">
                <Link href={apiResponse?.data.menuDict.aboutus_url || "#"} className="nav-link">
                  {apiResponse?.data.menuDict?.AboutUs || "About Us"}
                </Link>
              </li>
              <button className="btn nav-item login-btn">
                <Link href="#" className='nav-link text-white'>Login</Link>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
