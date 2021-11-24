import Head from 'next/head'
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
      </main>
    </div>
  );
}
 