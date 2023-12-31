"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Providers } from '@/lib/providers';
import Modal from '@/app/components/Modal/Modal';
import Cart from '@/app/components/Cart/Cart';
import '@/app/globals.css';
import styles from "./layout.module.css";
import type { Metadata } from 'next';

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
    <Providers>
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
    </Providers>
  )
};
