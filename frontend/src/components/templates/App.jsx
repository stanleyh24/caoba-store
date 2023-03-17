import { Outlet } from "react-router-dom"

import Nav from "../organisms/Nav"


function App() {
  return (
    <div className="bg-gray-100 bg-primary ">
      <Nav/>
      <div className='pt-14 w-full h-full'>
        <Outlet />
      </div>
         
    </div>
  )
}

export default App