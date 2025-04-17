import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleScuess } from "../Util";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  const handleChange = (e) => {
  //    const { name, value } = e.target;
  //   //  console.log(name, value);
  //    const copySignupInfo = { ...signupInfo };
  //    copySignupInfo[name] = value;
  //    setSignupInfo(copySignupInfo);
  //  };

  // Handles form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;

    // Frontend validation
    if (!name || !email || !password) {
      return handleError("Name, email and password are required");
    }

    try {
      const response = await fetch("https://deploy-mern-app-1-two.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      // console.log(result);
      const { success, message, error } = result;

      // console.log(message);
      if (success) {
        handleScuess(message);
        setTimeout(() => {
          navigate("/login");
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
        handleError(message || "Signup failed");
      }
    } catch (err) {
      handleError("Something went wrong. Please try again.");
      console.error(err);
    }
  };
  return (
    <div className="container">
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            value={signupInfo.name}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={signupInfo.email}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={signupInfo.password}
            placeholder="Enter Password"
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account?<Link to="/login">Log in</Link>{" "}
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
