import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("auth");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setProfile(userData.user);
      setIsAuthenticated(true);
      if (userData.user && userData.user.admin) {
        setIsAdmin(userData.user.admin === true); // Assuming admin 1 indicates admin
      }
    }
  }, []);

  const logIn = (userData, token) => {
    setIsLoggedIn(true);
    setProfile(userData.user);
    localStorage.setItem("auth", JSON.stringify(userData));
    localStorage.setItem("jwtToken", token);
    setIsAuthenticated(true);
    if (userData.user && userData.user.admin) {
      console.log("admin he kya", userData.user.admin);
      setIsAdmin(userData.user.admin === true); // Assuming admin 1 indicates admin
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setProfile(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);

    // Update the profile in localStorage as well
    const storedUserData = localStorage.getItem("auth");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData.user = updatedProfile;
      localStorage.setItem("auth", JSON.stringify(userData));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        profile,
        logIn,
        logOut,
        updateProfile,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
