import { useState, useEffect } from "react";
import OrderTable from '../../organisms/OrderTable'
import useAdminFetch from "../../../hooks/useAdminFetch";



const Orders = () => {
  const [orders, SetOrders] = useState([])

  let api = useAdminFetch()
  
  useEffect(()=>{
    let response = api('/orders')
    
    if (response.status === 200){
      SetOrders(response.data)
    }
  },[])
  return (
    <>
    <h1 className='font-semibold text-3xl mb-4'>Ordenes</h1>
    <OrderTable/>
    </>
  )
}

export default Orders