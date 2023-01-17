import { createContext, useState, useContext } from "react";
//import CartReducer from "./CartReducer";

const CartContext = createContext({
    items: [],
    addItemToCart: (item) => {},
    deleteItemToCart: () => {},
    getNumberOfItems: () => {},
    getTotalOfCart: () => {},

});

/* const CartProvider = ({children}) => {
    const initialState = {
        cart:[]
    }
    const [state, dispatch] = useReducer(CartReducer, initialState)
    
    return(
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}


export {CartContext, CartProvider}

 */


export default function StateWrapper({children}) {
    const [items, setItems] = useState([])

    function handleAddItemToCart(item) {  
        const temp = [...items]
        const found = temp.find(prod => prod.variant.id === item.variant.id);
        if (found) {
            found.qty++;
        }else{
            item.qty = 1;
            temp.push(item);
        }
        setItems(temp)
    }

    function handleNumberOfItems() {
        const total = items.reduce((acc, item) => acc + item.qty, 0);
        return total;
    }

    function handlegetTotalOfCart() {
        let total = 0
        for (let i = 0; i < items.length; i++){
            total += items[i].variant.price
        }
        return total.toFixed(2)
    }

    return(
        <CartContext.Provider value={{
            items,
            addItemToCart: handleAddItemToCart,
            getNumberOfItems: handleNumberOfItems,
            getTotalOfCart: handlegetTotalOfCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}


export function useCartContext () {
    return useContext(CartContext)
}