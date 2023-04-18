import {useState, useEffect} from 'react'
import {MdDelete, MdEdit} from 'react-icons/md'
//import Modal from './Modal';
import { API_URL } from "../../../constants/env"
import { useUserContext } from '../../../context/UserContext';
import useAdminFetch from "../../../hooks/useAdminFetch";



const AdminProductCreate = () => {
  const user = useUserContext()
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  

  useEffect(() => {
    fetch(`${API_URL}/categories`)
    .then(response => response.json())
    .then( data =>{
      setCategories(data)
    })
   
  },[])

 async function addCategory(e) {
    e.preventDefault();
    
    fetch(`${API_URL}/categories`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + user.authTokens.access
      },
      body: JSON.stringify({"name":category})
    })
    .then(response => response.json())
    .then(data =>{
      setCategories(categories.concat(data))
    })
    .catch(error => console.log('Error:', error)) 

  }

function addProduct(data) {
  fetch(`${API_URL}/products`, {
    method: "POST",
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + user.authTokens.access
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data)
  })
  .catch(error => console.log('Error:', error))
}
 
async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      category_id: e.target.category_id.value,
      image_url: ""
  
    }

    const form= new FormData();
    form.append("image",file)

    fetch(`${API_URL}/products/image`, {
      method: "POST",
      body: form
    })
    .then(response => response.json())
    .then(res =>{
      data.image_url=res.filemane
      addProduct(data)
    })
    .catch(error => console.log('Error:', error))  

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
          {/* <Modal/> */}
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
                      <button className='px-2 py-1 bg-red-700 rounded-sm'><MdDelete/></button>
  
                    </td>
                    </tr>
                  ))}
                 
              </tbody>
            </table>
          </div>
        </div>  
      </section>
      
      <section>
        <h2>Lista de Variantes</h2>

      </section>
    </div>
  )
}

export default AdminProductCreate