import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import SearchBar from "./LocationSearch";

export default function TopBar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-between">
      <button className="ml-2">
      <svg className="feather feather-sidebar bg-white rounded-l" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="3"/><line x1="9" x2="9" y1="3" y2="21"/></svg>
      </button>
      <SearchBar />
      <button onClick={toggleTheme} className="mr-2">
        {isDarkMode ? <IoSunny /> : <IoMoon />}
      </button>
    </div>
  );
}
