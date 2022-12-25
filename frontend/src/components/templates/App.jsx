import { Outlet } from "react-router-dom"
import Nav from "../organisms/Nav"


function App() {
  return (
    <div className="bg-gray-100 h-full">
      <Nav/>
      <div className='pt-16 w-full'>
      <Outlet />
      </div>
      
    </div>
  )
}

export default App