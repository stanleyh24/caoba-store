import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  let links = [
    {name:'Inicio', link:'/'},
    {name:'Productos', link:'/productos'},
    {name:'Tienda', link:'/tienda'},
    {name:'Historia', link:'/historia'},
    {name:'Contactos', link:'/contactos'},
  ]

  let [open,setOpen]= useState(false)

  return (
    <nav className=' bg-white shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex py-3 md:px-10 items-center justify-between'>
        <div>
          <Link to='/'>
            <h1 className='text-2xl font-bold primary-color'>Caoba Cigars</h1>
          </Link>
          
        </div>
        <div className='absolute right-8 top-2 cursor-pointer md:hidden' onClick={()=>setOpen(!open)}>
          <img src={open ? "/img/close.png" : "/img/menu.png"} alt="" />
        </div>
        <ul className={`font-bold md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' :'top-[-490px]'} md:opacity-100 `}>
         {
          links.map((l) =>(
            <li className='md:ml-8 text-xl md:my-0 my-7'>
              <Link to={l.link}>{l.name}</Link>
            </li>
          ))
         }
        </ul>
      </div>
    </nav>
  )
}

export default Nav