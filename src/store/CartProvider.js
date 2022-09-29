import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

//logic for adding cart items
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //check if the item is already apart of the cart
    //returns the index of the item in the array if it exist
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //check if item exist and part of the array [existingCartItemIndex]
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //if existingCartItem is truthy, then updatedItem set equal to new object that copies the existingCartItem and updates the amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      //updatedItems = new array, copying the old objects
      //overide updateItems[] with updatedItem;
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      //else case for the item added to the first time to the array cartItems array
    } else {
      //joining items into new array
      updatedItems = state.items.concat(action.item);
    }
    return {
      //returns new state snapshot
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

//Manages CartContext Data and provides that Context to any components that want access to it.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  //Concrete Context Value which will be updated over time
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    //make sure to add {props.children}
    //add value pointer to CartContext.Provider
    //a wrapper that gives any component wrapped within access to context
    //replace App.js Fragment with CartProvider component
    //also for useContext() pass (CartContext) in HeaderCartButton.js
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
