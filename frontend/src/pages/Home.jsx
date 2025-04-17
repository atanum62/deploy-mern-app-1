import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleScuess } from "../Util";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [loggedinuser, setloggedinuser] = useState("");
  const [products, setproducts] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize useNavigate
  useEffect(() => {
    setloggedinuser(localStorage.getItem("loggedInuser"));
  }, []);

  const logout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInuser");
    handleScuess("user logged out scuessfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  // fetch product data
  async function fetchProducts() {
    try {
      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await axios.get(
        "https://deploy-mern-app-1-two.vercel.app/products/",
        headers
      );
      // console.log(response);
      setproducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //---------------------------------------
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedinuser}</h1>
      <button onClick={logout}>Logout</button>
      <div>
        {products.map((items) => {
          return (
            <>
              <span key={items.id}>
                {items.name}:{items.price}
              </span>
              <br />
            </>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
