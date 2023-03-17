import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import App from "../components/templates/App"
import Home from "../components/pages/Home"
import Products from "../components/pages/Products"
import History from "../components/pages/History"
import Store from "../components/pages/Store"
import Contact from "../components/pages/Contact"
import Product from "../components/pages/Product"
import Cart from "../components/pages/Cart"
import Payment from "../components/pages/Payment"
import Admin from "../components/templates/Admin"
import Login from "../components/pages/admin/Login"
import Orders from "../components/pages/admin/Orders"
import AdminProducts from "../components/pages/admin/AdminProducts"
import AdminProductCreate from "../components/pages/admin/AdminProductCreate"


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
                path: 'productos/:id',
                element:<Product/>
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
            },
            {
              path:'/cart',
              element:<Cart/>
            },
            {
              path:'/pago-exitoso',
              element:<Payment/>
            },
        ],       
    },
    {
      path:"admin/login",
      element: <Login />,
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
          
          {
            path: "/admin/ordenes",
            element: <Orders/>,
          },
          {
            path: "/admin/productos",
            element: <AdminProducts/>,
          },
          {
            path: "/admin/productos/crear",
            element: <AdminProductCreate/>,
          }, 
        ],
      },   
    
])

export default router