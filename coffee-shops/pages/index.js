import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'

export default function Home() {
  const handleBannerButtonClick = () => {}

  return (
    <div className={styles.container}>
      <Head>
        <title>Cofee Shops</title>
        <meta name="description" content="Discover your local Coffee shops!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner handleOnClick={handleBannerButtonClick} buttonText="View Stores nearby" />
        <div className={styles.heroImage}>
          <Image alt="hero image" src="/static/hero-image.png" height={400} width={700} />
        </div>
      </main>
    </div>
  );
}
 