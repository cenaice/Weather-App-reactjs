import AnimatedPage from "../AnimatedPage";
import {
  getHumidityValue,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
  getPop,
} from "../helpers";
import { forecastType } from "./../types";
import Sunrise from "./Icons/Sunrise";
import Sunset from "./Icons/Sunset";
import Tile from "./Tile";
import { DateTime }  from "luxon";

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>
  </span>
);

// Military time conversion
export function convert(input:string) {
  // Parse military string into datetime object
  const militaryTime = DateTime.fromFormat(input, 'H:mm');

  const standardTime = militaryTime.toFormat('h:mm')
  // Format the DateTime object to the desired output format
  return standardTime
}

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];
  return (
    <AnimatedPage>
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-30 backdrop-blur-ls rounded drop-shadow-1g">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name}
            <span className="font-thin">
              {data.state} {data.country}
            </span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main.toUpperCase()}{" "}
            {today.weather[0].description.toUpperCase()}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{" "}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll   mt-4 pb-2 mb-5" >
          {data.list.map((item, i) => (
            <div
              className="inline-block text-center w-[50px] flex-shrink-0"
              key={i}
            >
              <p className="text-xs">
                {i === 0 ? "Now" : convert(new Date(item.dt * 1000).getHours() + ':00')}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between text-zinc-800">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/50 backdroip-blue-1s rounded drop-shadow-1g py-4 mb-5">
            <h1 className="pb-2 font-bold">Sunrise</h1>
            <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/50 backdroip-blue-1s rounded drop-shadow-1g py-4 mb-5">
            <h1 className="pb-2 font-bold ">Sunset</h1>
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
          
          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"
            }`}
          />
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? "Lower" : "Higher"
            } than standard`}
          />
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Forecast;
