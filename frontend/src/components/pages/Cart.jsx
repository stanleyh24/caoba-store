import React, { useState, useEffect } from 'react'
import { useCartContext } from '../../context/CartContext'
import PaypalPayments from '../organisms/PaypalPayments'
import ShippingForm from '../organisms/ShippingForm'
import CartDetails from '../organisms/CartDetails'


const Cart = () => {
  const cart = useCartContext()
  const [order, setOrder] = useState()
  const [userInfo, setUserInfo] = useState()

    
 
  return (
    <div className="container mx-auto mt-10">

    {order ? 
        <div className='md:w-full md:flex px-8 py-10 mx-auto bg-white'>
          <div className='md:w-1/2 w-full shadow-2xl p-8'>
            <h1 className="font-semibold text-2xl border-b pb-8">Informacion de Envio</h1>
            <div className='mt-6'>
              <p className='text-xl font-medium tracking-wide'>{userInfo.first_name} {userInfo.last_name}</p>
              <p className='text-xl font-medium tracking-wide'>{userInfo.phone}</p>
              <p className='text-xl font-medium tracking-wide'>{userInfo.email}</p>
              <p className='text-xl font-medium tracking-wide'>{userInfo.address},{userInfo.city}, {userInfo.postal_code}, {userInfo.country} </p>
              
            </div>
          </div>

        <div className="md:w-1/3 w-full m-auto shadow-2xl p-8">
        <h1 className="font-semibold text-2xl border-b pb-8">Resumen del pedido</h1>
        <div className="flex justify-between mt-10 mb-5">
          <span className="font-semibold text-sm uppercase">Articulos {cart.getNumberOfItems()}</span>
        </div>

        {cart.items.map((prod) => (
          <div key={prod.variant.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-full">
              <div className="flex flex-col justify-between ml-4 flex-grow">
                <span className="font-bold text-sm">{prod.product?.name} {prod.variant?.name} {prod.variant?.packaging_type} unit </span>
              </div>
            </div>
            <span className="text-center md:w-1/5 font-semibold text-sm md:m-auto">$ {(prod.variant?.price * prod?.qty).toFixed(2)}</span>
          </div>
          )
        )} 
        
        <div className="border-t mt-8">
        <div className="flex font-semibold justify-between text-sm uppercase">
            <span>Subtotal</span>
            <span>$ {cart.getTotalOfCart()}</span>
          </div>
          <div className="flex font-semibold justify-between text-sm uppercase">
            <span>Envio</span>
            <span>$ {userInfo.shipping_price}</span>
          </div>
          <div className="flex font-semibold justify-between text-sm uppercase mb-2">
            <span>Total</span>
            <span>$ {userInfo.total_amount}</span>
          </div>
          <PaypalPayments value={order.total_amount.toFixed(2)} order={order} />
        </div>
      </div>
      </div>
      :
      <div className="md:flex shadow-md my-10">
        <ShippingForm cart={cart} setOrder={setOrder} setUserInfo={setUserInfo} />
        <CartDetails cart={cart} />
      </div>
      }

    </div>               
    
     
  

  )
}

export default Cart