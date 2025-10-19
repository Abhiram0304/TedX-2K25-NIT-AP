import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
gsap.registerPlugin(ScrollTrigger);
export default function NavBar() {
  const nav = useRef();
  useGSAP(() => {
    gsap.to(nav.current, {
      scrollTrigger: {
        trigger: ".title",
        start: "top center",
        // markers: true,
        scrub: true,
      },
      backgroundColor: "#000",
    });
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const sideBar = document.getElementById("sideBar");
    if (isOpen) {
      sideBar.classList.remove("translate-x-[20rem]");
    } else {
      sideBar.classList.add("translate-x-[20rem]");
    }
  }, [isOpen]);
  return (
    <>
      <div
        ref={nav}
        className="z-20 fixed top-0 flex justify-between p-2 items-center h-[8rem] w-full "
      >
        {/* <div className="z-10 sticky top-0 bg-black/95 bg-opacity-80 backdrop-blur flex justify-between p-2 items-center h-[5rem] w-full "> */}
        <div className="sm:pl-[3rem] flex gap-2 pl-6 justify-start">
          {/* <div className="w-[5rem] bg-green-100"></div> */}
          <Link to={"/"}>
            <div className="flex flex-col justify-center gap-1">
              <div className="flex flex-col gap-2">
                <div className="font-helvetica font-extrabold text-[1.8rem] text-[#FF2B06] -mb-1">
                  TED<sup>x</sup>
                </div>
                <div className="font-light text-[1.4rem] text-white -mt-3">
                  NITAndhraPradesh
                </div>
              </div>

              {/* <div className="-mt-[0.1rem] flex items-center gap-1">
                <span className="text-tedred text-[0.5rem]">x=</span>
                <span className="text-white text-[0.5rem]">
                  Independently Organized TED Event
                </span>
              </div> */}
            </div>
          </Link>
        </div>
        <ul className="text-white h-full hidden sm:flex items-center gap-6 text-[1.1rem] pr-[3rem]">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-link">
            <Link to="/speakers">Speakers</Link>
          </li>
          <li className="nav-link">
            <Link to="/about">
              About
            </Link>
          </li>
          <li className="nav-link">
            <Link to="#contact">
              Connect with us
            </Link>
          </li>
        </ul>

        <div
          className="flex sm:hidden group flex-col justify-center h-full  gap-[0.5rem] pr-6"
          onClick={() => setIsOpen(true)}
        >
          <div className="duration-150 w-[2rem] h-[0.15rem] rounded-lg bg-white group-hover:bg-tedred"></div>
          <div className="duration-150 w-[1.5rem] group-hover:bg-tedred h-[0.15rem] rounded-lg bg-white"></div>
          <div className="duration-150 w-[2rem] group-hover:w-[1rem] h-[0.15rem] rounded-lg bg-white group-hover:bg-tedred"></div>
        </div>
      </div>
      <div
        id="sideBar"
        className="w-[20rem] translate-x-[20rem] h-[100vh] bg-black fixed top-0 right-0  flex sm:hidden transform-all duration-150 z-20"
      >
        <ul className=" text-white h-full w-full flex-col flex justify-center gap-2 items-center  text-[1.5rem] font-medium">
          <li>
            <IoIosClose
              onClick={() => setIsOpen(false)}
              size={60}
              className="top-5 hover:rotate-90 duration-[500ms] right-2 text-white hover:text-tedred absolute"
            />
          </li>
          <li className="side-link">
            <Link to="/" onClick={() => setIsOpen(false)}>
              HOME
            </Link>
          </li>
          <li className="side-link">
            <Link to="/speakers" onClick={() => setIsOpen(false)}>
              SPEAKERS
            </Link>
          </li>
          {/* <li className="side-link"> */}
          {/*   <Link to="/sponsers" onClick={() => setIsOpen(false)}> */}
          {/*     SPONSORS */}
          {/*   </Link> */}
          {/* </li> */}
          <li className="side-link">
            <Link to="/about" onClick={() => setIsOpen(false)}>
              ABOUT
            </Link>
          </li>
          <li className="side-link">
            <Link
              to="#contact"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
