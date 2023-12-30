import Image from "next/image";

export default function Home() {



  return (
    <main className="text-blue-400">
      <div className="home-hero">
        <div>
          <Image
            src={'/images/products/coat.png'}
            alt='Coat'
            height={100}
            width={100}
          />
        </div>
        <div>
          <Image
            src={'/images/products/turtleneck.png'}
            alt='Coat'
            height={100}
            width={100}
          />
        </div>
        <div>
          <Image
            src={'/images/products/pant.png'}
            alt='Coat'
            height={100}
            width={100}
          />
        </div>
      </div>
    </main>
  )
};
