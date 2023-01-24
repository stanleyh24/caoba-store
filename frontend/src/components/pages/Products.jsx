import React, { useEffect } from 'react'
import { useCartContext } from '../../context/CartContext'
import CardComponent from '../organisms/Card'



const products = () => {
  const cart = useCartContext()


  return (
      <div className='container mx-auto px-6'>
        <div>
          <h1 className='text-3xl font-semibold py-3'>Caoba Premium</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/Platino.png"
              title='Caoba Platino'
              content='Cigarro suave, esta concebido con una selección cuidadosa de cada una de sus cinco hojas,siendo su tripa y capote dominicanos y su capa traída desde Connecticut.'
            >
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
              Caoba Platino
              </h3>
              
            </CardComponent>
            <CardComponent 
              img="/img/Oro.png"
              title='Caoba Oro'
              content='Cigarro suave a medio, combinación de tripa y capote dominicano.'
            >
              
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                    Caoba Oro
                    </h3>
              
            </CardComponent>
            <CardComponent 
              img="/img/Diamante.png"
              title='Caoba Diamante'
              content='Cigarro fuerte, fue creada con la características de un puro con mucha fortaleza, siempre con una calidad superior.Tripa y capote Dominicano con capa San Andres.'
            >
               <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
               Caoba Diamante
                    </h3>
              
            </CardComponent>
          </div>
        </div>

        <div>
          <h1 className='text-3xl font-semibold py-3'>Grandes Reservas</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/suprime.png"
              title='Supreme'
              content='Cigarro suave con agradable sabor Capote, tripa y capa Dominicana.'
            >
               <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
               Supreme
                </h3>
              
            </CardComponent>

            <CardComponent 
              img="/img/Magnificos.png"
              title='Magnificos'
              content='Cigarro fuerte con sabor intenso con tripa y capote dominicano y capa San Andres.'
            >
               <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
               Magnificos
                    </h3>
              
            </CardComponent>
            <CardComponent 
              img="/img/Unique.png"
              title='Unique'
              content='Cigarro medio. Tripa y capote dominicano y importada desde Connecticut.'
            >
               <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
               Unique
                    </h3>
              
            </CardComponent>

            <CardComponent 
                img="/img/Quisqueyanos.png"
                title='Quisqueyanos'
                content='Cigarro con fortaleza media, sabor muy agradable con tripa, capote dominicano y capa Yamasa.'
              >
                 <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                 Quisqueyanos
                    </h3>
              
            </CardComponent>
              <CardComponent 
                img="/img/Gran_Reserva.png"
                title='Gran Reserva'
                content='Cigarro fuerte, con gran sabor. Tripa y capote dominicano con capa San Andrés.'
              >
                 <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                 Gran Reserva
                    </h3>
              
            </CardComponent>
          </div>
        </div>

        <div>
          <h1 className='text-3xl font-semibold py-3'>Origen Dominicano</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/Origen_Dominicano.png"
              title='Origen Dominicano'
              content='Cigarro fuerte con gran sabor reserva especial y selección del mejor tabaco de República Dominicana. Con tripa y capote dominicano y capa San Andrés.'
            >
               <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
               Origen Dominicano

               </h3>
              
            </CardComponent>
          </div>
        </div>
      </div>
    
  )
}

export default products