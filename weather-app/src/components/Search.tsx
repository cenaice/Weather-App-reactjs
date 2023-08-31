import { ChangeEvent } from "react";
import { optionType } from "./../types/";
import { motion } from "framer-motion";
import sunsetImage from "../assets/sunset.jpg"; // Import the image

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
  isShaking: boolean;
};

const sortOptions = (options: optionType[]): optionType[] => {
  const usCities = options.filter(
    (option) => option.country === "United States"
  );
  const internationalCities = options.filter(
    (option) => option.country !== "United States"
  );
  return [...usCities, ...internationalCities];
};

const Search = ({
  term,
  options,
  isShaking,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${sunsetImage})`, // Apply the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-30 backdrop-blur-1g rounded drop-shadow-1g text-zinc-800">
        <h1 className="text-4xl font-thin">
          Weather<span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter a city below to find the weather and select from the dropdown
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            onChange={onInputChange}
            className="px-2 py-1 rounded-1-md border-2 border-white"
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {sortOptions(options).map((option: optionType, index: number) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.state}, {option.country}
                </button>
              </li>
            ))}
          </ul>
          <button
            className={`rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 ${
              isShaking ? "animate-shake" : ""
            } hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer`}
            onClick={onSubmit}
          >
            search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;
