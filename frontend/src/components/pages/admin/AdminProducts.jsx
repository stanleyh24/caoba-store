import { Link } from "react-router-dom";
import CardComponent from '../../organisms/Card'
import { API_URL } from "../../../constants/env"
import useFetch from "../../../hooks/useFeth"
import Loader from "../../atoms/Loader"


const AdminProducts = () => {
  const { data, loading, error } = useFetch(`products/`)
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <div>{error?.message}</div>
  }


  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Productos</h1>
        <div className="pt-1 mb-12 pb-1">
          <Link className="bg-[#AD7A06] button py-2 px-4 rounded-sm" to="/admin/productos/crear">
            Agregar producto
          </Link>

          <div className="mt-8 grid grid-cols-4 gap-3">
            {data.map((product) => (
            
              <CardComponent 
                key={product.id}
                img= {`${API_URL}/${product.image_url}`}
                title={product.name}
                content={product.description}
              >
                
                <Link to={`/admin/productos/${product.id}/variants`}>
                      <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                          {product.name}
                      </h3>
                </Link>
                  
              </CardComponent> 

            ))}
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default AdminProducts