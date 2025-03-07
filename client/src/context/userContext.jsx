import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Fetch user data from API
    const getUser = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/user/user");
            setUser(data.user);
            if(!data) setUser(null)
        } catch (error) {
            setUser(null)
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // ✅ Log user AFTER it updates
    useEffect(() => {
        setUser(user)
        console.log(user)
    }, [user]);

    return (
        <UserContext.Provider value={{ loading, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use UserContext
export const useUser = () => {
    return useContext(UserContext);
};
