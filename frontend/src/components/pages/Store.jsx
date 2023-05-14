import React from 'react'
import useFetch from "../../hooks/useFeth"
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/env"
import CardComponent from '../organisms/Card'
import Loader from "../atoms/Loader"

const Store = () => {
  const { data, loading, error } = useFetch(`products`)
 
  if (loading) return <Loader />
  if (error) return <div>{error?.message}</div>
 

 
  return (
    
        <div className='mx-auto px-6 grid md:grid-cols-3 grid-cols-1 gap-4 justify-items-center'>

        {data.map((product) => (
          
            <CardComponent 
              key={product.id}
              img= {`${API_URL}/${product.image_url}`}
              title={product.name}
              content={product.description}
            >
              <Link to={`/productos/${product.id}`}>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                        {product.name}
                    </h3>
              </Link>
                
            </CardComponent> 

          ))}
          </div>
     
  )
}

export default Store