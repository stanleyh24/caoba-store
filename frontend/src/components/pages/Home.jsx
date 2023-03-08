import { Card, Carousel } from "flowbite-react";
import useFetch from "../../hooks/useFeth";
import { API_URL } from "../../constants/env";
import { Link } from "react-router-dom";
import UPSRates from "../organisms/UPSRates";
import CardComponent from "../organisms/Card";

function Home() {
  const { data, loading, error } = useFetch(`products`);

  return (
    <>
      <section className="gradient w-full h-96 flex justify-center">
        <div className="container p-2">
          <img className="w-full h-96" src="/img/hecho-a-mano-min.png" alt="" />
        </div>
      </section>

      <section className="flex justify-center m-8 items-center ">
        <img
          className="w-[468px] max-h-72"
          src="/img/finca-tabaco.jpg"
          alt=""
        />

        <div className="ml-8">
          <p className="text-5xl font-sans font-bold secondary-color">
            Las mejores hojas.
          </p>
          <p className="text-5xl font-sans font-bold secondary-color">
            El mejor cigarro
          </p>
        </div>
      </section>

      <section className="flex justify-center h-[420px]">
        <div className="flex justify-center flex-col container">
          <Carousel>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <CardComponent
                img="/img/oro-1.png"
                title="Caoba Oro"
                content="Cigarro suave a medio, combinación de tripa y capote dominicano."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Caoba Oro
                </h3>
              </CardComponent>

              <CardComponent
                img="/img/Diamante-1.png"
                title="Caoba Diamante"
                content="Cigarro fuerte, fue creada con la características de un puro con mucha fortaleza, siempre con una calidad superior.Tripa y capote Dominicano con capa San Andres."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                Caoba Diamante
                </h3>
              </CardComponent>

              <CardComponent
                img="/img/platino-1.png"
                title="Caoba Platino"
                content="Cigarro suave, esta concebido con una selección cuidadosa de cada una de sus cinco hojas,siendo su tripa y capote dominicanos y su capa traída desde Connecticut."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Caoba Platino
                </h3>
              </CardComponent>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <CardComponent
                img="/img/suprime.png"
                title="Supreme"
                content="Cigarro suave con agradable sabor Capote, tripa y capa Dominicana."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Supreme
                </h3>
              </CardComponent>

              <CardComponent
                img="/img/magnificos-1.png"
                title="Magnificos"
                content="Cigarro fuerte con sabor intenso con tripa y capote dominicano y capa San Andres."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Magnificos
                </h3>
              </CardComponent>

              <CardComponent
                img="/img/Unique.png"
                title="Unique"
                content="Cigarro medio. Tripa y capote dominicano y importada desde Connecticut."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Unique
                </h3>
              </CardComponent>
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <CardComponent
                img="/img/quisqueyanos-1.png"
                title="Quisqueyanos"
                content="Cigarro con fortaleza media, sabor muy agradable con tripa, capote dominicano y capa Yamasa."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Quisqueyanos
                </h3>
              </CardComponent>
              <CardComponent
                img="/img/gran reserva-1.png"
                title="Gran Reserva"
                content="Cigarro fuerte, con gran sabor. Tripa y capote dominicano con capa San Andrés."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Gran Reserva
                </h3>
              </CardComponent>
              <CardComponent
                img="/img/origen dominicano-1.png"
                title="Origen Dominicano"
                content="Cigarro fuerte con gran sabor reserva especial y selección del mejor tabaco de República Dominicana. Con tripa y capote dominicano y capa San Andrés."
              >
                <h3 className="text-xl font-semibold tracking-tight text-gray-900 mb-2 primary-color">
                  Origen Dominicano
                </h3>
              </CardComponent>
            </div>
          </Carousel>
        </div>
        
      </section>

      <section className="flex justify-center m-8 items-center">
        <div className="m-8">
          <h2 className="secondary-color font-bold text-4xl">Hechos a Mano.</h2>
          <div className="w-96">
            <p className="font-sans secondary-color text-justify leading-normal">
              Hechos a mano solo con las mejores hojas de tabaco para crear los
              mejores cigarros dominicanos y brindar la mejor experiencia a
              aquellas personas que disfrutan un buen cigarro.
            </p>
          </div>
        </div>
        <img
          className="w-[468px] max-h-72"
          src="/img/hechos_a_mano.jpg"
          alt=""
        />
      </section>
    </>
  );
}

export default Home;
