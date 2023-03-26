import React, { useEffect, useState } from "react";
import captchaImg from "../../images/captcha.jpg";
import refreshImg from "../../images/refresh.png";
import loader from "../../images/loader.gif";
import "./Captcha.css";

function Captcha({ theme }) {
  const [user, setUser] = useState({
    username: "",
  });
  const [status, setStatus] = useState("Submit");
  const [captcha, setcCaptcha] = useState("");
  const [cursor, setCursor] = useState("pointer");
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const characters = "abc123";

  function generateString(length) {
    setLoading(true);
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setLoading(false);
    setcCaptcha(result);
    return result;
  }

  useEffect(() => {
    generateString(6);
  }, []);

  let handleCaptchaChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };

  const onSubmit = (e) => {
    setCursor("wait");

    setStatus("Checking..");

    var myFunctions = function () {
      if (user.username) {
        if (captcha === user.username) {
          setStatus("Captcha Verified");
        } else {
          setStatus("Not Matched");

          var myFunction = function () {
            setCursor("pointer");

            setStatus("Submit");
          };
          setTimeout(myFunction, 3000);
        }
      } else {
        setValidation("Please enter captcha");
        setStatus("Submit");
        setCursor("pointer")
      }
    };
    setTimeout(myFunctions, 3000);
  };

  return (
    <div className="container">
      <h4 className="text-center mt-4 text-info">
        <b> Captcha Validator</b>
      </h4>
      <form>
        <div className="ui form">
          <div className={`${"field"} ${theme && "black"}`}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>

          <div className={`${"field"} ${theme && "black"}`}>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className={`${"field"} ${theme && "black"}`}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="captcha-details">
          <h4
            className={`${theme && "captcha-black"}`}
            style={{
              marginTop: "7px",
              marginLeft: "20px",
              position: "absolute",
            }}
          >
            {captcha}
          </h4>

          <div className="form-group row">
            <div className="captcha-container">
              <img
                src={captchaImg}
                className="mt-3 mb-3"
                height="30"
                alt="captcha"
              />
              <button
                onClick={() => generateString(6)}
                className=" refresh-btn"
              >
                <img
                  src={`${loading ? loader : refreshImg}`}
                  alt="refresh"
                  className="refresh-img"
                ></img>
              </button>
            </div>

            <div className="field">
              <input
                type="text"
                id="inputType"
                placeholder="Enter Captcha"
                name="username"
                onChange={handleCaptchaChange}
                autoComplete={"off"}
              />
            </div>
          </div>
          {validation && <p className="validation">{validation}</p>}

          <button
            type="button"
            id="succesBTN"
            onClick={onSubmit}
            className={`${cursor} ${"submit-btn"}`}
          >
            {status}
          </button>
        </div>
      </form>
    </div>
  );
}
export default Captcha;
