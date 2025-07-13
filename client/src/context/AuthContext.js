import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("auth");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setProfile(userData.user);
      setIsAuthenticated(true);
      if (userData.user?.admin) {
        setIsAdmin(userData.user.admin === true);
      }
    }
  }, []);

  const logIn = (userData, token) => {
    const userWithPhoto = {
      ...userData.user,
      photoURL: userData.user?.photoURL || userData.photoURL || null,
    };

    setIsLoggedIn(true);
    setProfile(userWithPhoto);
    setIsAuthenticated(true);

    localStorage.setItem(
      "auth",
      JSON.stringify({ ...userData, user: userWithPhoto })
    );
    localStorage.setItem("jwtToken", token);

    if (userWithPhoto.admin) {
      setIsAdmin(userWithPhoto.admin === true);
    }
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setProfile(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/");
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);

    const storedUserData = localStorage.getItem("auth");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      userData.user = {
        ...userData.user,
        ...updatedProfile,
      };
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

export const useAuth = () => useContext(AuthContext);
