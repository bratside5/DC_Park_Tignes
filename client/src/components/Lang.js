import React from "react";
import FlagFR from "../assets/flag-fr.jpg";
import FlagGB from "../assets/ukflag.png";

const Lang = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-center py-6">
        <img
          src={FlagFR}
          alt=""
          className="w-1/4 h-auto rounded-full shadow mr-2"
        />
        <img src={FlagGB} alt="" className="w-1/4 h-auto rounded-full ml-2" />
      </div>
    </>
  );
};

export default Lang;
