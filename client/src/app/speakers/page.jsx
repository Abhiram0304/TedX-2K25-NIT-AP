import React, { useState } from "react";
import { speakersData } from "../../data/speakersData";

const SpeakersPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const date = new Date();
  return (
    <div className="bg-black text-white min-h-screen relative p-10 sm:p-20 py-40 mt-15">
      <div className="flex flex-col sm:flex-row min-h-screen justify-center">
        {/* Left Div - Years */}
        <div className="sm:w-1/4  sm:p-6 flex sm:flex-col flex-wrap items-center sm:items-start sm:space-y-4 sm:h-screen">
          {/* <h2 className="text-2xl font-bold text-aqua mb-4">EVENT YEARS</h2> */}
          {Object.keys(speakersData)
            .sort((a, b) => b.localeCompare(a))
            .map((year) => (
              <div
                key={year}
                onClick={() => setSelectedYear(parseInt(year))}
                className={`cursor-pointer sm:py-2 px-6 rounded-lg font-medium text-lg transition-all duration-300 ${
                  selectedYear === parseInt(year)
                    ? "text-tedred"
                    : "text-white  hover:text-red-900"
                }`}
              >
                {year}
              </div>
            ))}
        </div>

        {/* Right Div - Speakers */}
        <div className="sm:w-3/4 p-6">
          {selectedYear === date.getFullYear() ? (
            <h2 className="sm:text-3xl font-bold text-tedred mb-6">
              SPEAKERS ATTENDING |{" "}
              <span className="text-white">{selectedYear}</span>
            </h2>
          ) : (
            <h2 className="sm:text-3xl font-bold text-tedred mb-6">
              SPEAKERS | <span className="text-white">{selectedYear}</span>
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakersData[selectedYear].map((speaker, index) => (
              <div key={index} className="sm:p-3">
                <img
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
      </div>
    </div>
  );
};

export default SpeakersPage;
