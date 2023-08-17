import { useState, useEffect, ChangeEvent } from "react";
import { optionType } from "../types";

const useForecast = () => {
  // API Key
  const WEATHER_APP_API_KEY: string = "d900013bf0ee0780570601cb2da28e46";
  // Search Input Terms
  const [term, setTerm] = useState<string>("");
  // Dropdown box options
  const [options, setOptions] = useState<[]>([]);
  // Clear and Store drowndown box data
  const [city, setCity] = useState<optionType | null>(null);
  // Clicking drop down menu options and grabbing data
  const [weather, weatherData] = useState<null>(null);

  // Using input information for Geocoding API to find location
  // Geocoding API
  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${WEATHER_APP_API_KEY}`
    )
      // Grabs data using .then()

      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    // Display inputted text on input box
    setTerm(value);

    if (value === "") return;

    getSearchOptions(value);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  // Grab weather data after submitting
  const getWeatherData = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${WEATHER_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => weatherData(data));
  };

  const onSubmit = () => {
    if (!city) return;

    getWeatherData(city);
  };

  // Empty our setOptions drop down after clicking which city we want
  useEffect(() => {
    if (city) {
      setTerm(`${city.name}, ${city.state} ${city.country}`);
      setOptions([]);
    }
  }, [city]);

  return {
    term,
    options,
    weather,
    onInputChange,
    onOptionSelect,
    onSubmit,
  };
};

export default useForecast;
