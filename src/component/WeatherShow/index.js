import SearchForm from "./SearchForm";
import WeatherDetails from "./WeatherDetails";
import { Provider } from "react-redux";
import store from "../../redux/store";

function WeatherShow() {
  return (
    <Provider store={store}>
      <div className="w-[30rem] h-[20rem]">
        <SearchForm />
        <WeatherDetails />
      </div>
    </Provider>
  );
}

export default WeatherShow;
