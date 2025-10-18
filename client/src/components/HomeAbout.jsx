import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { data } from "../data/about";
const VerticalAnimation = () => {
  const svgRefs = useRef([]);
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      const svgElement = svgRefs.current[index];
      const path = svgElement.querySelector("path");
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;

      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 6,
        },
      });

      gsap.fromTo(
        section,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 3,
          },
        },
      );
    });
  }, []);

  return (
    <div className=" relative flex mt-[5rem] flex-col items-start justify-center  h-max overflow-clip p-3 sm:p-5 bg-black">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative z-10 flex flex-col items-start justify-center w-[95%] pl-10 sm:pl-20 mb-20"
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <svg
            ref={(el) => (svgRefs.current[index] = el)}
            className="absolute left-0 transform translate-x-[0%] h-[100%]"
            width="50"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M25 0 L25 100" stroke="red" strokeWidth="2" fill="none" />
            <circle cx="25" cy="50" r="5" fill="red" />
          </svg>
          <div className="text-left">
            <h2 className="text-xl sm:text-3xl text-tedred font-bold mb-2">
              {item.head}
            </h2>
            <p className="text-white text-left sm:text-justify tracking-tight sm:text-xl">
              {item.para}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VerticalAnimation;
