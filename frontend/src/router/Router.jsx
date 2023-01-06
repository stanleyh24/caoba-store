import { createBrowserRouter } from "react-router-dom"
import Error404 from "../components/pages/Error404"
import App from "../components/templates/App"
import Admin from "../components/templates/Admin"
import Home from "../components/pages/Home"
import Products from "../components/pages/Products"
import History from "../components/pages/History"
import Store from "../components/pages/Store"
import Contact from "../components/pages/Contact"
import Product from "../components/pages/Product"
import Sales from "../components/pages/admin/Sales"
import Table from "../components/pages/admin/products/Table"
import Form from "../components/pages/admin/products/Form"


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
            }
        ],
        
    }, 

    {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "/admin/ventas",
            element: <Sales />,
          },
          {
            path: "/admin/productos",
            element: <Table />,
          },
          {
            path: "/admin/productos/crear",
            element: <Form />,
          },
          {
            path: "/admin/productos/editar/:id",
            element: <Form />,
          },
        ],
      },
   
    
])

export default router