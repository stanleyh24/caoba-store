import { Outlet, Navigate } from "react-router-dom"
import AdminNav from "../organisms/AdminNav"

import { useUserContext } from "../../context/UserContext"

const Admin = () => {
  const user = useUserContext()
  
  return (
   user.authTokens ? 
    <div className="bg-primary">
      <AdminNav/>
      <div className="pt-16 max-w-256 m-auto container">
        <Outlet />
      </div>
    </div>
    : <Navigate to={"/admin/login"} />
  )
}

export default Admin