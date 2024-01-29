"use client";
import { useEffect, useState } from 'react';
import { tokenName } from '@/app/utils/constants';
// import styles from './page.module.css';


type pageProps = {

};


const page = (props:pageProps) => {
  const {  } = props;

  async function handleTestAuth() {
    const token = localStorage.getItem(tokenName);
    if (!token) return console.log('no token');
    const getTestAuth = await fetch('http://localhost:8000/test-auth', {
      method: 'GET',
      headers: {
        'auth-token': token
      }
    });
    const resTestAuth = await getTestAuth.json();
    return console.log(resTestAuth);
  };


  return (
    <div className='page'>
      <button className='border' onClick={handleTestAuth}>
        Test Auth
      </button>

    </div>
  )
};


export default page;
