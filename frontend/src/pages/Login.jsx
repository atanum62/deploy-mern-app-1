import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleScuess } from "../Util";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  const handleChange = (e) => {
  //    const { name, value } = e.target;
  //   //  console.log(name, value);
  //    const copyloginInfo = { ...loginInfo };
  //    copyloginInfo[name] = value;
  //    setloginInfo(copyloginInfo);
  //  };

  // Handles form submission
  const handlelogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    // Frontend validation
    if (!email || !password) {
      return handleError("Name, email and password are required");
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      // console.log(result);
      const { success, message, token, name, error } = result;

      // console.log(message);
      if (success) {
        handleScuess(message);
        //storeing data in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInuser", name);
        //------------------------------------------
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        // navigate("/login");
      } else if (error) {
        const details = error?.details[0]?.message; // With ?., JavaScript safely checks each level:This means:
        // ✅ If error exists
        // ✅ and error.details exists
        // ✅ and error.details[0] exists
        // ✅ then grab the .message
        // Else, it just returns undefined without crashing.
        //We use ? (optional chaining) to avoid crashes when accessing deeply nested values that might not exist.
        handleError(details);
      } else if (!success) {
        handleError(message || "login failed");
      }
    } catch (err) {
      handleError("Something went wrong. Please try again.");
      console.error(err);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handlelogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={loginInfo.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={loginInfo.password}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account?<Link to="/signup">Signup</Link>{" "}
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
