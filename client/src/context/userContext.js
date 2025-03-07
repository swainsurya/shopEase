import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Function to log in
    const login = () => {
        setIsLoggedIn(true);
    };

    // Function to log out
    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use UserContext
export const useUser = () => {
    return useContext(UserContext);
};
