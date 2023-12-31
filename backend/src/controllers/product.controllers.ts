import type { Request, Response } from 'express';


const tempData = [
  {
    id: '1',
    title: 'Coat',
    image: {src: '/images/products/coat.png', alt: 'Coat'},
    price: '$59.99',
    description: ''
  },
  {
    id: '2',
    title: 'Turtleneck',
    image: {src: '/images/products/turtleneck.png', alt: 'Turtleneck'},
    price: '$29.99',
    description: ''
  },
  {
    id: '3',
    title: 'Pant',
    image: {src: '/images/products/pant.png', alt: 'Pant'},
    price: '$39.99',
    description: ''
  },
];


async function getAllProducts(req:Request, res:Response) {
  res.status(200).json({ products: tempData });
};

export default {
  getAllProducts,
};
