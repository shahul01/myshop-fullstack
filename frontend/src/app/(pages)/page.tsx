import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {

  const data = [
    {
      id: '1',
      title: 'Coat',
      image: {src: '/images/products/coat.png', alt: 'Coat'},
      price: '$59.99',
    },
    {
      id: '2',
      title: 'Turtleneck',
      image: {src: '/images/products/turtleneck.png', alt: 'Turtleneck'},
      price: '$29.99',
    },
    {
      id: '3',
      title: 'Pant',
      image: {src: '/images/products/pant.png', alt: 'Pant'},
      price: '$39.99',
    },
  ];


  return (
    <main className={'text-blue-400'}>
      <div className={styles["home-hero"]}>
        {data.map((currProduct, idx) => (
          <Link
            key={currProduct.id}
            className={styles[`product-${idx+1}`]}
            href={`/product/${currProduct.id}`}
            title={currProduct.title}
            >
            <Image
              src={currProduct.image.src}
              alt={currProduct.image.alt}
              height={0}
              width={300}
            />
          </Link>
        ))}
      </div>
    </main>
  )
};
