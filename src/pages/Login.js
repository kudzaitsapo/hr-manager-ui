import React, { useState } from "react";
import { Authenticate } from "../services/auth";
import { useAuth } from "../providers/auth";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let auth = useAuth();

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: target.value,
      };
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);
    let { from } = location.state || { from: { pathname: "/" } };
    if (formState.email && formState.password) {
      setLoading(true);
      try {
        const response = await Authenticate(formState);
        localStorage.setItem("user", JSON.stringify(response.data.result.user));
        localStorage.setItem("token", response.data.result.token);
        setLoading(false);
        auth.signin(() => history.replace(from));
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.error?.message);
      }
    } else {
      setError("Please fill in all the fields!");
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg 
          transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          ></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center">
                <svg className="flex-shrink-0 h-20 w-20" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                      <stop stopColor="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                      <stop stopColor="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </div>
              <div className="flex justify-center mt-3">
                <h1 className="text-2xl font-semibold">HR Manager Login</h1>
              </div>
              {error && !loading && (
                <div className="mt-3 flex justify-center">
                  <span className="text-red-400">{error}</span>
                </div>
              )}
              {!error && loading && (
                <div className="flex justify-center mt-3">
                  <Loader
                    type="ThreeDots"
                    color="#2BAD60"
                    height="100"
                    width="100"
                  />
                </div>
              )}
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={handleLogin}>
                    <div className="relative">
                      <label htmlFor="email" className="block">
                        Email
                      </label>
                      <input
                        autoComplete="off"
                        name="email"
                        type="text"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 
                      focus:ring-blue-600"
                        placeholder="e.g. johndoe@acme.org"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="relative mt-3">
                      <label htmlFor="password" className="block">
                        Password
                      </label>
                      <input
                        autoComplete="off"
                        name="password"
                        type="password"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 
                      focus:ring-blue-600"
                        placeholder="Password"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="relative mt-3">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
