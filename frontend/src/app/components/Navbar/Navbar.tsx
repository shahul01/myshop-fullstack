import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthNav from './_components/AuthNav/AuthNav';
import styles from './navbar.module.css';
import Image from 'next/image';


type NavbarProps = {
  isShowCart: boolean;
  setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};


const Navbar = (props:NavbarProps) => {
  const { isShowCart, setIsShowCart  } = props;

  return (
    <div className={styles.navbar}>
      <Link href='/' title='Home page'>MyShop</Link>

      <div className={styles.right}>
        <AuthNav />

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
    </div>
  )
};


export default Navbar;
