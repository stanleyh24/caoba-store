import React, { useState, useEffect } from 'react'
import { useCartContext } from '../../context/CartContext'
import PaypalPayments from '../organisms/PaypalPayments'
import ShippingForm from '../organisms/ShippingForm'
import CartDetails from '../organisms/CartDetails'
import UPSRates from '../organisms/UPSRates'

const Cart = () => {
  const cart = useCartContext()
  const [order, setOrder] = useState()
  const [rates, setRates] = useState([]);

  /* useEffect(() => {
    const loadRates = async () => {
      const url = 'https://wwwcie.ups.com/ship/v1/rating/Shop';

      const requestData = {
              "UPSSecurity": {
                "UsernameToken": {
                  "Username": "boutiquecaoba",
                  "Password": "Greetings.01"
                },
                "ServiceAccessToken": {
                  "AccessLicenseNumber": "FDCDA7F0602CCF72"
                }
              },
              "RateResponse": {
                "Response": {
                  "ResponseStatus": {
                    "Code": "1",
                    "Description": "Success"
                  },
                  "Alert": [
                    {
                      "Code": "110971",
                      "Description": "Your invoice may vary from the displayed reference rates"
                    },
                    {
                      "Code": "111530",
                      "Description": "User level discount not valid for this User ID."
                    }
                  ],
                  "TransactionReference": {
                    "CustomerContext": "boutiquecaoba",
                    "TransactionIdentifier": "0ciewsst22xcdC4lckSpTK"
                  }
                },
                "RatedShipment": [
                  {
                    "Service": {
                      "Code": "65",
                      "Description": ""
                    },
                    "RatedShipmentAlert": {
                      "Code": "110971",
                      "Description": "Your invoice may vary from the displayed reference rates"
                    },
                    "BillingWeight": {
                      "UnitOfMeasurement": {
                        "Code": "LBS",
                        "Description": "Pounds"
                      },
                      "Weight": "3.0"
                    },
                    "TransportationCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "92.35"
                    },
                    "BaseServiceCharge": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "78.10"
                    },
                    "ItemizedCharges": {
                      "Code": "375",
                      "CurrencyCode": "USD",
                      "MonetaryValue": "14.25"
                    },
                    "ServiceOptionsCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "0.00"
                    },
                    "TotalCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "92.35"
                    },
                    "RatedPackage": {
                      "Weight": "2.0"
                    }
                  },
                  {
                    "Service": {
                      "Code": "54",
                      "Description": ""
                    },
                    "RatedShipmentAlert": {
                      "Code": "110971",
                      "Description": "Your invoice may vary from the displayed reference rates"
                    },
                    "BillingWeight": {
                      "UnitOfMeasurement": {
                        "Code": "LBS",
                        "Description": "Pounds"
                      },
                      "Weight": "3.0"
                    },
                    "TransportationCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "134.81"
                    },
                    "BaseServiceCharge": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "83.00"
                    },
                    "ItemizedCharges": [
                      {
                        "Code": "375",
                        "CurrencyCode": "USD",
                        "MonetaryValue": "20.81"
                      },
                      {
                        "Code": "380",
                        "CurrencyCode": "USD",
                        "MonetaryValue": "31.00"
                      }
                    ],
                    "ServiceOptionsCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "0.00"
                    },
                    "TotalCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "134.81"
                    },
                    "RatedPackage": {
                      "Weight": "2.0"
                    }
                  },
                  {
                    "Service": {
                      "Code": "07",
                      "Description": ""
                    },
                    "RatedShipmentAlert": {
                      "Code": "110971",
                      "Description": "Your invoice may vary from the displayed reference rates"
                    },
                    "BillingWeight": {
                      "UnitOfMeasurement": {
                        "Code": "LBS",
                        "Description": "Pounds"
                      },
                      "Weight": "3.0"
                    },
                    "TransportationCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "98.15"
                    },
                    "BaseServiceCharge": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "83.00"
                    },
                    "ItemizedCharges": {
                      "Code": "375",
                      "CurrencyCode": "USD",
                      "MonetaryValue": "15.15"
                    },
                    "ServiceOptionsCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "0.00"
                    },
                    "TotalCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "98.15"
                    },
                    "RatedPackage": {
                      "Weight": "2.0"
                    }
                  },
                  {
                    "Service": {
                      "Code": "08",
                      "Description": ""
                    },
                    "RatedShipmentAlert": {
                      "Code": "110971",
                      "Description": "Your invoice may vary from the displayed reference rates"
                    },
                    "BillingWeight": {
                      "UnitOfMeasurement": {
                        "Code": "LBS",
                        "Description": "Pounds"
                      },
                      "Weight": "3.0"
                    },
                    "TransportationCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "86.91"
                    },
                    "BaseServiceCharge": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "73.50"
                    },
                    "ItemizedCharges": {
                      "Code": "375",
                      "CurrencyCode": "USD",
                      "MonetaryValue": "13.41"
                    },
                    "ServiceOptionsCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "0.00"
                    },
                    "TotalCharges": {
                      "CurrencyCode": "USD",
                      "MonetaryValue": "86.91"
                    },
                    "RatedPackage": {
                      "Weight": "2.0"
                    }
                  }
                ]
              }
            };
  
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers : { 
          'Content-Type': 'application/json',
          'AccessLicenseNumber': 'FDCDA7F0602CCF72',
          Username: 'boutiquecaoba',
          Password: 'Greetings.01',
          transactionSrc: 'boutiquecaoba',
          transId:'Tran123',
        },
        body: JSON.stringify(requestData)
      };

      fetch(url,requestOptions).then((res)=>{
        console.log(res)
      })
     
    }

    loadRates();
}, []); */

  return (
    <div className="container mx-auto mt-10">
    {!order ? (
    <div className="md:flex shadow-md my-10">
      <ShippingForm cart={cart} setOrder={setOrder}/>
      <CartDetails cart={cart}/>
      
      </div>
      ): (
                <div className='md:w-1/2 px-8 py-10 mx-auto bg-white'>
                  <h1 className='text-4xl font-semibold mb-4'>Orden Creada con Exito!!</h1>
                  <p className='text-xl mb-4'>Debe finalizar su compra al realizar el pago.</p>
                  <PaypalPayments value={order.amount} order={order} />
                </div>
          )
}
<UPSRates/>
    </div>
  )
}

export default Cart