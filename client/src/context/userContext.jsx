import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [getProducts , setProducts] = useState([])
    const [isProductAdded, setIsProductAdded] = useState(false)

    // Fetch user data from API
    const getUser = async () => {
        const token = localStorage.getItem("token_user");
        setLoading(true);
        try {
            const { data } = await axios.get(
                "https://shopease-server-f7ke.onrender.com/api/user/user",
                { withCredentials: true }
            );
            
            setUser(data.user);
            console.log(user)
            console.log(token)
            if(!data) setUser(null)
        } catch (error) {
            setUser(null)
            console.error("Error fetching user:", error);
        } finally {
            setTimeout(()=>{ setLoading(false) },1000)
        }
    };

    const fetchProducts = async() => {
        setLoading(true)
        try {
            const req = await axios.get("https://shopease-server-f7ke.onrender.com/api/product/all")
            setProducts(req.data.products)
            console.log(req.data.products)
            console.log(getProducts)
        } catch (error) {
            console.log(error)
            toast.error("Server error try again")
        }
        finally{
            setTimeout(()=>{setLoading(false)},2000) ;
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    // ✅ Log user AFTER it updates
    useEffect(() => {
        setUser(user)
    }, []);

    // fetch all products 
    useEffect(()=> {
        fetchProducts();
    },[isProductAdded,setProducts])

    return (
        <UserContext.Provider value={{ loading, user, setUser , getProducts, setProducts, setIsProductAdded , isProductAdded,setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to use UserContext
export const useUser = () => {
    return useContext(UserContext);
};
