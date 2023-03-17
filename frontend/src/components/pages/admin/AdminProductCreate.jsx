import {useState} from 'react'
import {MdDelete, MdEdit} from 'react-icons/md'
import Modal from './Modal';

const AdminProductCreate = () => {
  const [file, setFile] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();


  function addCategory(e) {
    e.preventDefault();
    
    console.log(categories)
  }

  function handleChange(e) {
    e.preventDefault();
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="pt-10 ">
      <h1 className="text-4xl mb-6 secondary-color font-semibold">Crear Producto</h1>

      <section className='w-full flex bg-white'>
        
        <div className='w-2/3 m-4 '>
          <h2 className='mb-4 text-xl secondary-color'>Nuevo Producto</h2>
          <div className='flex border p-4 '>
          <div className='flex-1'>
          <form>
            <div className="mb-6 max-w-md">
                <label htmlFor="name" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Nombre</label>
                <input type="text" id="name" name="name" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name" required/>
              </div>

              <div className="mb-6 max-w-md">
                <label htmlFor="category" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Categoria</label>
                <select name="category" id="category" className='w-full'>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="image" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Imagen</label>
                <input accept="image/*" type="file" name='image' id='image' onChange={handleChange}/>
              </div>
          
            <div className="max-w-md">
                <label htmlFor="description" className="secondary-color block mb-2 text-sm font-medium text-color dark:text-white">Descripcion</label>
                <textarea name="description" id="description" cols="30" rows="10"></textarea>
            </div>
              
          
          <button className='px-8 py-4 rounded-lg font-semibold bg-gray-400 secondary-color m-8'>Cancelar</button>
          <button className='bg-[#AD7A06] px-8 py-4 rounded-lg font-semibold secondary-color m-8'>Guardar</button>
          </form>
          </div>
          <div className='flex justify-center align-middle'>
          <img src={file} className="w-64 h-64"/>
          </div>
          </div>
        </div>

        <div className='w-1/3 m-4'>
        <h2 className='mb-4 text-xl secondary-color'>Categorias</h2>
          <div className='flex border p-4 flex-col'>
            <form>
              <input type="text" name='category' onChange={(e) => setCategory(e.target.value)} className="appearance-none  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"/>
              <button className='ml-4 bg-[#AD7A06] secondary-color px-4 py-2 rounded-lg font-semibold' onClick={addCategory}>Agregar</button>
            </form>

            <table className='mt-8'>
              <thead>
                <tr>
                  <td className='font-semibold secondary-color'>Nombre</td>
                  <td className='font-semibold secondary-color'>Acciones</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>caoba premium</td>
                  <td>
                    <button className='px-2 py-1 bg-yellow-400 rounded-sm mr-2'><MdEdit/></button>
                    <button className='px-2 py-1 bg-red-700 rounded-sm'><MdDelete/></button>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>  
      </section>
      <Modal/>
      <section>
        <h2>Lista de Variantes</h2>

      </section>
    </div>
  )
}

export default AdminProductCreate