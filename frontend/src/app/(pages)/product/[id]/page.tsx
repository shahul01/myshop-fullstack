"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { productDatas } from '@/app/utils/datas';
import {
  useDispatch, cartSlice
} from '@/lib/redux';
import styles from './page.module.css';

type ProductDetailSlugProps = {
  params: {
    id: string;
  }
};

const ProductDetailSlug = (props: ProductDetailSlugProps) => {
  const { params: {id: urlId} } = props;

  const dispatch = useDispatch();

  const currProductData = productDatas.find(currProduct => (
    currProduct.id === urlId
  ));


  return (
    <div className={styles['product-detail-slug']}>
      <div className={styles['product-box']}>
        {
          currProductData && (
            <>
              <Image
                src={currProductData?.image.src}
                alt={currProductData?.image.alt}
                height={0}
                width={400}
              />
              <div className={styles.details}>
                <h2>{currProductData?.title}</h2>
                <p className={styles.price}>
                  {currProductData?.price}
                </p>
                <button
                    onClick={() => (
                      dispatch(
                        cartSlice.actions.addProduct(currProductData)
                      )
                    )}
                    className={styles['add-to-cart']}
                  >
                  Add to Cart
                </button>
              </div>
            </>
          )
        }

      </div>


    </div>
  )
};


export default ProductDetailSlug;
