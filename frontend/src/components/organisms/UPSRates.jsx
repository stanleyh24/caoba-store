import React, { useState } from 'react';
import { API_URL } from "../../constants/env";

const UPSRates = () => {
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

  return (
    <div>
      <button onClick={getRate}>Get Rates</button>
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" onChange={e => console.log(e.target.value)}>
        {rates.map(rate => (
          <option key={rate.Service.Code} value={rate.Service.Code}>{getDescriptions(rate.Service.Code)} {rate.TotalCharges.MonetaryValue} {rate.TotalCharges.CurrencyCode}</option>
        ))}
      </select>
      </div>
      )
}

export default UPSRates