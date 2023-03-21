import { RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import '../src/styles/index.css'
import router from "./router/Router"
import StateWrapper from "./context/CartContext"

import { UserProvider } from "./context/UserContext"



ReactDOM.createRoot(document.getElementById('root')).render(
  <StateWrapper>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StateWrapper>
  
)
