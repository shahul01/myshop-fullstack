"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const ProductDetail = () => {

  const router = useRouter();


  useEffect(() => {

    setTimeout(() => {
      router.push('/');
    }, 1000);

  }, [])


  return (
    <div className='ProductDetail'>
      <h2>Redirecting to home page</h2>

    </div>
  )
};


export default ProductDetail;
