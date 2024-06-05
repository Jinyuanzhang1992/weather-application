import axios from "axios";
import { useState } from "react";
import { setWeatherInStore } from "../../../redux/store";
import { useDispatch } from "react-redux";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";

// 定义验证 schema
const schema = {
  type: "object",
  properties: {
    city: {
      type: "string",
      minLength: 1, // 确保字符串至少有一个字符
      errorMessage: {
        type: "City must be a string.",
        minLength: "City cannot be empty.",
      },
    },
  },
  required: ["city"],
  errorMessage: {
    required: {
      city: "City is required.",
    },
  },
};

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);
const validate = ajv.compile(schema);

function SearchForm() {
  const [errors, setErrors] = useState({});
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  // 当输入框的值发生变化时，触发 handleSetCity 函数
  // 把输入框的值赋值给 city
  const handleSetCity = (e) => {
    const { value } = e.target;
    setCity(value);

    if (value === "") {
      // 如果 input 为空，则重置 weather 状态
      dispatch(setWeatherInStore([]));
    }
  };

  const handFetchWeather = async () => {
    if (city === "") return; // 避免初始加载时发起请求

    const apiKey = "3898525eb5e9206a538208dedef89eb5";
    // openweathermap.org 的 api，返回一个 json 数据
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      console.log("response: ", response);
      return response.data; // 返回数据以供后续处理
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        setErrors({ city: "City not found." });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { city }; // 创建包含 city 字段的对象
    const isValid = validate(formData); // 进行验证
    setErrors({}); // 重置错误状态

    if (!isValid) {
      const newErrors = {};
      validate?.errors.forEach((error) => {
        const key = error.instancePath.substring(1);
        newErrors[key] = error.message;
      });
      setErrors(newErrors);
      console.log("errors: ", newErrors);
      return;
    }

    const weatherData = await handFetchWeather();

    if (!weatherData) {
      console.error("Failed to fetch weather data.");
      return;
    }

    // 提取数据
    const {
      weather: [{ description, icon }],
      main: { temp, feels_like, humidity },
      wind: { speed },
    } = weatherData;

    weatherData &&
      dispatch(
        setWeatherInStore([
          description,
          icon,
          temp,
          feels_like,
          humidity,
          speed,
        ])
      );
  };

  return (
    <>
      <form
        className="flex gap-4 mb-3 justify-center items-center "
        onSubmit={handleSubmit}
      >
        <div className="grow-3">
          <input
            name="city"
            placeholder="Enter Your City"
            // 把 city 与 react 绑定
            value={city}
            // 当输入框的值发生变化时，触发 handleSetCity 函数
            onChange={handleSetCity}
            style={{ border: "blue 1px solid", borderRadius: "2px" }}
            className="bg-gray-300 w-full p-1 h-9 "
          />
        </div>
        <div className="grow-1">
          <button
            type="submit"
            className="w-full h-9  bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex justify-center items-center"
          >
            Get Weather
          </button>
        </div>
      </form>
      {errors.city && <span style={{ color: "red" }}>{errors.city}</span>}
    </>
  );
}

export default SearchForm;
