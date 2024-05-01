import "@/styles/globals.css";
import "@/styles/Home.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                {/* <link rel="shortcut icon" href="logo" /> */}
                <title>Feta</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
