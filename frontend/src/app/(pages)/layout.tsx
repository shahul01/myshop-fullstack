"use client";
import { useEffect, useRef, useState } from 'react';
import { Providers } from '@/lib/providers';
import { ConfigProvider } from 'antd';
import { useCookies } from 'react-cookie';
import Modal from '@/app/components/Modal/Modal';
import Navbar from '../components/Navbar/Navbar';
import Cart from '@/app/components/Cart/Cart';
import { authSlice, reduxStore } from '@/lib/redux';
import { tokenName } from '@/app/utils/constants';
import '@/app/globals.css';
import styles from './layout.module.css';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'MyShop',
//   description: 'eCommerce Site',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const firstRender = useRef(true);
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
  const [ cookies ] = useCookies([tokenName]);
  const [ isShowCart, setIsShowCart ] = useState(false);

  function checkIsAuth() {
    if (!cookies[tokenName]) return;
    reduxStore.dispatch(authSlice.actions.setIsAuth(true));
  };

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else checkIsAuth();

  }, []);

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
