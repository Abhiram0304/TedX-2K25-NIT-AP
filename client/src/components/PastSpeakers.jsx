import { speakersData } from "@/data/speakersData";
import Image from "next/image";
import { Syne } from "next/font/google";
const syne = Syne({ subsets: ["latin"] });

const PastSpeakers = () => {
  return (
    <>
      <div className="w-full minh-h-screen flex flex-col justify-center gap-5 px-4 sm:px-20 bg-black">
        <div className="gap-3 flex flex-col">
          <p
            className={`text-2xl sm:text-4xl font-poppins text-white bg-black font-bold ${syne.className}`}
          >
            PRESENT SPEAKERS
          </p>
          <div className="w-[5rem] h-[0.2rem] bg-tedred"></div>
        </div>
        <div
          id="pastSpeakers"
          className="w-[70%] mx-auto py-10 grid sm:grid-cols-2 md:grid-cols-3"
        >
          {speakersData[2024].map((speaker, index) => (
            <div key={index} className="p-3">
              <Image
                src={speaker.pic}
                alt={speaker.name}
                width="500"
                height="500"
                className="w-44 h-44 border-solid border-[6px] mb-4 border-red-700 mx-auto bg-black object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold mb-2 text-center text-white">
                {speaker.name}
              </h3>
              <p className="text-sm text-neutral-400 mb-2 text-center">
                {speaker.profession}
              </p>
              <p className="text-sm text-neutral-400 text-center">
                {speaker.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PastSpeakers;
