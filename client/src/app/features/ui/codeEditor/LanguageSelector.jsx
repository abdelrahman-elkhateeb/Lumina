import { useState } from "react";
import { LANGUAGE_VERSIONS } from "./constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "text-accent-500"; // Glowing Sky Blue

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-2 mb-4 relative inline-block">
      <p className="mb-2 text-lg font-semibold text-text">
        Language:
      </p>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-background-700 text-text rounded-md hover:bg-background-500 focus:outline-none"
      >
        {language}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-52 bg-accent-500 text-background-700 border border-background-500 rounded-md shadow-lg">
          {languages.map(([lang, version]) => (
            <li
              key={lang}
              onClick={() => {
                onSelect(lang);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer ${lang === language
                  ? "bg-background-500 text-accent-500"
                  : "hover:bg-background-500"
                }`}
            >
              <span className="flex justify-between items-center">
                <span className={`${lang === language ? ACTIVE_COLOR : ""}`}>
                  {lang}
                </span>
                <span className="text-background-700 text-sm ml-2">
                  ({version})
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
