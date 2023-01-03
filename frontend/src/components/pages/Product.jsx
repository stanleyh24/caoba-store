import React from 'react'
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFeth"
import Loader from "../atoms/Loader"
import { API_URL } from "../../constants/env"


const Product = () => {
    const params = useParams()
    const { data, loading, error } = useFetch(`products/${params.id}`)
    if (loading) return <Loader />
    if (error) return <div>{error?.message}</div>
    
  return (
    <div className='container'>
        <div>
        <img
            className="object-scale-down w-full h-64"
            src={`${API_URL}/${data.image_url}`}
            alt="image"
            />
        </div>
        <div>
            <h1>{data.name}</h1>
        </div>
    </div>
  )
}

export default Product