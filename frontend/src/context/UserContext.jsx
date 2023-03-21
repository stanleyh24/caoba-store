import axios from "axios"
import { createContext,  useState, useContext } from "react"


const UserContext = createContext({
    setTokens: (item) => {},
    logout: () =>{},
    updateToken: () =>{},
})

const UserProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [userData, setUserData] = useState({
        name: 'stanley',
    })

    function handleAddTokens (tokens) {
        localStorage.setItem('authTokens', JSON.stringify(tokens))
        setAuthTokens(tokens)
    }

    function handleLogout () {
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
    }

    function handleUpdateToken(token) {
      //localStorage.removeItem('authTokens')
      let tokens = {
        access:token,
        refresh:authTokens.refresh
      }

      localStorage.setItem('authTokens', JSON.stringify(tokens))
      setAuthTokens(tokens)
    }



   
  return (
    <UserContext.Provider value={{ userData, setUserData, authTokens, setTokens: handleAddTokens, logout: handleLogout, updateToken: handleUpdateToken }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }


export function useUserContext () {
    return useContext(UserContext)
}