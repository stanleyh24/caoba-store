import { Carousel } from "flowbite-react"
import useFetch from "../../hooks/useFeth"
import { API_URL } from "../../constants/env"
import Hero from "../organisms/Hero"
import { Link } from "react-router-dom";



function Home() {
  const { data, loading, error } = useFetch(`products`)
  
  return (
    <>
      <Hero/>

      <section className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {data?.map((prod) =>(
            <div className="flex justify-center" key={prod.id}>
            <div className="w-96">
              <img
                className="object-scale-down w-full h-72"
                src={`${API_URL}/${prod.image_url}`}
                alt="image"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold primary-color ">{prod.name}</h1>
              <p className="text-lg max-w-xl ">{prod.description}</p>
              <Link to={`/productos/${prod.id}`}>
                      <button className="text-xl font-semibold tracking-tight mt-8 p-2 primary-color border-2 border-current rounded-md">
                        Comprar
                      </button>
                </Link>
            </div>
           </div>
          ))} 
        </Carousel>
      </section>

      <section className=" w-full bg-white pt-2">
        <div className="flex justify-center h-72 container my-8 ">
          <div className="flex w-1/2 justify-end">
            <img className="h-72 " src="img/hechos_a_mano.jpg" alt="Hechos a Mano" />
          </div>
          <div className="flex w-1/2 justify-start flex-col px-5">
            <div className="mr-8">
              <h1 className='text-3xl font-semibold font-serif mb-3'>Hechos a Mano</h1>
              <p className="leading-normal text-lg">Hechos a mano solo con las mejores hojas de tabaco para crear los mejores cigarros dominicanos y brindar la mejor experiencia a aquellas personas que disfrutan un buen cigarro.</p>
            </div>
          </div>
        </div>
      </section>
      
    </>
     
  )
}

export default Home
