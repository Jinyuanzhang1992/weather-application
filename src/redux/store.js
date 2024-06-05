import { configureStore } from "@reduxjs/toolkit";

// 定义初始状态
const initialState = {
  weather: [],
};

// 定义 action types
const SET_WEATHER = "SET_WEATHER";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEATHER:
      return { ...state, weather: action.payload };
    default:
      return state;
  }
};

// 定义 action creators
export const setWeatherInStore = (weather) => ({
  type: SET_WEATHER,
  payload: weather,
});

// 创建 store
const store = configureStore({ reducer });

export default store;
