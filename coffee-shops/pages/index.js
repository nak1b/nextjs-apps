import { useState, useEffect } from  'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import { useTrackLocation } from '../hooks/useTrackLocation';

export async function getStaticProps(context) {
  const data = await fetchCoffeeStores()

  return {
    props: {
      stores: data
    }
  };
};

export default function Home(props) {
  const { isLoading, latLong, locationErrorMsg, handleTrackLocation } = useTrackLocation();

  const [storesNearMe, setStoresNearMe] = useState([]);
  const [storesNearMeError, setStoresNearMeError] = useState(null);

  const handleBannerButtonClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const stores = await fetchCoffeeStores(latLong, 30);
        setStoresNearMe(stores);
      } catch(error) {
        setStoresNearMeError(error.message);
      }
    }

    if (latLong) {
      fetchStores();
    }
  }, [latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cofee Shops</title>
        <meta name="description" content="Discover your local Coffee shops!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          handleOnClick={handleBannerButtonClick}
          buttonText={isLoading ? "Locating..." : "View stores nearby"}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {storesNearMeError && <p>Something went wrong: {storesNearMeError}</p>}
        <div className={styles.heroImage}>
          <Image alt="hero image" src="/static/hero-image.png" height={400} width={700} />
        </div>

        { storesNearMe > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Nearby</h2>
            <div className={styles.cardLayout}>
              {storesNearMe.map(store => (
                <Card
                  className={styles.card}
                  key={store.id}
                  name={store.name}
                  imageUrl={store.imgUrl}
                  href={`/store/${store.id}`}
                />
              ))}
            </div>
          </div>
        )}

        { props.stores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.stores.map(store => (
                <Card
                  className={styles.card}
                  key={store.id}
                  name={store.name}
                  imageUrl={store.imgUrl}
                  href={`/store/${store.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
 