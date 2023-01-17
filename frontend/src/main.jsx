import { RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import router from "./router/Router"
import StateWrapper from "./context/CartContext"



ReactDOM.createRoot(document.getElementById('root')).render(
  <StateWrapper>
    <RouterProvider router={router} />
  </StateWrapper>
  
)
