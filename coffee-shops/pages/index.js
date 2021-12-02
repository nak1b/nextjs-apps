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
                  imageUrl={store.imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
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
 