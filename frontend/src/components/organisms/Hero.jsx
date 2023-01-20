import React from 'react'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className='max-h-96 h-96 w-full heroImage'>
      <div className='relative max-w-lg ml-36'>
        <div className='h-48 bg-slate-50 absolute top-20 w-full opacity-20'></div>
        <div className='max-w-lg absolute top-20 p-4'>
          <p className='text-3xl primary-color  font-semibold mb-6 '>Los Mejores Cigarros Artesanales con la mejores hojas.</p>
          <Link to={`/productos/`}>
            <button className='primary-color border-current font-medium p-2 border-2 rounded-md'>Descubre mas</button>
          </Link>
         </div>
      </div>
        
    </section>
  )
}

export default Hero