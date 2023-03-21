import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useUserContext } from '../../context/UserContext';


const AdminNav = () => {
    const user = useUserContext()

    let links = [
      {name:'Productos', link:'/admin/productos'},
      {name:'Ordenes', link:'/admin/ordenes'},
    ]
  
    let [open,setOpen]= useState(false)
  
    return (
      <nav className='bg-white shadow-md w-full fixed top-0 left-0'>
        <div className='md:flex py-3 md:px-10 items-center justify-between'>
          <div>
        
            <h1 className='text-2xl font-bold primary-color'>Caoba Cigars</h1>
        
            
          </div>
          <div className='absolute right-8 top-2 cursor-pointer md:hidden' onClick={()=>setOpen(!open)}>
            <img src={open ? "/img/close.png" : "/img/menu.png"} alt="" />
          </div>
          <ul className={`font-bold md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' :'top-[-490px]'} md:opacity-100 `}>
           {
            links.map((l, index) =>(
              <li key={index} className='md:ml-8 text-xl md:my-0 my-7 secondary-color'>
                <Link to={l.link}>{l.name}</Link>
              </li>
            ))
           }

           <button className='bg-[#AD7A06] md:ml-8 text-xl md:my-0 my-7 secondary-color px-8 rounded-lg' onClick={user.logout}>Salir</button>
                      
          </ul>
        </div>
      </nav>
    )
}

export default AdminNav