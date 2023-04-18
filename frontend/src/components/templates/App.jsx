import { Outlet } from "react-router-dom"

import Nav from "../organisms/Nav"


function App() {
  return (
    <div className="bg-gray-100 bg-primary ">
      <div className="mb-20">
      <Nav/>
      </div>
      <div className='w-full h-full'>
        <Outlet />
      </div>
         
    </div>
  )
}

export default App