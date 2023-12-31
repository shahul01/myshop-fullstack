import Image from 'next/image';
import { useEffect, useState } from 'react';
import { productDatas } from '@/app/utils/datas';
import styles from './page.module.css';

type ProductDetailSlugProps = {
  params: {
    id: string;
  }
};

const ProductDetailSlug = (props: ProductDetailSlugProps) => {
  const { params: {id: urlId} } = props;

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
              <div className='details'>
                <h2>{currProductData?.title}</h2>
                <p>{currProductData?.price}</p>
              </div>
            </>
          )
        }

      </div>


    </div>
  )
};


export default ProductDetailSlug;
