import React, { useState } from "react";
import "../css/index.css";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/userSlice";
// import { getCSRFToken } from "../helpers/getCSRFToken";

const Login = () => {
  // create navigate to use for nav
  const navigate = useNavigate();
  // create dispatch to save values globally
  const dispatch = useDispatch();

  // dict to hold user info locally
  const [userInfoLocal, setUserInfoLocal] = useState({
    page: "signIn",
    email: "",
    password: "",
    confirmPass: "",
    username: "",
  });
  // handle errors to display for user
  const [errorMessage, setErrorMessage] = useState("");
  // update local data from user input into sign in and register forms
  const updateForm = (e, key) => [
    setUserInfoLocal({ ...userInfoLocal, [key]: e.target.value }),
  ];

  // for submitting log in credentials for sign in and register
  const handleFormSubmit = (e, API_URL) => {
    e.preventDefault();
    const payload =
      userInfoLocal.page === "signUp"
        ? {
            username: userInfoLocal.username,
            password: userInfoLocal.password,
            confirmPass: userInfoLocal.confirmPass,
            email: userInfoLocal.email,
          }
        : {
            username: userInfoLocal.username,
            password: userInfoLocal.password,
          };

    axiosInstance
      .post(API_URL, payload)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        
        dispatch(
          loginUser({
            username: userInfoLocal.username,
          })
        );
        console.log(localStorage['access_token'])
        navigate("/home");
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          console.error("Backend message:", err.response.data.message);
          setErrorMessage(err.response.data.message);
        } else if (err.request) {
          console.error("No response from server:", err.request);
          setErrorMessage("No response from server. Please try again.");
        } else {
          console.error("Error:", err.message);
          setErrorMessage("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <div className="bg-transparent rounded-lg ">
        <h1 className="text-xl font-semibold text-center text-gray-700 mb-8">
          Log in to your account
        </h1>
        <form
          className="bg-white bg-opacity-40 backdrop-filter rounded-3xl shadow-lg p-4 space-y-3"
          // onSubmit={handleFormSubmit(e,)}
        >
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error</strong>
              <span className="block sm:inline">{errorMessage}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setErrorMessage("")}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          {userInfoLocal.page === "signIn" ? (
            <>
              {/* Sign In Page - existing users */}
              <div>
                <label htmlFor="username">Username</label>
                <input
                  onChange={(e) => {
                    updateForm(e, "username");
                  }}
                  type="username"
                  id="username"
                  placeholder="Your username"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    updateForm(e, "password");
                  }}
                  id="password"
                  placeholder="Your Password"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="px-4 py-2 border-2 border-transparent shadow-md hover:border-sky-400 hover:shadow-[0_0_15px_3px_rgba(56,189,248,0.6)] active:scale-95 transition-all duration-200 ease-in-out bg-white bg-opacity-30 backdrop-filter rounded-xl text-sky-700 font-semibold"
                  onClick={(e) => handleFormSubmit(e, "api/token/")}
                >
                  Login
                </button>
                No Account?{" "}
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setUserInfoLocal({ ...userInfoLocal, page: "signUp" })
                  }
                >
                  Sign up
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Register Page - NONexisting users */}
              <div>
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    updateForm(e, "email");
                  }}
                  id="email"
                  placeholder="Email"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  onChange={(e) => {
                    updateForm(e, "username");
                  }}
                  id="username"
                  placeholder="Your username"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    updateForm(e, "password");
                  }}
                  id="password"
                  placeholder="Your Password"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div>
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  onChange={(e) => {
                    updateForm(e, "confirmPass");
                  }}
                  id="password"
                  placeholder="Your Password"
                  className="flex-auto bg-transparent outline-none mx-2 pl-2 text-gray-700 font-semibold"
                />
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="px-4 py-2 border-2 border-transparent shadow-md hover:border-sky-400 hover:shadow-[0_0_15px_3px_rgba(56,189,248,0.6)] active:scale-95 transition-all duration-200 ease-in-out bg-white bg-opacity-30 backdrop-filter rounded-xl text-sky-700 font-semibold"
                  onClick={(e) => handleFormSubmit(e, "register/")}
                >
                  Register
                </button>
                <button
                  className="pt-4"
                  onClick={() => {
                    setUserInfoLocal({ ...userInfoLocal, page: "signIn" });
                    setErrorMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
