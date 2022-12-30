import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { API_URL } from "../../constants/env"
import CardComponent from '../organisms/Card'

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/products`).then((response) => {
      setProducts(response.data);
    });
  }, []);
 
  console.log(products)
 
  return (
    <div className='container mx-auto px-6 grid md:grid-cols-3 grid-cols-1 gap-4'>
       {products.map((product) => (
        
          <CardComponent 
            img= {`${API_URL}/${product.image_url}`}
            title={product.name}
            content='Cigarro medio. Tripa y capote dominicano y importada desde Connecticut.'
          /> 

        ))}
    </div>
  )
}

export default Store