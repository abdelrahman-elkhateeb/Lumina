import { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Check for token in localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false); // Set loading to false after checking
  }, []);

  // Logout function to remove token from localStorage and state
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Provide the auth context value to children
  return (
    <AuthContext.Provider value={{ token, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};