import React , {useState}from 'react'
import { Link , NavLink} from 'react-router-dom'
import Logo from "../../assets/images/main-logo.png"


function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" min-w-full  bg-white sticky top-0 left-0 font-Montserrat z-50 ">
    <div className=' border-b-[1px]  '>
      <nav className="  px-3 py-2 max-w-6xl mx-auto">
        <div className=" flex flex-row justify-between items-center w-[100%] text-text-400">
          {/* Mobile Menu button  */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}  className="text-[1.2rem]">&#9776;</button>
          </div>
          {/* logo */}
          <Link to="/" className=" flex items-center">
            <img src={Logo} alt="this is a logo" className=" w-30 h-14" />
          </Link>
          {/* navlist */}
          <div className=" hidden justify-center  items-center w-full lg:flex  lg:w-auto ">
            <ul className=" flex flex-col lg:flex-row lg:space-x-6">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Profile Details
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/links"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Links
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/social"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Social
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/resume"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Resume
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    ` text-[1rem]  font-semibold px-3 py-2  hover:bg-gray-100 rounded-full
                                    ${
                                      isActive
                                        ? "bg-gray-100 "
                                        : "  "
                                    } `
                  }
                >
                  Portfolio
                </NavLink>
              </li>
            </ul>
          </div>

          <div className=" flex flex-row  justify-between items-center gap-2 w-auto">
            <Link
              to="/signup"
              className=" text-[1rem]  font-semibold px-7 py-1 border-0 rounded-full text-white bg-gradient-to-r from-classic_blue-800  to-classic_red-700 hover:bg-gradient-to-l "
            >
                Register 
            </Link>
          </div>
        </div>
      </nav>
      </div>

      {/* sidebar mobile menu ................. */}
      <div className={` ${isOpen ? "flex" : "hidden"} w-full h-full lg:hidden bg-black/50 backdrop-blur-sm  fixed top-0 left-0  text-text-400`}>
        <div
        className={`
            flex flex-col gap-3 px-3 py-5 w-[60%]  h-full translate-x -left-100  absolute top-0 left-0  bg-blend-overlay bg-white border-[1px]  lg:hidden`}
        >
        {/*=== Mobile Menu button ==== */}
        <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>&#9776;</button>
          </div>
        {/*=== mobile menu nav start=== */}
        <ul className=" flex flex-col w-full items-start ">
            <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            ""
                        } `
                }
                onClick={() => setIsOpen(!isOpen)}
            >
              Dashboard
            </NavLink>
          </li>
          <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            " "
                        } `
                }
              onClick={() => setIsOpen(!isOpen)}
            >
              Profile Detail
            </NavLink>
          </li>
          <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100">
            <NavLink
              to="/links"
              className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            ""
                        } `
                }
              onClick={() => setIsOpen(!isOpen)}
            >
              Links
            </NavLink>
          </li>
          <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100 ">
            <NavLink
              to="/social"
              className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            ""
                        } `
                }
              onClick={() => setIsOpen(!isOpen)}
            >
              Social
            </NavLink>
          </li>
          <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100 ">
            <NavLink
              to="/resume"
              className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            ""
                        } `
                }
              onClick={() => setIsOpen(!isOpen)}
            >
              Resume
            </NavLink>
          </li>
          <li className=" py-2 px-2 w-full border-0 rounded-md hover:bg-gray-100">
            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                ` text-[1rem]  font-semibold   
                        ${
                            isActive?
                            "bg-gray-100":
                            ""
                        } `
                }
              onClick={() => setIsOpen(!isOpen)}
            >
              Portfolio
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
      {/* sidebar mobile menu end......... */}

    </header>
  )
}

export default Navbar
