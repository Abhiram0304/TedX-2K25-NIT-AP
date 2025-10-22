import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import to from "../../public/images/1(2).svg";
import GetYourTickets from "./GetYourTickets";

const syne = 'font-syne'
export default function HomeFirst() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">

      <img
        src="/images/main_page_image.png"
        alt="background"
        className="object-cover object-center z-10 opacity-20 absolute inset-0 w-full h-full md:opacity-15"
      />

      {/* main container */}
      <div className="relative z-10 flex flex-row items-center justify-between w-11/12 max-w-7xl mx-auto lg:gap-10">
        
        <div className="flex flex-col items-center lg:items-start md:gap-4 lg:gap-6 w-full lg:w-[55%]">
          <div className="relative">
            <h1 className={`text-4xl sm:text-4xl md:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-red-550 to-red-500 bg-clip-text text-transparent tracking-tight ${syne} animate-text-reveal`} >
              TESSELATE
            </h1>
            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-red-500 to-yellow-400 animate-line-expand"></span>
          </div>

          {/* subtitl e */}
          <p className="text-lg text-center lg:text-left sm:text-base md:text-xl lg:text-2xl text-gray-300 max-w-xl leading-relaxed animate-fadein">
            From <span className="font-semibold text-white">Fragments</span>{" "}
            <span className="inline-flex items-center">
              <img src={to} alt="to" width={27} height={27} className="w-6 sm:w-7 relative top-1" />
              <span className="text-red-500 font-bold relative top-1 right-[2px] text-2xl">o</span>
            </span>{" "}
            <span className="font-semibold text-white">Form</span>.  
            A celebration of ideas, innovation, and imagination.
          </p>

          <div className="flex flex-col lg:flex-row md:flex-wrap gap-4 mt-10 animate-slide-up md:mt-4">
            {[
              { Icon: AiOutlineCalendar, text: "28th October, 2-6 PM, 2025" },
              { Icon: IoLocationOutline, text: "NIT Andhra Pradesh" },
              { Icon: CiUser, text: "6 Speakers" },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-xl p-3 px-5 shadow-lg hover:scale-105 transition-transform duration-300 border border-white/10"
              >
                <Icon size={24} className="text-red-500" />
                <span className="text-sm font-medium sm:text-[13px] md:text-[15-px] lg:text-[15px]">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 animate-pop-in md:mt-6">
            <GetYourTickets />
          </div>
        </div>

        <div className="relative w-0 lg:w-[45%] overflow-hidden rounded-3xl shadow-2xl animate-fadein-slow opacity-75 lg:scale-95">
          <img
            src="/images/ted.png"
            width={1200}
            height={1200}
            className="w-full h-auto object-contain object-center"
            alt="TEDx NIT AP"
          />
        </div>
      </div>

    </section>
  );
}
