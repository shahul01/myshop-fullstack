"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Cart from '@/app/components/Cart/Cart';
import styles from "./layout.module.css";
import '@/app/globals.css';
import type { Metadata } from 'next';
import Modal from '../components/Modal/Modal';

// export const metadata: Metadata = {
//   title: 'MyShop',
//   description: 'eCommerce Site',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [ isShowCart, setIsShowCart ] = useState(false);


  return (
    <html lang="en">
      <body className={styles.layout}>
        <div className={styles.navbar}>
          <Link href='/' title='Home page'>MyShop</Link>
          <button
              className={styles.cart}
              title='Toggle cart'
              onClick={() => setIsShowCart(!isShowCart)}
            >
            <Image
              src={'/icons/iconCart.svg'}
              alt='Cart icon'
              height={0}
              width={30}
            />
          </button>
        </div>
        <div className={styles.cart}>
          <Modal
              title="Cart"
              isShowModal={isShowCart}
              onClose={() => setIsShowCart(false)}
            >
              <Cart />

            </Modal>
        </div>
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  )
};
