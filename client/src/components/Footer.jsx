// import { IoMailOutline } from "react-icons/io5";
// import { MdOutlineLink } from "react-icons/md";
// import React from "react";
// import { FaInstagram } from "react-icons/fa6";
// import {
//   TiSocialFacebook,
//   TiSocialYoutube,
//   TiSocialLinkedin,
// } from "react-icons/ti";
// import Link from "next/link";
// export default function Footer() {
//   return (
//     <>
//       <div
//         id="contact"
//         className=" w-full flex  flex-col h-[21rem] overflow-clip bg-black"
//       >
//         <div className="w-full flex flex-wrap justify-around sm:justify-between gap-5 items-center h-[16.5rem] p-10 ">
//           {/* <Image src={logo} className="w-[7.5rem] " alt="" /> */}
//           <div className="  flex gap-2  justify-start ">
//             <div className="flex-col justify-center">
//               <div className="font-helvitica -mb-1  font-extrabold text-2xl sm:text-3xl text-[#FF2B06]">
//                 TED<sup>x</sup>
//               </div>
//               <div className="font-light -mt-2 text-[0.8rem] sm:text-[1rem] text-white">
//                 NIT Andhra Pradesh
//               </div>
//               <div className="-mt-[0.2rem] text-[0.5rem] sm:text-[0.7rem]">
//                 <span className="text-tedred ">x=</span>
//                 <span className="text-white ">
//                   Independently Organized TED Event
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col gap-3">
//             <p className="text-white font-poppins font-bold tracking-tight">
//               CONTACT US
//             </p>
//             <div className="flex flex-wrap  gap-10">
//               <div className="font-poppins font-bold text-[#777777]">
//                 <p className="items-center  flex gap-2 hover:text-tedred duration-150">
//                   <MdOutlineLink /> Nit Andhra Pradesh
//                 </p>

//                 <p className="inline-flex gap-2 justify-center items-center hover:text-tedred duration-150">
//                   <IoMailOutline /> tedx@nitandhra.ac.in
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className=" flex justify-between flex-wrap-reverse gap-5 items-center  w-full p-5">
//           <p className="font-poppins text-white font-light text-center w-full md:w-max text-opacity-50 ">
//             © Copyright 2024. All Rights Reserved.
//           </p>
//           <div className="flex text-[0.8rem] font-metrapolis-bold text-white justify-center flex-wrap w-full md:w-max items-center gap-4">
//             <Link
//               href="https://www.instagram.com/tedxnitandhrapradesh/"
//               target="_blank"
//             >
//               {" "}
//               <p className="flex gap-2 items-center hover:text-tedred duration-150">
//                 <FaInstagram size={15} /> INSTAGRAM{" "}
//               </p>
//             </Link>
//             <Link
//               href="https://www.facebook.com/TEDxNITAndhraPradesh/"
//               target="_blank"
//             >
//               <p className="flex gap-2 items-center hover:text-tedred duration-150">
//                 <TiSocialFacebook size={15} /> FACEBOOK
//               </p>{" "}
//             </Link>
//             {/* <Link href="" target="_blank">
//               {" "}
//               <p className="flex gap-2 items-center hover:text-tedred duration-150">
//                 <TiSocialLinkedin size={15} /> LINKED IN
//               </p>{" "}
//             </Link> */}
//             {/* <Link href="" target="_blank">
//               {" "}
//               <p className="flex gap-2 items-center hover:text-tedred duration-150">
//                 <TiSocialYoutube size={15} /> YOUTUBE
//               </p>
//             </Link> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import {
  IoGitNetworkOutline,
  IoGlobe,
  IoGlobeOutline,
  IoLogoWebComponent,
  IoMailOutline,
} from "react-icons/io5";
import { MdOutlineLink } from "react-icons/md";
import React from "react";
// import logoWhite from "../../public/images/logo-white.png";
import Image from "next/image";
import GetYourTickets from "./GetYourTickets";
import { FaInstagram } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="w-screen px-4 lg:px-24 xl:px-32 py-20 flex flex-col gap-4"
    >
      <div className="flex items-start gap-3 justify-between px-3 sm:px-7">
        <div className="flex-col justify-end ">
          <div className="font-helvitica -mb-1  font-extrabold text-2xl sm:text-3xl text-[#FF2B06]">
            TED<sup>x</sup>
          </div>
          <div className="font-light -mt-2 text-[0.8rem] sm:text-[1rem] text-white">
            NIT Andhra Pradesh
          </div>
          <div className="-mt-[0.2rem] text-[0.5rem] sm:text-[0.7rem]">
            <span className="text-tedred ">x=</span>
            <span className="text-white ">
              Independently Organized TED Event
            </span>
          </div>
        </div>
          <GetYourTickets />
      </div>
      <div className="flex flex-col-reverse gap-5 sm:flex-row items-center sm:items-start justify-between px-3 pt-7 sm:pt-0 sm:text-left text-center sm:px-7">
        <p className="text-neutral-500 leading-[1.6]">
          This independent TEDx event is operated under license from TED. <br />
          &copy; 2024 TEDxNITAndhraPradesh
        </p>
        <div className="flex flex-row items-center gap-4">
          <button className="group inline-flex items-center">
            <IoMailOutline size={50} color="white" className="scale-75" />
            <div className="ml-2 overflow-hidden transition-all duration-[1600ms] ease-in-out max-w-0 group-hover:max-w-xs">
              <p className="text-white">tedx@nitandhra.ac.in</p>
            </div>
          </button>
          <Link
            href="https://www.facebook.com/TEDxNITAndhraPradesh/"
            target="_blank"
            className="scale-75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path
                fill="white"
                d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"
              />
            </svg>
          </Link>
          <Link
            href="https://www.instagram.com/tedxnitandhrapradesh/"
            target="_blank"
            className="scale-75"
          >
            <FaInstagram size={50} color="white" />
          </Link>
          <Link href="https://nitandhra.ac.in/main/" target="_blank">
            <IoGlobeOutline className="scale-75" size={50} color="white" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
