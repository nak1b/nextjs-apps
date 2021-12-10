import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';
import useSWR from 'swr';

import { StoreContext } from '../../store/store-context';
import styles from '../../styles/store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { isEmpty, fetcher } from '../../utils';

export async function getStaticProps({ params }) {
  const storesData = await fetchCoffeeStores();

  const findStoreById = storesData.find(store => {
    return store.id.toString() === params.id
  });

  return {
    props: {
      store: findStoreById ?? {}
    }
  };
}

export async function getStaticPaths() {
  const storesData = await fetchCoffeeStores()

  const paths = storesData.map(store => {
    return {
      params: { id: store.id.toString() }
    }
  })
  
  return {
    paths,
    fallback: true
  };
}

export default function Store(initialProps) {
  const { state: { coffeeStores } } = useContext(StoreContext);
  const [coffeeStore, setCoffeeStore] = useState(initialProps.store ?? {});
  const [votingCount, setVotingCount] = useState(0);

  const router = useRouter();
  const id = router?.query?.id;

  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

  const handleCreateStore = async (storeData) => {
    const { id, name, address, neighborhood, votes, imgUrl } = storeData;

    try {
      const res = await fetch('/api/createCoffeeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          name,
          imgUrl,
          votes: votes ?? 0,
          address: address ?? '',
          neighborhood: neighborhood ?? ''
        })
      });
      const dbStore = await res.json();

    } catch(err) {
      console.log('Error creating store', err)
    }
  }

  useEffect(() => {
    if (data?.length) {
      const store = data[0];
      setCoffeeStore(store);
      setVotingCount(store.votes);
    }
  }, [data]);

  useEffect(() => {
    if (isEmpty(initialProps.store)) {
      const storeFromContext = coffeeStores.find(store => {
        return store.id.toString() === id
      });

      if (storeFromContext) {
        setCoffeeStore(storeFromContext ?? {});
        handleCreateStore(storeFromContext);
      }
    } else {
      // SSG
      handleCreateStore(initialProps.store);
    }
  }, [initialProps.store, id, coffeeStores]);

  const handleUpVote = async () => {
    try {
      const res = await fetch('/api/favoriteCoffeeStoreById', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });
      const dbStore = await res.json();
     
      if(dbStore?.length) {
        setVotingCount(v => v + 1)
      }
    } catch(err) {
      console.log('Error updating store votes', err)
    }
  };

  if (router.isFallback) {
    return <div>Loading...</div>
  };
 
  const { address, name, neighborhood, imgUrl, votes } = coffeeStore;

  return (
    <div className={styles.laylout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>
          <Image src={imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'} alt="store image" width={600} height={360} className={styles.storeImg} />
        </div>
        <div className={classnames("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" alt="icon" height={24} width={24} />
            <p className={styles.text}>{address}</p>
          </div>
          { neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" alt="icon" height={24} width={24} />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" alt="icon" height={24} width={24} />
            <p className={styles.text}>{votingCount}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVote}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
}
 