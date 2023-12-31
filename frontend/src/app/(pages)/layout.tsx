import Link from 'next/link';
import Image from 'next/image';
import styles from "./layout.module.css";
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MyShop',
  description: 'eCommerce Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.layout}>
        <div className={styles.navbar}>
          <Link href='/' title='Home page'>MyShop</Link>
          <button
              className={styles.cart}
              title='Display cart'
            >
            <Image
              src={'/icons/iconCart.svg'}
              alt='cart icon'
              height={0}
              width={30}
            />
          </button>
        </div>
        <div className={styles.children}>{children}</div>
      </body>
    </html>
  )
}
