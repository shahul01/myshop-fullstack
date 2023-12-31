import Link from "next/link";
import Image from "next/image";
import { productDatas } from "../utils/datas";
import styles from "./page.module.css";

export default function Home() {


  return (
    <main className={'text-blue-400'}>
      <div className={styles["home-hero"]}>
        {productDatas.map((currProduct, idx) => (
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
