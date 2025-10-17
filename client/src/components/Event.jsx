import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function Event() {
  return (
    <>
      <div className="flex justify-center  sm:justify-evenly flex-wrap items-start sm:items-center h-max p-5 min-h-[15rem]  w-full bg-black flex-col sm:flex-row gap-5 ">
        <div className="flex gap-2">
          <AiOutlineCalendar
            size={60}
            className="scale-75 sm:scale-100 text-tedred"
          />
          <div className="flex text-white justify-center flex-col font-light">
            <p>DATE</p>
            <p>2 PM- 6 PM, 5th October, 2024</p>
          </div>{" "}
        </div>
        <div className="flex gap-2">
          <IoLocationOutline
            size={60}
            className="text-tedred scale-75 sm:scale-100"
          />
          <div className="flex text-white justify-center flex-col font-light">
            <p>LOCATION</p>
            <p>NIT AndhraPradesh</p>
          </div>{" "}
        </div>
        <div className="flex gap-2">
          <CiUser size={60} className="text-tedred scale-75 sm:scale-100" />
          <div className="flex text-white justify-center flex-col font-light">
            <p>SPEAKERS</p>
            <p>6</p>
          </div>{" "}
        </div>
      </div>
      <div className=" bg-black text-white justify-around items-center h-[10rem] w-full flex  text-2xl sm:text-xl md:text-3xl">
        <p className="hidden justify-center sm:flex font-bold text-center w-[70%] font-poppins ">
          GET YOUR TICKETS
        </p>
        <span className=" h-full sm:w-[.2rem] bg-white"></span>
        <div className="flex h-full group w-full sm:w-[30%] justify-center items-center font-bold font-poppins">
          {" "}
          {/* <Link href="/booking">
            <span>Register Now</span>
          </Link> */}
          <IoIosArrowRoundForward
            size={50}
            className="group-hover:text-tedred animate-pulse duration-150 "
          />
          {/* <FaArrowRight size={50} /> */}
        </div>
      </div>
    </>
  );
}
