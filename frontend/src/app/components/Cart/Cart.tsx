import { useEffect, useState } from 'react';
import { cartSlice, useSelector, selectCart } from '@/lib/redux';
import styles from './cart.module.css';


type CartProps = {

};


const Cart = (props:CartProps) => {
  const {  } = props;

  const cart = useSelector(selectCart);
  console.log(`cart: `, cart);

  return (
    <div className={styles.cart}>
      <p>(Hello from Cart 👋)</p>
      {cart.map((currCart, idx) => (
        <div key={idx}>
          <p>{currCart.title}</p>
          {/* Image */}
        </div>
      ))}
    </div>


  )
};


export default Cart;
