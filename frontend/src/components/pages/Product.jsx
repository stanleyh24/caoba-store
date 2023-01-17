import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import useFetch from "../../hooks/useFeth"
import Loader from "../atoms/Loader"
import { API_URL } from "../../constants/env"
import Select from "react-select"
import axios from 'axios'
import { useCartContext} from '../../context/CartContext'


const Product = () => {
    const params = useParams()
    const cart = useCartContext()
    const [variants, setVariants] = useState([])
    const { data, loading, error } = useFetch(`products/${params.id}`)
    const [variantSelected, setVariantSelected] = useState()
    const [typeSelected, setTypeSelected] = useState()
    const[unitSelected, setUnitSelected] = useState()
    let units =  []
    let types= []
    


    useEffect(() => {  
      axios.get(`${API_URL}/products/${params.id}/variants`)
      .then((res) => {
        setVariants(res.data)
      })
    },[params.id]);
    
   
    variants.forEach(variant =>{
      if (!units.includes(variant.packaging_type)){
        units.push(variant.packaging_type)
      }
      
      types.push({label: variant.name, value: variant.slug})
      
    });

    let uniqueArray = [...new Set(types.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

    units.sort(function(a, b){return a - b})
    
    function handleSelectChange({value}) {
      setTypeSelected(value)
      filterVariant(unitSelected,value)
    }

    function handleUnitsChange(e){
      setUnitSelected(e.target.value)
      filterVariant(e.target.value, typeSelected)
    }

    function filterVariant(unit, slug) {
      if ((unit != undefined) && (slug != undefined)) {
        for (let i=0; i < variants.length; i++) {
          if ((variants[i].packaging_type === +unit) && (variants[i].slug === slug)) {
            setVariantSelected(variants[i])
             return
           }
         }
         setVariantSelected(undefined)
        }
    }
    
    if (loading) return <Loader />
    if (error) return <div>{error?.message}</div>

    const addToCart = () => {
      let item = {
        product: {
          id: data.id,
          name: data.name,
          image_url: data.image_url
        },
        variant:{
          id: variantSelected.id,
          name: variantSelected.name,
          price: variantSelected.price,
          packaging_type: variantSelected.packaging_type
        }
        
      }
     cart.addItemToCart(item)
    }


    const removeFromCart = () => {
      console.log(variantSelected)
    
    }


    return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`${API_URL}/${data.image_url}`}/>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
            {/* <div class="flex mb-4">
              <span class="flex items-center">
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span class="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a class="text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-2 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed">{data.description}</p>
            <div className='flex  border-b-2 border-gray-200 py-2'>
              <div className='basis-1/3 flex'>
                <span className='font-semibold mr-2'>Fuerza:</span>
                <p>{variantSelected?.strength}</p>
              </div>
              <div className='basis-1/4 flex'>
                <span className='font-semibold mr-2'>Largo:</span>
                <p>{variantSelected?.length}</p>
              </div>
              <div className='basis-1/4 flex'>
                <span className='font-semibold mr-2'>Cepo:</span>
                <p>{variantSelected?.diameter}</p>
              </div>
            </div>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Unidades</span>
                  {
                  units.map((unit,i) =>(
                    <div key={i} className="mx-1">
                      <input type="radio" id={unit} name="units" value={unit} className="hidden peer" onChange={handleUnitsChange}/>
                      <label htmlFor={unit} className="p-2 text-gray-500 bg-white border border-gray-200 rounded-full cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        {unit}
                      </label>
                    </div>
                  ))
                  }            
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Tipo de Cigarro</span>
                <div className="relative">
                  <Select options={uniqueArray} onChange={handleSelectChange}/>
                  
                 {/*  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span> */}
                </div>
              </div>
            </div>
            {variantSelected === undefined ? ( <p className='text-2xl'>Seleccione tipo y unidades para ver los detalles</p>
            ):(
              <div className="flex">
              <span className="title-font font-medium text-3xl text-gray-900">${variantSelected?.price}</span>
              {!cart.items.find((c) => c.id === variantSelected?.id) ? (
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={addToCart}>agregar al carrito</button>
                
              ): (
                <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={removeFromCart}>quitar del carrito</button>
              )
              }
            </div>
            )
            }
           
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product