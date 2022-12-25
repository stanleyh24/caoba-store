import { Outlet } from "react-router-dom"
import './App.css'

function App() {
 

  return (
    <div>
      <h1>Hola</h1>
      <div className="pt-16 max-w-256 m-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App
