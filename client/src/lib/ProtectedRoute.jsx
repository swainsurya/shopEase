import { useUser } from "@/context/userContext";
import { Navigate, Outlet } from "react-router-dom";
 

const ProtectedRoute = () => {
  const { user } = useUser()
  return(
    user ? <Outlet/> : (<Navigate to={"/login"} />)
  )
}

export default ProtectedRoute
