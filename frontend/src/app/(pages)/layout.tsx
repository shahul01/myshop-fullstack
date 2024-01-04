"use client";
import { Providers } from '@/lib/providers';
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import Modal from '@/app/components/Modal/Modal';
import Navbar from '../components/Navbar/Navbar';
import Cart from '@/app/components/Cart/Cart';
import '@/app/globals.css';
import styles from './layout.module.css';
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

  const antdConfig = {
    components: {
      Button: {
        colorPrimary: '#222',
        colorPrimaryHover: '#000',
        borderRadius: 0,
        defaultBorderColor: '#222',
      },
      Input: {
        colorPrimary: '#000',
        borderRadius: 0,
      }
    }
  };
  const [ isShowCart, setIsShowCart ] = useState(false);

  return (
    <Providers>
      <ConfigProvider
        theme={antdConfig}
      >
        <html lang="en">
          <body className={styles.layout}>
            <Navbar
              isShowCart={isShowCart}
              setIsShowCart={setIsShowCart}
            />

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
      </ConfigProvider>
    </Providers>
  )
};
