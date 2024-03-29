import {useState, useEffect} from 'react'
import {MdDelete, MdEdit} from 'react-icons/md'
import { API_URL } from "../../../constants/env"
import { useUserContext } from '../../../context/UserContext';
import useAdminFetch from "../../../hooks/useAdminFetch";
import { useNavigate } from "react-router-dom"



const AdminProductCreate = () => {
  const user = useUserContext()
  const nav = useNavigate()

  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
 
  let api = useAdminFetch()

  useEffect(() => {
    fetch(`${API_URL}/categories`)
    .then(response => response.json())
    .then( data =>{
      setCategories(data)
    })
   
  },[])

 async function addCategory(e) {
    e.preventDefault();
   
    let {response, data} = await api('/categories',{
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"name":category})
    })

    if (response.status === 201){
      setCategories(categories.concat(data))
      e.target.category.value = ''
    }
  } 


  async function deleteCategory (id) {
    let {response} = await api(`/categories/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (response.status === 200) {
      let c = categories.filter(c => c.id != id)
      setCategories(c)
    }
  
  }

 async function addProduct(productData) {
  let {response, data} = await api('/products', {
    method: "POST",
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify(productData)
  })

  if (response.status === 201) {
    nav(`/admin/productos/${data.id}/variants`)
  }

}
 
async function handleSubmit(e) {
    e.preventDefault();

    let productData = {
      name: e.target.name.value,
      description: e.target.description.value,
      category_id: e.target.category_id.value,
      image_url: ""
  
    }

    const form= new FormData();
    form.append("image",file)

    let {response, data} = await api('/products/image',{
      method: "POST",
      body: form
    })
    if (response.status === 201) {
      productData.image_url= data.filemane
      addProduct(productData)
    }
  }



  return (
    <div className="pt-10 ">
      <h1 className="text-4xl mb-6 secondary-color font-semibold">Crear Producto</h1>

      <section className='w-full flex bg-white'>
        
        <div className='w-2/3 m-4 '>
          <h2 className='mb-4 text-xl secondary-color'>Nuevo Producto</h2>
          <div className='flex border p-4 '>
          <div className='flex-1'>
          <form method='post' onSubmit={handleSubmit}>
            <div className="mb-6 max-w-md">
                <label htmlFor="name" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Nombre</label>
                <input type="text" id="name" name="name"  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name" required/>
              </div>

              <div className="mb-6 max-w-md">
                <label htmlFor="category_id" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Categoria</label>
                <select name="category_id" id="category_id" className='w-full' required>
                <option value="">----------------</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Imagen</label>
                <input type="file" name='image' id='image' onChange={(e) => setFile(e.target.files[0])}  required/>
              </div>
          
            <div className="max-w-md">
                <label htmlFor="description" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Descripcion</label>
                <textarea name="description" id="description" cols="30" rows="10" required></textarea>
            </div>
              
          
          <button className='px-8 py-4 rounded-lg font-semibold bg-gray-400 secondary-color m-8'>Cancelar</button>
          <button type="submit" className='bg-[#AD7A06] px-8 py-4 rounded-lg font-semibold secondary-color m-8'>Guardar</button>
          </form>
          </div>
          <div className='flex justify-center align-middle'>
          {file ? <img src={URL.createObjectURL(file)} className="w-64 h-64"/> : <img src="" className="w-64 h-64"/>}
          
          </div>
          </div>
        </div>

        <div className='w-1/3 m-4'>
        <h2 className='mb-4 text-xl secondary-color'>Categorias</h2>
          <div className='flex border p-4 flex-col'>
            <form method='post' onSubmit={addCategory}>
              <input type="text" name='category' onChange={(e) => setCategory(e.target.value)} className="appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
              <button type="submit" className='ml-4 bg-[#AD7A06] secondary-color px-4 py-2 rounded-lg font-semibold' >Agregar</button>
            </form>

            <table className='mt-8'>
              <thead>
                <tr>
                  <td className='font-semibold secondary-color'>Nombre</td>
                  <td className='font-semibold secondary-color'>Acciones</td>
                </tr>
              </thead>
              <tbody>
                
                  {categories.map((c) => (
                    <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>
                      <button className='px-2 py-1 bg-yellow-400 rounded-sm mr-2'><MdEdit/></button>
                      <button onClick={() => deleteCategory(c.id)} className='px-2 py-1 bg-red-700 rounded-sm'><MdDelete/></button>
  
                    </td>
                    </tr>
                  ))}
                 
              </tbody>
            </table>
          </div>
        </div>  
      </section>
      
    </div>
  )
}

export default AdminProductCreate