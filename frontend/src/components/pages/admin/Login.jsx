import { useState } from "react"
import { API_URL } from "../../../constants/env"
import { useNavigate } from "react-router-dom"
import {useUserContext} from "../../../context/UserContext"



const Login = () => {
  const nav = useNavigate()
  const user = useUserContext()
  
  const [error, setError] = useState()

  console.error(import.meta.env.VITE_API_URL)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError()
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    
    let response = await fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body:JSON.stringify(userData)
      })

      let data = await response.json()

      if (response.status === 200) {
        user.setTokens(data)
        nav("/admin/ordenes")
      }else{
        alert('Usuario o Contraseña incorrecto')
    }
  }
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-primary">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center primary-color underline">
           Iniciar Session
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
                <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Nombre de Usuario
                </label>
                <input
                    type="text"
                    name='username'
                    id='username'
                    autoFocus
                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    name='password'
                    id='password'
                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-yellow-400 focus:ring-yellow-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
          
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#AD7A06] rounded-md hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700">
                    Ingresar
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login