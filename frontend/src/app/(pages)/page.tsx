import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {



  return (
    <main className={'text-blue-400'}>
      <div className={styles["home-hero"]}>
        <div className={styles["product-1"]}>
          <Image
            src={'/images/products/coat.png'}
            alt='Coat'
            height={0}
            width={300}
          />
        </div>
        <div className={styles["product-2"]}>
          <Image
            src={'/images/products/turtleneck.png'}
            alt='Coat'
            height={0}
            width={300}
          />
        </div>
        <div className={styles["product-3"]}>
          <Image
            src={'/images/products/pant.png'}
            alt='Coat'
            height={0}
            width={300}
          />
        </div>
      </div>
    </main>
  )
};
