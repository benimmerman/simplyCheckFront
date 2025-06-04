import React, { useState } from "react";
import "../index.css";
import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../state/userSlice";
import {
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import { Spinner } from "./helpers/Spinner";
import { AlertBanner } from "./helpers/Alerts";
import { decrementTime } from "../state/countdownSlice";

const Login = () => {
  // create navigate to use for nav
  const navigate = useNavigate();
  // create dispatch to save values globally
  const dispatch = useDispatch();

  // variable to show spinner
  const [showSpinner, setShowSpinner] = useState(false);

  // dict to hold user info locally
  const [userInfoLocal, setUserInfoLocal] = useState({
    page: "signIn",
    email: "",
    password: "",
    confirmPass: "",
    username: "",
  });

  // Email validation regex
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // touched for error
  const initialTouchedState = {
    email: false,
    username: false,
    password: false,
    confirmPass: false,
  };
  const [touched, setTouched] = useState(initialTouchedState);
  // handle errors to display for user
  const [errorMessage, setErrorMessage] = useState("");
  // update local data from user input into sign in and register forms
  const updateForm = (e, key) => [
    setUserInfoLocal({ ...userInfoLocal, [key]: e.target.value }),
  ];

  // for submitting log in credentials for sign in and register
  const handleFormSubmit = (e, API_URL) => {
    // hide button show spinner
    setShowSpinner(true);
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
        dispatch(decrementTime());
        // hide spinner show button
        setShowSpinner(false);
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        dispatch(
          loginUser({
            username: userInfoLocal.username,
          })
        );
        console.log(localStorage["access_token"]);
        navigate("/home");
      })

      .catch((err) => {
        dispatch(decrementTime());
        // hide spinner show button
        setShowSpinner(false);
        console.log(err);
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

  const createAccount = [
    {
      input: "email",
      value: "email",
      placeholder: "Email (optional)",
      icon: <EnvelopeIcon className="text-gray-400 w-5 h-5" />,
      error: <></>,
    },
    {
      input: "username",
      value: "username",
      placeholder: "Username",
      icon: <UserIcon className="text-gray-400 w-5 h-5" />,
      error: (
        <p
          className={`text-red-500 text-xs flex items-center w-full ${
            touched.username &&
            (userInfoLocal.username.length < 3 ||
              userInfoLocal.username.length > 30)
              ? "visible h-[1.25rem]"
              : "invisible h-0"
          }`}
        >
          <ExclamationCircleIcon className="w-4 h-4 mr-1" />
          Must be between 3 and 30 characters.
        </p>
      ),
    },
    {
      input: "password",
      value: "password",
      placeholder: "Password",
      icon: <LockClosedIcon className="text-gray-400 w-5 h-5" />,
      error: (
        <p
          className={`text-red-500 text-xs flex items-center w-full ${
            touched.password && userInfoLocal.password.length < 12
              ? "visible h-[1.25rem]"
              : "invisible h-0"
          }`}
        >
          <ExclamationCircleIcon className="w-4 h-4 mr-1" />
          Password must be at least 12 characters.
        </p>
      ),
    },
    {
      input: "password",
      value: "confirmPass",
      placeholder: "Confirm Password",
      icon: <LockClosedIcon className="text-gray-400 w-5 h-5" />,
      error: (
        <p
          className={`text-red-500 text-xs flex items-center w-full ${
            touched.confirmPass &&
            userInfoLocal.password !== userInfoLocal.confirmPass
              ? "visible h-[1.25rem]"
              : "invisible h-0"
          }`}
        >
          <ExclamationCircleIcon className="w-4 h-4 mr-1" />
          Password does not match.
        </p>
      ),
    },
  ];

  return (
    <>
      <div className="flex h-screen w-screen bg-page/30 items-center justify-center ">
        <div className="relative w-full h-full md:max-w-7xl md:h-[600px] md:rounded-2xl overflow-hidden shadow-xl">
          {/* Sliding Background Panel */}
          <div className="absolute inset-0 overflow-y-auto flex flex-col md:flex-row bg-white">
            {/* Sign In Panel */}
            <div
              className={`md:w-1/2 h-1/2 md:h-full p-10 flex flex-col justify-center items-center transition-all duration-500 ease-in-out z-10 ${
                userInfoLocal.page !== "signIn"
                  ? "bg-gradient-to-br from-gray-200 to-purple-500 text-white"
                  : "opacity-100 text-dark-purple"
              }`}
            >
              {userInfoLocal.page !== "signIn" ? (
                <>
                  <div className="z-50 flex flex-col p-5 text-white items-center justify-center text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-sm text-gray-200 mb-6 max-w-xs">
                      Log in with your Trackly credentials to continue your
                      journey with us
                    </p>
                    <button
                      onClick={() => {
                        // reset touched
                        setTouched(initialTouchedState);
                        setUserInfoLocal({ ...userInfoLocal, page: "signIn" });
                      }}
                      className="cursor-pointer w-40 uppercase px-6 py-2 rounded-3xl border border-white text-white  transition duration-300"
                    >
                      Sign in
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col p-5 items-center justify-center space-y-6 text-center text-dark-purple">
                    <h2 className="text-3xl font-bold flex flex-col items-center">
                      <div className="items-center">
                        <img src="/icon.png" className="h-20" />
                      </div>
                      Sign In to Trackly
                    </h2>
                    {/* if error show banner */}
                    {errorMessage && (
                      <AlertBanner
                        type="error"
                        message={"Invalid username or password."}
                        dismissible={true}
                        setErrorMessage={setErrorMessage}
                      />
                    )}
                    <form
                      onSubmit={(e) => handleFormSubmit(e, "api/token/")}
                      className="flex flex-col space-y-2 items-center w-full"
                    >
                      <div className="flex w-full mb-2 items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-dark-purple">
                        <UserIcon className="text-gray-400 w-5 h-5" />
                        <input
                          onChange={(e) => updateForm(e, "username")}
                          type="text"
                          value={userInfoLocal.username}
                          id="username"
                          placeholder="Username"
                          onBlur={() =>
                            setTouched({ ...touched, username: true })
                          }
                          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                      </div>
                      <p
                        className={`text-red-500 text-xs flex items-center mt-1 w-full ${
                          touched.username &&
                          userInfoLocal.username.length === 0
                            ? "visible h-[1.25rem]"
                            : "invisible h-0"
                        }`}
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        Cannot be blank.
                      </p>

                      <div className="flex w-full mb-2 items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-dark-purple">
                        <LockClosedIcon className="text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={userInfoLocal.password}
                          onChange={(e) => {
                            updateForm(e, "password");
                          }}
                          onBlur={() =>
                            setTouched({ ...touched, password: true })
                          }
                          id="password"
                          placeholder="Password"
                          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                      </div>
                      <p
                        className={`text-red-500 text-xs flex items-center mt-1 w-full px-4 ${
                          touched.password &&
                          userInfoLocal.password.length === 0
                            ? "visible h-[1.25rem]"
                            : "invisible h-0"
                        }`}
                      >
                        <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                        Cannot be blank.
                      </p>

                      <div>
                        {showSpinner ? (
                          <Spinner />
                        ) : (
                          <button
                            className={`mt-2 w-40 uppercase px-6 py-2 rounded-3xl border transition duration-300 ${
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === ""
                                ? "bg-dark-purple/50 border-white text-white cursor-not-allowed"
                                : "bg-dark-purple border-white text-white hover:bg-dark-purple/90 cursor-pointer"
                            }`}
                            onClick={(e) => handleFormSubmit(e, "api/token/")}
                            disabled={
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === ""
                            }
                            title={
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === ""
                                ? "Fill out username and password"
                                : ""
                            }
                          >
                            Log in
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Sign Up Panel */}

            <div
              className={`md:w-1/2 min-h-1/2  md:h-full p-10 flex flex-col justify-center items-center transition-all duration-500 ease-in-out z-10 ${
                userInfoLocal.page === "signIn"
                  ? "bg-gradient-to-br from-gray-200 to-purple-500 text-white"
                  : "opacity-100 text-dark-purple"
              }`}
            >
              {userInfoLocal.page === "signIn" ? (
                <>
                  <div className="z-50 flex flex-col p-5 text-white items-center justify-center text-center">
                    <h2 className="text-3xl font-bold mb-4">
                      Welcome to Trackly
                    </h2>
                    <p className="text-sm text-gray-200 mb-6 max-w-xs">
                      Enter your personal details and start your journey with
                      Trackly
                    </p>
                    <button
                      onClick={() => {
                        // reset touched
                        setTouched(initialTouchedState);
                        // update page
                        setUserInfoLocal({ ...userInfoLocal, page: "signUp" });
                      }}
                      className="cursor-pointer w-40 uppercase px-6 py-2 rounded-3xl border border-white text-white  transition duration-300"
                    >
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col p-5 items-center justify-center space-y-6 text-center text-dark-purple">
                    <h2 className="text-2xl font-bold flex flex-col items-center">
                      <div className="items-center">
                        <img src="/icon.png" className="h-16" />
                      </div>
                      Create an Account
                    </h2>
                    {/* if error show banner */}
                    {errorMessage && (
                      <AlertBanner
                        type="error"
                        message={"An error occured, please try again."}
                        dismissible={true}
                        setErrorMessage={setErrorMessage}
                      />
                    )}
                    <form
                      onSubmit={(e) => handleFormSubmit(e, "register/")}
                      className="flex flex-col items-center w-full"
                    >
                      {createAccount.map((item, index) => (
                        <div className="flex flex-col w-full">
                          <div className="flex w-full mb-4 items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 pb-2 shadow-sm focus-within:ring-2 focus-within:ring-dark-purple">
                            {item.icon}
                            <input
                              onChange={(e) => updateForm(e, item.value)}
                              value={userInfoLocal[item.value]}
                              type={item.input}
                              id={index}
                              placeholder={item.placeholder}
                              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                              onBlur={() =>
                                setTouched({ ...touched, [item.input]: true })
                              }
                            />
                          </div>
                          <div className="w-full">{item.error}</div>
                        </div>
                      ))}

                      {/* Submit Button */}
                      <div>
                        {showSpinner ? (
                          <Spinner />
                        ) : (
                          <button
                            className={`mt-2 w-40 uppercase px-6 py-2 rounded-3xl border text-white transition duration-300 ${
                              // Button is disabled if there's an error in any of the fields
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === "" ||
                              userInfoLocal.confirmPass === "" ||
                              // userInfoLocal.email === "" ||
                              // (touched.email &&
                              //   !emailRegex.test(userInfoLocal.email)) ||
                              (touched.username &&
                                (userInfoLocal.username.length < 3 ||
                                  userInfoLocal.username.length > 30)) ||
                              (touched.password &&
                                userInfoLocal.password.length < 12) ||
                              (touched.confirmPass &&
                                userInfoLocal.password !==
                                  userInfoLocal.confirmPass)
                                ? "bg-dark-purple/50  cursor-not-allowed"
                                : "bg-dark-purple hover:bg-dark-purple/90 cursor-pointer"
                            }`}
                            onClick={(e) => handleFormSubmit(e, "register/")}
                            disabled={
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === "" ||
                              userInfoLocal.confirmPass === "" ||
                              // userInfoLocal.email === "" ||
                              // (touched.email &&
                              //   !emailRegex.test(userInfoLocal.email)) ||
                              (touched.username &&
                                (userInfoLocal.username.length < 3 ||
                                  userInfoLocal.username.length > 30)) ||
                              (touched.password &&
                                userInfoLocal.password.length < 12) ||
                              (touched.confirmPass &&
                                userInfoLocal.password !==
                                  userInfoLocal.confirmPass)
                            }
                            title={
                              userInfoLocal.username === "" ||
                              userInfoLocal.password === "" ||
                              userInfoLocal.confirmPass === "" ||
                              // userInfoLocal.email === "" ||
                              // (touched.email &&
                              //   !emailRegex.test(userInfoLocal.email)) ||
                              (touched.username &&
                                (userInfoLocal.username.length < 3 ||
                                  userInfoLocal.username.length > 30)) ||
                              (touched.password &&
                                userInfoLocal.password.length < 12) ||
                              (touched.confirmPass &&
                                userInfoLocal.password !==
                                  userInfoLocal.confirmPass)
                                ? "Please fix the errors to enable signup"
                                : ""
                            }
                          >
                            Sign up
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
