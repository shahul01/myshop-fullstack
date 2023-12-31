import { useEffect, useState } from 'react';
import {
  selectCart, useSelector
} from '@/lib/redux';
import styles from './cart.module.css';


type CartProps = {

};


const Cart = (props:CartProps) => {
  const {  } = props;

  const cart = useSelector(selectCart);
  console.log(`cart: `, cart);

  return (
    <div className={styles.cart}>
      {cart.map((currCart, idx) => (
        <div className={styles.product} key={idx}>
          <span>{currCart.title}</span>
          <span> - </span>
          <span>{currCart.qty}</span>
          {/* Image */}
        </div>
      ))}
    </div>


  )
};


export default Cart;
