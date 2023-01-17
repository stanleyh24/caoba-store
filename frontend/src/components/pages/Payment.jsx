import React from 'react'
import { Link } from 'react-router-dom'

const Payment = () => {
  return (
    <div className='max-w-256 m-auto'>
        <section className='pt-10 text-center'>
            <h1 className='text-4xl mb-6'>Tu Pago se ha procesado con exito!!!</h1>
            <Link to="/tienda">
                Ver mas Productos
            </Link>
        </section>
    </div>
  )
}

export default Payment