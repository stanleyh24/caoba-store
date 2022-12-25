import CardComponent from "../organisms/Card"
import Hero from "../organisms/Hero"
import App from "../templates/App"

function Home() {
  return (
    <>
      <Hero/>

      <div className='flex pt-2 my-4 flex-wrap gap-2  place-content-evenly'>
        <CardComponent
          img='/img/Quisqueyanos.png'
          title="Quisqueyanos"
          content="Cigarro con fortaleza media, sabor muy agradable con tripa, capote dominicano y capa Yamasa."
        />
        <CardComponent
           img='/img/Oro.png'
           title="Caoba Oro"
           content="Cigarro suave a medio, combinación de tripa y capote dominicano."
        />
        <CardComponent
           img='/img/Origen_Dominicano.png'
           title="Origen Dominicano"
           content="Cigarro fuerte con gran sabor reserva especial y selección del mejor tabaco de República Dominicana. Con tripa y capote dominicano y capa San Andrés."
        />
      </div>

      <div className=" w-full bg-white pt-2">
        <div className="flex justify-center h-72 container my-8 ">
          <div className="flex w-1/2 justify-end">
            <img className="h-72 " src="img/hechos_a_mano.jpg" alt="Hechos a Mano" srcset="" />
          </div>
          <div className="flex w-1/2 justify-start flex-col px-5">
            <div className="mr-8">
              <h1 className='text-3xl font-semibold font-serif mb-3'>Hechos a Mano</h1>
              <p className="leading-normal text-lg">Hechos a mano solo con las mejores hojas de tabaco para crear los mejores cigarros dominicanos y brindar la mejor experiencia a aquellas personas que disfrutan un buen cigarro.</p>
            </div>
          </div>
        </div>
      </div>
      
    </>
     
  )
}

export default Home
