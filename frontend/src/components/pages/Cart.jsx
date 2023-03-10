import React, { useState, useEffect } from 'react'
import { useCartContext } from '../../context/CartContext'
import PaypalPayments from '../organisms/PaypalPayments'
import ShippingForm from '../organisms/ShippingForm'
import CartDetails from '../organisms/CartDetails'


const Cart = () => {
  const cart = useCartContext()
  const [order, setOrder] = useState()
 
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

    </div>
  )
}

export default Cart