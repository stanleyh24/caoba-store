import { useState, useEffect } from "react";
import OrderTable from '../../organisms/OrderTable'
import useAdminFetch from "../../../hooks/useAdminFetch";



const Orders = () => {
  const [orders, SetOrders] = useState()

  let api = useAdminFetch()

  async function getOrders() {
    let {response,data} = await api('/orders',{
      mode: "cors"
    })
    
    if (response.status === 200){
      SetOrders(data)
    }
  }
  
  useEffect(()=>{
    getOrders()
  },[])
  return (
    <>
    <h1 className='font-semibold text-3xl mb-4'>Ordenes</h1>
    <OrderTable orders={orders}/>
    </>
  )
}

export default Orders