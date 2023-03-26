import { useState, useEffect } from "react";
import "./App.css";
import Captcha from "./Pages/Captcha/Captcha";
import moonImg from "./images/moon.jpg";
import sunImg from "./images/sun.jpg";

function App() {
  const [theme, setTheme] = useState(false);

  const handleClick = () => {
    setTheme(!theme);
  };
  useEffect(() => {
    if (theme === true) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });

  return (
    <div className="container">
      <div className="header">
        <button onClick={handleClick} className="theme-btn">
          {" "}
          <img
            src={`${theme ? sunImg : moonImg}`}
            alt="theme"
            className="theme-img"
          ></img>
        </button>
      </div>
      <Captcha theme={theme} />
    </div>
  );
}

export default App;
