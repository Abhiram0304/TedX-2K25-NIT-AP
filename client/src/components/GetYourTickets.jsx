import React from "react";
import { Link } from "react-router-dom";

function GetYourTickets() {
  return (
    <Link
      to="/booking"
      target="_blank"
    >
      <button className="hover:bg-white rounded-full bg-tedred hover:text-tedred text-white px-7 md:px-9 py-4 md:py-5 font-[500] transition-all duration-300">
        Get your Tickets
      </button>
    </Link>
  );
}

export default GetYourTickets;
