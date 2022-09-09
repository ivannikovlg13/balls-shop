import React from 'react';
import { Link } from 'react-router-dom';

import emptyCart from '../assets/img/empty-cart.svg';

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        You probably didn't order the ball.
        <br />
        To order a ball, go to the main page.
      </p>
      <img src={emptyCart} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
