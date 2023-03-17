import { useState } from "react"
import { API_URL } from "../../../constants/env"
import { useNavigate } from "react-router-dom"


const Login = () => {
  const nav = useNavigate()
  const [error, setError] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError()
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    }
    
      fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('authTokens', JSON.stringify(data))
        nav("/admin/ordenes")
      })
      .catch(error => console.log('Error:', error)) 
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
                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
          
            <div className="mt-6">
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#AD7A06] rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Ingresar
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Login