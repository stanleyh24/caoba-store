import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import useAdminFetch from "../../../hooks/useAdminFetch";
import { API_URL } from "../../../constants/env"
import {MdDelete, MdEdit} from 'react-icons/md'


const AdminAddVariant = () => {
    const params = useParams()
    let api = useAdminFetch()

    const [product, setProduct] = useState()
    const [variants, setVariants] = useState()
    const [variantsSelected, setVariantSelected] = useState()
    const [isChecked, setIsChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    async function getProduct(){
      let {response, data} = await api(`/products/${params.id}`,{ 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})

      if (response.status === 200) {
        setProduct(data)
      }
    }

    async function getVariants(){
      let {response, data} = await api(`/products/${params.id}/variants`,{ 
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})

      if (response.status === 200) {
        setVariants(data)
      }
    }

    const deleteVariant = async (item) => {

      let {response, data} = await api(`/products/${item.product_id}/variant/${item.id}`,{
        method: 'DELETE',
        mode: 'cors',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }       
      })

      if (response.status === 200) {
        let v = variants.filter(c => c.id != item.id)
        setVariants(v)
      }
    }
    
    useEffect(() => {
      getProduct();
      getVariants();     
    },[])

    const handleOnChange = () => {
      setIsChecked(!isChecked);
    };
  
   async function handleSubmit(e) {
      e.preventDefault();
      let param = e.target.dimentions.value
      let dimentions = param.split("x")
      let variantData = {
        name: e.target.name.value,
        length: e.target.length.value,
        diameter: e.target.diameter.value,
        strength: e.target.strength.value,
        packaging_type: e.target.packaging_type.value,
        price: e.target.price.value,
        weight:e.target.weight.value,
        available: isChecked,
        packaging_length: dimentions[0],
        packaging_width: dimentions[1],
        packaging_height: dimentions[2]
  
      }
      
 
      let {response, data} = await api(`/products/${params.id}/variant`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(variantData)
      })

      if (response.status === 201) {
        setVariants(variants.concat(data))
      }
    }

    const openModal = (item) =>{
      setVariantSelected(item)
      setShowModal(true)
    }

    async function handleUpdate(e) {
      e.preventDefault();
      let param = e.target.dimentions.value
      let dimentions = param.split("x")
      let variantData = {
        name: e.target.name.value,
        length: e.target.length.value,
        diameter: e.target.diameter.value,
        strength: e.target.strength.value,
        packaging_type: e.target.packaging_type.value,
        price: e.target.price.value,
        weight:e.target.weight.value,
        available: isChecked,
        packaging_length: dimentions[0],
        packaging_width: dimentions[1],
        packaging_height: dimentions[2]
  
      }

      let {response, data} = await api(`/products/${variantsSelected.product_id}/variant/${variantsSelected.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(variantData)
      })

      if (response.status === 200) {
        let contador = 0
        let lista = variants
        lista.map((registro) => {
         if (registro.id == variantsSelected.id){
          lista[contador].name= data.name;
          lista[contador].length= data.length;
          lista[contador].diameter= data.diameter;
          lista[contador].strength= data.strength;
          lista[contador].packaging_type= data.packaging_type;
          lista[contador].price= data.price;
          lista[contador].weight= data.weight;
          lista[contador].available= data.available;
          lista[contador].packaging_length= data.packaging_length;
          lista[contador].packaging_width= data.packaging_width;
          lista[contador].packaging_height= data.packaging_height
         }
         contador++
        })
        setVariants(lista)
        setShowModal(false)
      }
    }
    
  return (
  <>
    
    <section className="md:flex mb-12 gap-8 w-full">
        <div className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 md:w-1/2 w-full">
        <h1 className="text-3xl font-semibold">{product?.name}</h1>
        <img
                className="object-scale-down w-full h-64"
                src={`${API_URL}/${product?.image_url}`}
                alt="image"
            />
      
        </div>

        <form method="post" onSubmit={handleSubmit} className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 md:w-1/2 w-full">
          <h2 className="text-2xl font-semibold mb-2">Agregar Variante</h2>
          <div className="md:flex gap-3">
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Tipo de Cigarro
              </label>
              <input name="name" className="mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
            </div>
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Largo
              </label>
              <input name="length" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
            </div>  
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Cepo
              </label>
              <input name="diameter" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
            </div>
          </div>
          
          <div className="md:flex gap-3">
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Fortaleza
              </label>
              <input name="strength" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
            </div>

            <div className="basis-72">

                    <label htmlFor="packaging_type" className="secondary-color text-sm font-bold mb-1">
                        Tipo de paquete
                    </label>
                    <select name="packaging_type" id="packaging_type" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color">
                        <option value="03">03</option>
                        <option value="06">06</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                    </select>
            </div>

              <div className="basis-72">
                    <label htmlFor="price" className="secondary-color text-sm font-bold mb-1">
                        Precio de Venta
                    </label>
                    <input type="text" name="price" id="price" placeholder="0.00" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
              </div>

          </div>

          <div className="md:flex gap-3">
          
          <div className="basis-72">
          <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
            Dimensiones
          </label>
          <input type="text" name="dimentions" id="dimentions" placeholder="Largo X Ancho X Alto" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
          </div>

          <div className="basis-72">
          <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
            Peso
          </label>
          <input type="text" name="weight" id="weight" placeholder="0 Lb" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" required/>
          </div>

          <div className="flex content-center items-center basis-72">
              <label className="secondary-color text-sm font-bold mt-3">
              <input
                type="checkbox"
                id="topping"
                name="topping"
                value="Paneer"
                checked={isChecked}
                onChange={handleOnChange}
                className="mr-2"
                />
                Disponible
              </label>
          </div>

          </div>
          
                <div className="flex items-center justify-center p-6 border-t border-solid border-blue Gray-200 rounded-b">
                
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Agregar
                  </button>
                </div>
        </form>
    </section>


    <section>
      <h2 className="text-2xl font-semibold secondary-color">Lista de variantes</h2>
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Nombre
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Fortaleza
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Unidades
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Precio
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Estado
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Acciones
                      </th>
                  </tr>
              </thead>
              <tbody>
                {variants?.map((variant) =>(
                  <tr key={variant.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {variant.name}
                      </th>
                      <td className="px-6 py-4">
                        {variant.strength}
                      </td>
                      <td className="px-6 py-4">
                        {variant.packaging_type}
                      </td>
                      <td className="px-6 py-4">
                        {variant.price}
                      </td>
                      <td className="px-6 py-4">
                        {variant.available == true 
                          ? 
                            <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Disponible
                            </div>
                          : 
                            <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> No Disponible
                            </div>
                        }
                      </td>
                      <td className="px-6 py-4">
                        <button className='px-2 py-1 bg-yellow-400 rounded-sm mr-2 text-black' onClick={() => openModal(variant)}><MdEdit/></button>
                        <button onClick={() => deleteVariant(variant)} className='px-2 py-1 bg-red-700 rounded-sm text-black'><MdDelete/></button>
                      </td>
                  </tr>
                ))}
                  
              </tbody>
          </table>
      </div>
    </section>

    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Editar Variante
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form method="post" onSubmit={handleUpdate} className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <div className="md:flex gap-3">
                    <div className="basis-72">
                      <label className="secondary-color text-sm font-bold mb-1">
                        Tipo de Cigarro
                      </label>
                      <input name="name" className="mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.name} required />
                    </div>
                    <div className="basis-72">
                      <label className="secondary-color text-sm font-bold mb-1">
                        Largo
                      </label>
                      <input name="length" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.length} required/>
                    </div>  
                    <div className="basis-72">
                      <label className="secondary-color text-sm font-bold mb-1">
                        Cepo
                      </label>
                      <input name="diameter" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.diameter} required/>
                    </div>
                  </div>
                  
                  <div className="md:flex gap-3">
                    <div className="basis-72">
                      <label className="secondary-color text-sm font-bold mb-1">
                        Fortaleza
                      </label>
                      <input name="strength" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.strength} required/>
                    </div>

                    <div className="basis-72">

                            <label htmlFor="packaging_type" className="secondary-color text-sm font-bold mb-1">
                                Tipo de paquete
                            </label>
                            <select name="packaging_type" id="packaging_type" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.packaging_type}>
                                <option value="03">03</option>
                                <option value="06">06</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                            </select>
                    </div>

                      <div className="basis-72">
                            <label htmlFor="price" className="secondary-color text-sm font-bold mb-1">
                                Precio de Venta
                            </label>
                            <input type="text" name="price" id="price" placeholder="0.00" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.price} required/>
                      </div>

                  </div>

                  <div className="md:flex gap-3">
                  
                  <div className="basis-72">
                  <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
                    Dimensiones
                  </label>
                  <input type="text" name="dimentions" id="dimentions" placeholder="Largo X Ancho X Alto" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" 
                  defaultValue={variantsSelected && `${variantsSelected.packaging_length}x${variantsSelected.packaging_width}x${variantsSelected.packaging_height}`}
                  required
                  />
                  </div>

                  <div className="basis-72">
                  <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
                    Peso
                  </label>
                  <input type="text" name="weight" id="weight" placeholder="0 Lb" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" defaultValue={variantsSelected && variantsSelected.weight} required/>
                  </div>

                  <div className="flex content-center items-center basis-72">
                      <label className="secondary-color text-sm font-bold mt-3">
                      <input
                        type="checkbox"
                        id="topping"
                        name="topping"
                        value="Paneer"
                        checked={variantsSelected && variantsSelected.available}
                        onChange={handleOnChange}
                        className="mr-2"
                        />
                        Disponible
                      </label>
                  </div>

          </div>

           {/*footer*/}
           <div className="flex items-center justify-end mt-4 pt-5 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-10 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                  >
                    Editar
                  </button>
                </div>
          
        </form>
                </div>
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default AdminAddVariant