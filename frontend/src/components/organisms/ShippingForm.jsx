import axios from 'axios'
import { API_URL } from "../../constants/env"

const ShippingForm = ({setOrder, cart}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          address: e.target.address.value,
          postal_code:e.target.postal_code.value,
          city: e.target.city.value,
          products:{},
          amount:0,
        }
        data.products= cart.items.map(p =>{
          return {
            variant_id: p.variant.id,
            price: p.variant.price,
            quantity: p.qty
          }
        }) 
        data.amount= cart.getTotalOfCart()

        axios.post(`${API_URL}/orders`,data)
        .then((resp)=> {
          setOrder(resp.data)      
        }) 
      }

  return (
    <div  className="md:w-1/2 px-8 py-10 bg-white">
          <h1 className="font-semibold text-2xl border-b pb-6 mb-2">Datos de envio</h1>
          <form onSubmit={handleSubmit}>
          <div className='flex gap-16 '>
            <div className="mb-6">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required/>
              </div>
              <div className="mb-6">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="apellido" required/>
              </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
              <input type="text" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Direccion</label>
              <input type="text" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Postal</label>
              <input type="text" id="postal_code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciudad</label>
              <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </div>
          </div>
          <div className="mb-6 flex ">
            <div className=''>
              <input  type="checkbox" id="confirmation"  required/>
            </div>
            <div className='pl-2'>
            <p className='font-semibold'>El Cliente se compromete a pagar cualquier cargo aduanal impuesto por el pais de destino.</p>
            </div>
          </div>
           
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Orden</button>
          </form>
      </div>
  )
}

export default ShippingForm