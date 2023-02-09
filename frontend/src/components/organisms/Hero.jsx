import React from 'react'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className='w-full flex h-2/3'>
      <div className='w-1/3'>
      <img className="h-full " src="img/hechos_a_mano2.jpg" alt="Hechos a Mano" />
      </div>
      <div className='w-2/3 heroImage-text p-4 heroImage'>
       <h1 className='text-3xl primary-color  font-semibold mb-6 '>Caoba Cigars</h1>
    
      </div>
        
    </section>
  )
}

export default Hero