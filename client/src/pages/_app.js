import "@/styles/globals.css";
import "@/styles/Home.css";
import Head from "next/head";
import Image from "next/image";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* <link rel="shortcut icon" href="logo" /> */}
                <title>Feta</title>
                <link rel="icon" href="/favicon_io/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
