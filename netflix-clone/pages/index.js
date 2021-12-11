import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Netflix</h1>
    </div>
  );
}
