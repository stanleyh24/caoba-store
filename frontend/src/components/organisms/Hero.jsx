import React from 'react'
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react"
const Hero = () => {
  return (
  <>
    {/* <section className='w-full flex h-2/3'>
      <div className='w-1/3 heroImage1 p-4 '>
        <h1 className='text-3xl text-white font-semibold mt-4 justify-center'>Hechos a Mano</h1>
        <p className='text-white text-lg'>Hechos a mano solo con las mejores hojas de tabaco para crear los mejores cigarros dominicanos y brindar la mejor experiencia a aquellas personas que disfrutan un buen cigarro.</p>

      </div>
      <div className='w-2/3 heroImage-text p-4 heroImage'>
      </div>
        
    </section> */}

<Carousel>
    
    <div className='w-full flex h-2/3 bg-black justify-center items-center'>
      <div className='w-1/3 '>
        <img className='w-full' src="/img/oro-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Caoba Oro</h1>
        <p className="text-lg max-w-xl text-gray-100 ">Cigarro suave a medio, combinación de tripa y capote dominicano.</p>
      </div>        
    </div>

    <div className='w-full flex h-2/3 bg-white justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/magnificos-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Magnificos</h1>
        <p className="text-lg max-w-xl ">Cigarro fuerte con sabor intenso con tripa y capote dominicano y capa San Andres.</p>
      </div>        
    </div>

    <div className='w-full flex h-2/3 bg-black justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/Diamante-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Caoba Diamante</h1>
        <p className="text-lg max-w-xl text-gray-100 ">Cigarro fuerte, fue creada con la características de un puro con mucha fortaleza, siempre con una calidad superior.Tripa y capote Dominicano con capa San Andres.</p>
      </div>        
    </div>

    <div className='w-full flex h-2/3 bg-black justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/origen dominicano-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Origen Dominicano</h1>
        <p className="text-lg max-w-xl text-gray-100 ">Cigarro fuerte con gran sabor reserva especial y selección del mejor tabaco de República Dominicana. Con tripa y capote dominicano y capa San Andrés.</p>
      </div>        
    </div>

    <div className='w-full flex h-2/3 bg-white justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/gran reserva-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Gran Reserva</h1>
        <p className="text-lg max-w-xl ">Cigarro fuerte, con gran sabor. Tripa y capote dominicano con capa San Andrés.</p>
      </div>        
    </div>


    <div className='w-full flex h-2/3 bg-black justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/platino-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Caoba Platino</h1>
        <p className="text-lg max-w-xl text-gray-100">Cigarro suave, esta concebido con una selección cuidadosa de cada una de sus cinco hojas,siendo su tripa y capote dominicanos y su capa traída desde Connecticut.</p>
      </div>        
    </div>

    <div className='w-full flex h-2/3 bg-white justify-center items-center'>
      <div className='w-1/3'>
        <img className='w-full' src="/img/quisquellanos-1.png" alt="" srcset="" />
      </div>
      <div className='w-1/3'>
        <h1 className="text-4xl font-bold primary-color">Quisqueyanos</h1>
        <p className="text-lg max-w-xl ">Cigarro con fortaleza media, sabor muy agradable con tripa, capote dominicano y capa Yamasa.</p>
      </div>        
    </div>
    </Carousel>
    </>
  
  )
}

export default Hero