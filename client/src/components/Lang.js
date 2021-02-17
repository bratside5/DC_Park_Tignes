import React from "react";
import FlagFR from "../assets/flag-fr.jpg";
import FlagGB from "../assets/ukflag.png";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Lang = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center py-6">
        <button
          type="button"
          onClick={() => changeLanguage("fr")}
          className="w-1/4 h-auto"
        >
          <img
            onClick={() => changeLanguage("fr")}
            src={FlagFR}
            alt=""
            className=" rounded-full shadow mr-2"
          />
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("en-GB")}
          className="w-1/4 h-auto"
        >
          <img src={FlagGB} alt="" className="rounded-full ml-2" />
        </button>
      </div>
    </>
  );
};

export default Lang;
