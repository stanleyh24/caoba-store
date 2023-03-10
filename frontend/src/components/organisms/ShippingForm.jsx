import { useState } from 'react';
import axios from 'axios'
import { API_URL } from "../../constants/env"


const ShippingForm = ({setOrder, cart}) => {
  const [rates, setRates] = useState([]);

  let servicesCodes = [
    {"code":"01" , "description": "Next Day Air"},
    {"code":"02","description":"2nd Day Air"},
    {"code":"03","description":"Ground"}, 
    {"code":"12","description": "3 Day Select"},
    {"code":"13","description": "Next Day Air Saver"},
    {"code":"14","description": "UPS Next Day Air Early"},
    {"code":"59","description": "2nd Day Air A.M."},
    {"code":"07","description": "Worldwide Express"},
    {"code":"08","description": "Worldwide Expedited"},
    {"code":"11","description": "Standard"},
    {"code":"54","description": "Worldwide Express Plus"},
    {"code":"65","description":"Saver"}, 
    {"code":"96","description": "UPS Worldwide Express Freight"}
  ]

  function getDescriptions(c) {
    
    for (let i = 0; i < servicesCodes.length; i++) {
      if (servicesCodes[i].code === c){
        return servicesCodes[i].description
      }
    }
  }
  
 async function getRate() {
  await fetch(`${API_URL}/shiping`)
  .then(response => response.json())
  .then(data => {
    const shippingOptions = data['RateResponse']['RatedShipment'];
    console.log(shippingOptions)
    setRates(shippingOptions);
    })
    .catch(error => console.log('Error:', error));
  }
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
          <h1 className="font-semibold text-2xl border-b pb-6 mb-2 secondary-color">Datos de envio</h1>
          <form onSubmit={handleSubmit}>
          <div className='flex gap-16 '>
            <div className="mb-6">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-color dark:text-white">Nombre</label>
                <input type="text" id="first_name" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name" required/>
              </div>
              <div className="mb-6">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-color dark:text-white">Apellido</label>
                <input type="text" id="last_name" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="apellido" required/>
              </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-color dark:text-white">Email</label>
              <input type="email" id="email" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name@example.com" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-color dark:text-white">Telefono</label>
              <input type="text" id="phone" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-color dark:text-white">Direccion</label>
              <input type="text" id="address" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-color dark:text-white">Codigo Postal</label>
              <input type="text" id="postal_code" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-color dark:text-white">Ciudad</label>
              <input type="text" id="city" className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"  required/>
            </div>
            
            <div className="mb-6">
              {/* <UPSRates/> */}
              {rates.length > 0 &&

                <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={e => console.log(e.target.value)}>
                {rates?.map(rate => (
                  <option key={rate.Service.Code} value={rate.Service.Code}>{getDescriptions(rate.Service.Code)} {rate.TotalCharges.MonetaryValue} {rate.TotalCharges.CurrencyCode}</option>
                  ))}
              </select>
                } 
                 
            </div>
          
          </div>
         

          <div className="mb-6 flex ">
            <div className=''>
              <input  type="checkbox" id="confirmation"  required/>
            </div>
            <div className='pl-2'>
            <p className='font-semibold text-color'>El Cliente se compromete a pagar cualquier cargo aduanal impuesto por el pais de destino.</p>
            </div>
          </div>
           
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear Orden</button>
          </form>
      </div>
  )
}

export default ShippingForm