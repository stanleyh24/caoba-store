import { Outlet } from "react-router-dom"
import Footer from "../organisms/Footer"
import Nav from "../organisms/Nav"


function App() {
  return (
    <div className="bg-gray-100 h-full">
      <Nav/>
      <div className='pt-16 w-full h-full'>
        <Outlet />
      </div>
    {/* <Footer/> */}
      
    </div>
  )
}

export default App