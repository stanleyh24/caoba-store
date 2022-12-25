import { createBrowserRouter } from "react-router-dom"
import Contact from "../components/pages/Contact"
import History from "../components/pages/History"
import Home from "../components/pages/Home"
import Products from "../components/pages/Products"
import Store from "../components/pages/Store"
import App from "../components/templates/App"


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error404 />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/productos",
          element: <Products />,
        },
        {
          path: "/historia",
          element: <History />,
        },
        {
          path: "/tienda",
          element: <Store />,
        },
        {
          path: "/contactos",
          element: <Contact />,
        }
      ],
    },

   
  ])
  
  export default router