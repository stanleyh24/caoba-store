import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import App from "../components/templates/App"
import Home from "../components/pages/Home"
import Products from "../components/pages/Products"
import History from "../components/pages/History"
import Store from "../components/pages/Store"
import Contact from "../components/pages/Contact"


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement: <Error404/>,
        children: [
            {
                index:true,
                element: <Home/>
            },
            {
                path:'/productos',
                element:<Products/>
            },
            {
                path:'/historia',
                element:<History/>,
            },
            {
                path:'/tienda',
                element:<Store/>,
            },
            {
                path:'/contactos',
                element:<Contact/>
            }
        ],
    }, 
   
    
])

export default router