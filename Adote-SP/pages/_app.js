import '../styles/global.css'; 
import Head from 'next/head'; 

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Telex&display=swap" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
