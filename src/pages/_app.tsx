import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Survey Easy</title>
                <link rel="shortcut icon" href="../logo.svg" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                ...
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
