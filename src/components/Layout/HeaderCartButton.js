import { useContext } from "react";

import classes from "./HeaderCartButton.module.css";

//1.import CartContext
import CartContext from "../../store/CartContext";

import CartIcon from "../Cart/CartIcon";

//passing in CartContext - useContext(CartContext);
const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  //Takes an array and turns it into a single value
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
