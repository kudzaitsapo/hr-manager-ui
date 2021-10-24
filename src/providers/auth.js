import React, { useState, useContext, createContext } from "react";
import jwt from "jwt-decode";

const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const decodedJwt = token ? jwt(token) : null;
  const now = new Date().getTime();
  var expiryTime = decodedJwt ? new Date(decodedJwt.exp).getTime() : null;

  const initialState =
    localUser && token && expiryTime && expiryTime <= now ? localUser : null;
  if (localUser && token && expiryTime && now < expiryTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  const [user, setUser] = useState(initialState);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      const localUser = JSON.parse(localStorage.getItem("user"));
      setUser(localUser);
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
