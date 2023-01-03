import React from 'react'
import CardComponent from '../organisms/Card'



const products = () => {
  return (
      <div className='container mx-auto px-6'>
        <div>
          <h1 className='text-3xl font-semibold py-3'>Caoba Premium</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/Platino.png"
              title='Caoba Platino'
              content='Cigarro suave, esta concebido con una selección cuidadosa de cada una de sus cinco hojas,siendo su tripa y capote dominicanos y su capa traída desde Connecticut.'
            />
            <CardComponent 
              img="/img/Oro.png"
              title='Caoba Oro'
              content='Cigarro suave a medio, combinación de tripa y capote dominicano.'
            />
            <CardComponent 
              img="/img/Diamante.png"
              title='Caoba Diamante'
              content='Cigarro fuerte, fue creada con la características de un puro con mucha fortaleza, siempre con una calidad superior.Tripa y capote Dominicano con capa San Andres.'
            />
          </div>
        </div>

        <div>
          <h1 className='text-3xl font-semibold py-3'>Grandes Reservas</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/suprime.png"
              title='Supreme'
              content='Cigarro suave con agradable sabor Capote, tripa y capa Dominicana.'
            />
            <CardComponent 
              img="/img/Magnificos.png"
              title='Magnificos'
              content='Cigarro fuerte con sabor intenso con tripa y capote dominicano y capa San Andres.'
            />
            <CardComponent 
              img="/img/Unique.png"
              title='Unique'
              content='Cigarro medio. Tripa y capote dominicano y importada desde Connecticut.'
            />

            <CardComponent 
                img="/img/Quisqueyanos.png"
                title='Quisqueyanos'
                content='Cigarro con fortaleza media, sabor muy agradable con tripa, capote dominicano y capa Yamasa.'
              />
              <CardComponent 
                img="/img/Gran_Reserva.png"
                title='Gran Reserva'
                content='Cigarro fuerte, con gran sabor. Tripa y capote dominicano con capa San Andrés.'
              />
          </div>
        </div>

        <div>
          <h1 className='text-3xl font-semibold py-3'>Origen Dominicano</h1>
          <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
            <CardComponent 
              img="/img/Origen_Dominicano.png"
              title='Origen Dominicano'
              content='Cigarro fuerte con gran sabor reserva especial y selección del mejor tabaco de República Dominicana. Con tripa y capote dominicano y capa San Andrés.'
            />
          </div>
        </div>
      </div>
    
  )
}

export default products