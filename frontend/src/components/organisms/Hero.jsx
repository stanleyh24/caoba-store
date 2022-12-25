import React from 'react'

const Hero = () => {
  return (
    <section className='max-h-96 h-96 w-full heroImage'>
        {/* <img class='object-cover max-h-96 w-full' src="/img/hoja-tabaco.jpg" alt=" hoja de tabaco" srcset="" /> */}
        <div className='pt-20 ml-16 max-w-lg'>
            <p className='text-3xl text-slate-50 font-semibold mb-6'>Los Mejores Cigarros Artesanales con la mejores hojas.</p>
            <button className='text-slate-50 font-medium p-2 border-2 rounded-md'>Descubre mas</button>
        </div>
    </section>
  )
}

export default Hero