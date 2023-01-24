import { createContext, useState, useContext } from "react";

const CartContext = createContext({
    items: [],
    addItemToCart: (item) => {},
    deleteItemToCart: () => {},
    getNumberOfItems: () => {},
    getTotalOfCart: () => {},
    clearCart: () => {},

});


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
            total += items[i].variant.price * items[i].qty
        }
        return total.toFixed(2)
    }

    function handleDeleteItemToCart(item) {
        let temp = [...items]
        const found = temp.find(prod => prod.variant.id === item.variant.id);
        if (found) {
            if (found.qty > 1) {
                found.qty--;
            } else {
                temp = temp.filter(prod => prod.variant.id !== item.variant.id)
            }
        }
        setItems(temp)
    }

    function handleClearCart() {
        setItems([])
    }

    return(
        <CartContext.Provider value={{
            items,
            addItemToCart: handleAddItemToCart,
            getNumberOfItems: handleNumberOfItems,
            getTotalOfCart: handlegetTotalOfCart,
            deleteItemToCart:handleDeleteItemToCart,
            clearCart:handleClearCart,

        }}>
            {children}
        </CartContext.Provider>
    )
}


export function useCartContext () {
    return useContext(CartContext)
}