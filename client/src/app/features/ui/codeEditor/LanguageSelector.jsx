import { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-blue-400";

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 mb-4 relative inline-block">
      <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
        Language:
      </p>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none"
      >
        {language}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-48 bg-[#110c1b] text-white border border-gray-700 rounded-md shadow-lg">
          {languages.map(([lang, version]) => (
            <li
              key={lang}
              onClick={() => {
                onSelect(lang);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer ${lang === language ? "bg-gray-900 text-blue-400" : "hover:bg-gray-900"
                }`}
            >
              <span className="flex justify-between items-center">
                <span className={`${lang === language ? ACTIVE_COLOR : ""}`}>{lang}</span>
                <span className="text-gray-500 text-sm ml-2">({version})</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
