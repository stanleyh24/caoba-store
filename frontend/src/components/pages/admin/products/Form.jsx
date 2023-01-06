import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../../../constants/env"
import useFetch from "../../../../hooks/useFeth"
import Select from "react-select"
import Loader from "../../../atoms/Loader"


const Form = () => {
  const [image, setImage] = useState(null)
  const [product, setProduct] = useState()
  const [selectedCategoryId, setSelectedCategoryId] = useState()
  const categories=[]

  let body = {}
  const { data, loading, error } = useFetch(`categories`)
  
  const handleUpload = (e) => {
    setImage(e.target.files[0])
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    
     body = {
      name: e.target.productName.value,
      category_id: selectedCategoryId,
      image_url: ""
      }
      const data = new FormData();
      data.append('image', image);
      axios.post(`${API_URL}/products/image`, data)
      .then(res => {
          body.image_url=res.data.filemane
          console.log(body);
          axios.post(`${API_URL}/products`, body)
          .then(res => {
              console.log(res.data)
          })
      })
  }

  if (loading) return <Loader />
  if (error) return <div>{error?.message}</div>

  data.forEach(element => {
    categories.push({label: element.name, value: element.id})
  });

  const handleSelectChange = ({value}) => {
    setSelectedCategoryId(value)
  };
  
  return(
    <form onSubmit={handleSubmit} className="bg-slate-200">
      <h1>Create Product</h1>
      <input type="file" name="image" id="image" onChange={handleUpload} />
      
      <div>
          <label htmlFor="productName">Nombre del producto</label>
          <input
            type="text"
            name="productName"
            defaultValue={product && product.name}
            required
          />
      </div>
      <div>
          <label>Categoria del producto</label>
          <Select options={categories} onChange={handleSelectChange}/>
      </div>
      <div>
        <button type="submit">Guardar</button>
      </div>
      
      </form>
  )
}

export default Form
