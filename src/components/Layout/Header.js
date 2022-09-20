import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/meal_items.png";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals with React</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
