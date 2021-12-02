import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'

export async function getStaticProps(context) {
  const data = await fetchCoffeeStores()

  return {
    props: {
      stores: data
    }
  }
}

export default function Home(props) {
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
        { props.stores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.stores.map(store => (
                <Card
                  className={styles.card}
                  key={store.fsq_id}
                  name={store.name}
                  imageUrl={store.imgUrl}
                  href={`/store/${store.fsq_id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
 