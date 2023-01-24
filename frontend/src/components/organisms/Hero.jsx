import React from 'react'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className='max-h-96 h-96 w-full heroImage pt-10'>
      <div className='max-w-lg md:ml-36 heroImage-text p-4'>
       <p className='text-3xl primary-color  font-semibold mb-6 '>Los Mejores Cigarros Artesanales con la mejores hojas.</p>
        <Link to={`/productos/`}>
          <button className='primary-color border-current font-medium p-2 border-2 rounded-md'>Descubre mas</button>
        </Link>
      </div>
        
    </section>
  )
}

export default Hero