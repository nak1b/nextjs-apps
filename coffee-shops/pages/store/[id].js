import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import storesData from '../../data/coffee-stores.json';

export async function getStaticProps({ params }) {
  return {
    props: {
      store: storesData.find(store => {
        return store.id.toString() === params.id
      })
    }
  };
}

export async function getStaticPaths() {
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
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { address, name, neighbourhood } = props.store;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/"><a>Back to home</a></Link>
      <p>{name}</p>
      <p>{address}</p>
      <p>{neighbourhood}</p>
    </div>
  );
}
 