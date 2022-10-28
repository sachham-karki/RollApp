import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [pieChartData, setPieChartData] = useState({ data: [] });
  const setMode = (e) => {
    setCurrentMode(e.target.value);

    localStorage.setItem("themeMode", e.target.value);

    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);

    setThemeSettings(false);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  socket.on("message", (data) => {
    //Replacing the data of pie chart with update value received from backend.
    setPieChartData((data = data[0].spinner));
  });

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setColor,
        setMode,
        pieChartData,
        setPieChartData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
