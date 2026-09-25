// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function Header() {
// const pathname = usePathname();
// const [scrolled, setScrolled] = useState(false);

// useEffect(() => {
// const handleScroll = () => {
// setScrolled(window.scrollY > 10);
// };

// window.addEventListener("scroll", handleScroll);

// return () => {
// window.removeEventListener("scroll", handleScroll);
// };
// }, []);
// return (
// <nav
// className={`navbar navbar-expand-lg sticky-top ${
// scrolled ? "navbar-scrolled" : "navbar-transparent"
// }`}
// >
// <div className="container">
// <Link className="navbar-brand brandmark header-brandmark" href="/">
// <Image
// src="/assets/collabo-logo.png"
// alt="Collabo logo"
// width={100}
// height={70}
// priority
// />
// </Link>
// <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
// <span className="navbar-toggler-icon" />
// </button>
// <div className="collapse navbar-collapse" id="navMain">
// <ul className="navbar-nav mx-auto gap-5">
// <li className="nav-item">
// <Link
// href="/"
// className={pathname === "/" ? "nav-link active" : "nav-link"}
// >
// For Creators
// </Link>
// </li>
// <li className="nav-item">
// <Link
// href="/brands"
// className={pathname === "/brands" ? "nav-link active" : "nav-link"}
// >
// For Brands
// </Link>
// </li>
// <li className="nav-item">
// <Link
// href="/blog"
// className={pathname === "/blog" ? "nav-link active" : "nav-link"}
// >
// Blog
// </Link>
// </li>
// <li className="nav-item">
// <Link
// href="/faq"
// className={pathname === "/faq" ? "nav-link active" : "nav-link"}
// >
// FAQ
// </Link>
// </li>
// </ul>
// <div className="d-flex gap-2 mt-3 mt-lg-0 custom-button">
// <button type="button" className="btn  btn-sm" data-bs-toggle="modal" data-bs-target="#strategyCallModal">Book a Strategy Call</button>
// </div>
// </div>
// </div>
// </nav>
// );
// }




// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function Header() {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };

//     handleScroll(); // set correct state immediately on mount (e.g. after refresh mid-scroll)

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={`navbar navbar-expand-lg sticky-top ${
//         scrolled ? "navbar-scrolled" : "navbar-transparent"
//       }`}
//     >
//       <div className="container">
//        <Link className="navbar-brand brandmark header-brandmark" href="/">
//   {scrolled ? (
//     <Image
//       src="/assets/collabo.png"
//       alt="Collabo logo"
//       width={100}
//       height={70}
//       priority
//       className="logo-scrolled"
//     />
//   ) : (
//     <Image
//       src="/assets/custom.png"
//       alt="Collabo logo"
//       width={100}
//       height={70}
//       priority
//       className="logo-default"
//     />
//   )}
// </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navMain"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <div className="collapse navbar-collapse" id="navMain">
//           <ul className="navbar-nav mx-auto gap-5">
//             <li className="nav-item">
//               <Link
//                 href="/"
//                 className={pathname === "/" ? "nav-link active" : "nav-link"}
//               >
//                 For Creators
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 href="/brands"
//                 className={
//                   pathname === "/brands" ? "nav-link active" : "nav-link"
//                 }
//               >
//                 For Brands
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 href="/blog"
//                 className={
//                   pathname === "/blog" ? "nav-link active" : "nav-link"
//                 }
//               >
//                 Blog
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 href="/faq"
//                 className={
//                   pathname === "/faq" ? "nav-link active" : "nav-link"
//                 }
//               >
//                 FAQ
//               </Link>
//             </li>
//           </ul>
//           <div className="d-flex gap-2 mt-3 mt-lg-0 custom-button">
//             <Link
//              href="/apply"
//               type="button"
//               className="btn  btn-sm"
//               data-bs-toggle="modal"
//               data-bs-target="#strategyCallModal"
//               style={{color:"white"}}
//             >
//             Join Us
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiBookOpen, FiHelpCircle } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 992); // Bootstrap lg breakpoint
    };

    handleScroll();
    checkScreen();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setDropdownOpen(false);
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? "navbar-scrolled" : "navbar-transparent"
        }`}
    >
      <div className="container">
        <Link className="navbar-brand brandmark header-brandmark" href="/">
          <Image
            src={
              isMobile
                ? "/assets/collabo.png"
                : scrolled
                  ? "/assets/collabo.png"
                  : "/assets/custom.png"
            }
            alt="Collabo logo"
            width={100}
            height={70}
            style={{ width: "auto", height: "auto" }}
            priority
            className={
              isMobile
                ? "logo-mobile"
                : scrolled
                  ? "logo-scrolled"
                  : "logo-default"
            }
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMain"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav mx-auto gap-5">
            <li className="nav-item">
              <Link
                href="/"
                className={pathname === "/" ? "nav-link active" : "nav-link"}
              >
                For Creators
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/brands"
                className={
                  pathname === "/brands" ? "nav-link active" : "nav-link"
                }
              >
                For Brands
              </Link>
            </li>

            {/* About Us with Dropdown (Blog & FAQ) */}
            <li
              ref={dropdownRef}
              className={`nav-item custom-nav-dropdown ${dropdownOpen ? "show" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="dropdown-link-wrap">
                <Link
                  href="/about"
                  className={`nav-link ${pathname === "/about" ? "active" : ""
                    }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  About Us
                </Link>
                <button
                  type="button"
                  className="dropdown-arrow-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropdownOpen((prev) => !prev);
                  }}
                  aria-expanded={dropdownOpen}
                  aria-label="Toggle About Us menu"
                >
                  <FiChevronDown
                    className={`dropdown-chevron-icon ${dropdownOpen ? "rotate" : ""
                      }`}
                    size={14}
                  />
                </button>
              </div>

              <div
                className={`custom-dropdown-menu ${dropdownOpen ? "show" : ""}`}
                role="menu"
              >
                <Link
                  href="/blog"
                  className={`custom-dropdown-item ${pathname === "/blog" ? "active" : ""
                    }`}
                  onClick={() => setDropdownOpen(false)}
                  role="menuitem"
                >
                  <FiBookOpen size={16} className="dropdown-item-icon" />
                  <span>Blog</span>
                </Link>

                <Link
                  href="/faq"
                  className={`custom-dropdown-item ${pathname === "/faq" ? "active" : ""
                    }`}
                  onClick={() => setDropdownOpen(false)}
                  role="menuitem"
                >
                  <FiHelpCircle size={16} className="dropdown-item-icon" />
                  <span>FAQ</span>
                </Link>
              </div>
            </li>


            <li className="nav-item">
              <Link
                href="/our-brand"
                className={
                  pathname === "/our-brand" ? "nav-link active" : "nav-link"
                }
              >
                Brand Portfolio
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/our-model"
                className={
                  pathname === "/our-model" ? "nav-link active" : "nav-link"
                }
              >
                Model Portfolio
              </Link>
            </li>
          </ul>
          <div className="d-flex gap-2 mt-3 mt-lg-0 custom-button">
            <Link
              href="/join-us"
              className="btn  btn-sm"
              style={{ color: "white" }}
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}