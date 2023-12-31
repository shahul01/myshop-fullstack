import { useEffect, useState } from 'react';

type ProductDetailSlugProps = {
  params: {
    id: string;
  }
};

const ProductDetailSlug = (props: ProductDetailSlugProps) => {
  const { params: {id} } = props;


  return (
    <div className='product-detail-slug'>
      {id}

    </div>
  )
};


export default ProductDetailSlug;
