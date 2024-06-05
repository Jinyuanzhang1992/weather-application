import { useSelector } from "react-redux";

function WeatherDetails() {
  const weather = useSelector((state) => state.weather);

  const [description, icon, temp, feels_like, humidity, speed] = weather;

  if (!feels_like || !humidity || !speed) {
    return null;
  }

  return (
    <div>
      <ul className="flex flex-col items-center text-center gap-6">
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="icon"
            className="w-20 h-20"
          />
        </li>
        <li className="text-5xl">{`${Math.round(temp)}℃`}</li>
        <li className="text-2xl">{description}</li>
        <li className="flex gap-5 ">
          <div className="border- p-2 bg-gray-300 rounded-md">
            {" "}
            {`Feels Like: ${Math.round(feels_like)}`}
          </div>
          <div className="border- p-2 bg-gray-300 rounded-md">
            {" "}
            {`Humidity: ${humidity}%`}
          </div>
          <div className="border- p-2 bg-gray-300 rounded-md">
            {" "}
            {`Wind Speed: ${speed} m/s`}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default WeatherDetails;
