import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import useFetch from "../../hooks/useFeth"
import Loader from "../atoms/Loader"
import { API_URL } from "../../constants/env"
import Select from "react-select"
import axios from 'axios'
import { useCartContext} from '../../context/CartContext'


const Product = () => {
    const nav = useNavigate()
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
          packaging_type: variantSelected.packaging_type,
          packaging_length: variantSelected.packaging_length,
          packaging_width: variantSelected.packaging_width,
          packaging_height: variantSelected.packaging_height,
          weight: variantSelected.weight
        }
        
      }
      
     cart.addItemToCart(item)
    }

    const buyNow = () => {
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
        packaging_type: variantSelected.packaging_type,
        packaging_length: variantSelected.packaging_length,
        packaging_width: variantSelected.packaging_width,
        packaging_height: variantSelected.packaging_height,
        weight: variantSelected.weight
      }
      
    }
   cart.addItemToCart(item)
   nav('/cart')
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
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name}</h1>
            <p className="leading-relaxed">{data.description}</p>
            <div className='flex  border-b-2 border-gray-200 py-2'>
              <div className='basis-1/3 flex'>
                <span className='font-semibold mr-2'>Fortaleza:</span>
                <p>{variantSelected?.strength}</p>
              </div>
              <div className='basis-1/4 flex'>
                <span className='font-semibold mr-2'>Longitud:</span>
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
                </div>
              </div>
            </div>
            {variantSelected === undefined ? ( <p className='text-2xl'>Seleccione tipo y unidades para ver los detalles</p>
            ):(
              <div className="flex">
              <span className="title-font font-medium text-3xl text-gray-900">${variantSelected?.price}</span>
              {cart.items.find((c) => c.id === variantSelected?.id) ? 
                               <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={removeFromCart}>quitar del carrito</button>
                              : 
                               <>
                               <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={addToCart}>Agregar al carrito</button>
                               <button className="flex ml-1 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" onClick={buyNow}>Comprar ahora</button>
                               </>
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