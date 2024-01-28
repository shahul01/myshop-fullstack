"use client";
import { useEffect, useState } from 'react';
// import styles from './page.module.css';


type pageProps = {

};


const page = (props:pageProps) => {
  const {  } = props;

  async function handleTestAuth() {
    const getTestAuth = await fetch('http://localhost:8000/test-auth', {
      method: 'GET',
      credentials: 'include'
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
