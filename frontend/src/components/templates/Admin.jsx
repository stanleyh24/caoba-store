import { Outlet } from "react-router-dom"
import AdminNav from "../organisms/AdminNav"


const Admin = () => {
  return (
    <div className="bg-primary">
      <AdminNav/>
      <div className="pt-16 max-w-256 m-auto container">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin