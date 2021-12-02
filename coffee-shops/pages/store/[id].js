import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import classnames from 'classnames';

import styles from '../../styles/store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';

export async function getStaticProps({ params }) {
  const storesData = await fetchCoffeeStores()

  return {
    props: {
      store: storesData.find(store => {
        return store.id.toString() === params.id
      })
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
    fallback: false
  };
}

export default function Store(props) {
  const router = useRouter()

  const handleUpVote = () => {

  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { address, name, neighborhood, imgUrl } = props.store;

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
          <Image src={imgUrl} alt="store image" width={600} height={360} className={styles.storeImg} />
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
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpVote}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
}
 