import "./App.css";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";
import { AnimatePresence } from "framer-motion";
import sunsetImage from "./assets/sunset.jpg"; // Import the image

const App: () => JSX.Element = () => {
  const { term, options, weather, onInputChange, onOptionSelect, onSubmit, isShaking } =
    useForecast();
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
      <AnimatePresence>
        {weather ? (
          <Forecast data={weather} />
        ) : (
          <Search
            term={term}
            options={options}
            onInputChange={onInputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
            isShaking={isShaking}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;