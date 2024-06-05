import "./App.scss";
import WeatherShow from "../WeatherShow/index";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex flex-col gap-4 ">
        <h1 className="text-center text-3xl mt-2 mb-3">Sanfeng Weather</h1>
        <WeatherShow />
      </div>
    </div>
  );
}

export default App;
