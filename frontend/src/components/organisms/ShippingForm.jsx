import { useState } from 'react';
import { API_URL } from "../../constants/env"
import Select from 'react-select'
import countries from '../../helpers/countries'


const ShippingForm = ({setOrder, cart}) => {
  const [rates, setRates] = useState([]);
  const [executed,setExecuted] = useState(false);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    postal_code:"",
    city: "",
    country:{
      name:"",
      code:""
    },
    shipping_type:""

  });

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  
    if (!executed){
      if (values.postal_code.length >= 4 && values.address != "" && values.country.code != "" && values.city != "") {
        getRate()
        setExecuted(true)
      }
    }
   
  }

  let options = []

  for (let i = 0; i < countries.length; i++) {
    options.push({ value:countries[i].code, label: countries[i].country })
        
  }

  const selectedCountry = (selectedOption) =>{
    let country = {
      name:selectedOption.label,
      code:selectedOption.value
    }
    setValues({...values,country});   
  }

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
  function getShippingPrice(code) {
    let found = rates.find(element => element.Service.Code == code)
    return found.TotalCharges.MonetaryValue
  }
  
 async function getRate() {
  let bodyReq = {
    Name: `${values.first_name} ${values.last_name}`,
    AddressLine: values.address,
    City: values.city,
    PostalCode: values.postal_code,
    CountryCode: values.country.code
  }
  await fetch(`${API_URL}/shiping`,{
    method: "POST",
    body: JSON.stringify(bodyReq),
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then(data => {
    const shippingOptions = data['RateResponse']['RatedShipment'];
    setRates(shippingOptions);
    })
    .catch(error => console.log('Error:', error));
  }


  const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          postal_code:values.postal_code,
          city: values.city,
          country: values.country,
          products:{},
          amount:0,
          shipping:{
            code: values.shipping_type,
            price: getShippingPrice(values.shipping_type)
          }
        }
        data.products= cart.items.map(p =>{
          return {
            variant_id: p.variant.id,
            price: p.variant.price,
            quantity: p.qty
          }
        }) 
        data.amount= cart.getTotalOfCart()
        console.log(data)
        /* axios.post(`${API_URL}/orders`,data)
        .then((resp)=> {
          setOrder(resp.data)      
        })  */
      }

  return (
    <div  className="md:w-1/2 px-8 py-10 bg-white">
          <h1 className="font-semibold text-2xl border-b pb-6 mb-2 secondary-color">Datos de envio</h1>
          <form onSubmit={handleSubmit}>
          <div className='flex gap-16 '>
            <div className="mb-6">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-color dark:text-white">Nombre</label>
                <input type="text" id="first_name" name="first_name" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name" required/>
              </div>
              <div className="mb-6">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-color dark:text-white">Apellido</label>
                <input type="text" id="last_name" name="last_name" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="apellido" required/>
              </div>
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-color dark:text-white">Email</label>
              <input type="email" id="email" name="email" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" placeholder="name@example.com" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-color dark:text-white">Telefono</label>
              <input type="text" id="phone" name="phone" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>
          </div>
          <div className='flex gap-16'>

            <div className="mb-6 w-[298px]">
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-color dark:text-white">Pais</label>
              <Select id="country" options={options} onChange={selectedCountry} required/>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-color dark:text-white">Direccion</label>
              <input type="text" id="address" name="address" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>
            
          </div>
          <div className='flex gap-16'>
            <div className="mb-6">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-color dark:text-white">Ciudad</label>
              <input type="text" id="city" name="city" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>

            <div className="mb-6">
              <label htmlFor="postal_code" className="block mb-2 text-sm font-medium text-color dark:text-white">Codigo Postal</label>
              <input type="text" id="postal_code" name="postal_code" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required/>
            </div>

          </div>

          <div className="mb-6">
              
              {rates.length > 0 &&
                <>
                  <label htmlFor="shipping_type" className="block mb-2 text-sm font-medium text-color dark:text-white">Tipo de envio</label>
                  <select id="shipping_type" name="shipping_type" onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" required>
                    <option value="">-------------</option>
                    {rates?.map(rate => (
                      <option key={rate.Service.Code} value={rate.Service.Code}>{getDescriptions(rate.Service.Code)} {rate.TotalCharges.MonetaryValue} {rate.TotalCharges.CurrencyCode}</option>
                      ))}
                  </select>
                </>
              } 
                 
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