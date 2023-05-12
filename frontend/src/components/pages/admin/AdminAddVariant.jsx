import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import useAdminFetch from "../../../hooks/useAdminFetch";
import { API_URL } from "../../../constants/env"

const AdminAddVariant = () => {
    const params = useParams()
    let api = useAdminFetch()

    const [product, setProduct] = useState()
    const [variants, setVariants] = useState()
    const [isChecked, setIsChecked] = useState(false);
    
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
        console.log(data)
        setVariants(variants.concat(data))
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
              <input name="name" className="mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" />
            </div>
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Largo
              </label>
              <input name="length" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" />
            </div>  
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Cepo
              </label>
              <input name="diameter" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" />
            </div>
          </div>
          
          <div className="md:flex gap-3">
            <div className="basis-72">
              <label className="secondary-color text-sm font-bold mb-1">
                Fortaleza
              </label>
              <input name="strength" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color" />
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
                    <input type="text" name="price" id="price" placeholder="0.00" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color"/>
              </div>

          </div>

          <div className="md:flex gap-3">
          
          <div className="basis-72">
          <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
            Dimensiones
          </label>
          <input type="text" name="dimentions" id="dimentions" placeholder="Largo X Ancho X Alto" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color"/>
          </div>

          <div className="basis-72">
          <label htmlFor="dimentions" className="secondary-color text-sm font-bold mb-1">
            Peso
          </label>
          <input type="text" name="weight" id="weight" placeholder="0 Lb" className=" mb-2 shadow appearance-none border rounded w-full py-2 px-1 secondary-color"/>
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
                        
                      </td>
                  </tr>
                ))}
                  
              </tbody>
          </table>
      </div>
    </section>
  </>
  )
}

export default AdminAddVariant