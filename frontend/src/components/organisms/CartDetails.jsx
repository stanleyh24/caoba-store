import { API_URL } from "../../constants/env"

const CartDetails = ({cart}) => {
    
  return (
    <div className="md:w-1/2 bg-white px-10 py-10">
        <div className="flex justify-between border-b pb-8">
          <h1 className="font-semibold text-2xl">Detalles de compra</h1>
          <h2 className="font-semibold text-2xl">{cart.getNumberOfItems()} Items</h2>
        </div>
        <div className="flex mt-10 mb-5">
          <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
          <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
        </div>
        
        {cart.items.map((prod) => (
      
            <div key={prod.variant.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5"> 
                <div className="w-20">
                   <img className="h-24" src={`${API_URL}/${prod.product?.image_url}`} alt=""/> 
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{prod.product?.name} {prod.variant?.name} {prod.variant?.packaging_type} unit </span>
                  <span>
                    <button onClick={()=>cart.deleteItemToCart(prod)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</button>
                  </span>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <button onClick={()=>cart.deleteItemToCart(prod)}>
                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
                </button>
  
                 <p className="mx-2 border text-center w-8">{prod?.qty}</p>

                <button onClick={()=>cart.addItemToCart(prod)}>  
                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                  </svg>
                </button>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">${prod.variant?.price}</span>
              <span className="text-center w-1/5 font-semibold text-sm">${prod.variant?.price * prod?.qty}</span>
            </div>
        )
        )}  
        <div className='flex justify-end'>
          <h2 className='text-2xl font-bold pr-2'>Total US:</h2>
          <p className='text-2xl font-bold'>$ {cart.getTotalOfCart()}</p>
        </div>
        
      </div>
  )
}

export default CartDetails