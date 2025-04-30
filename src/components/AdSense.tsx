import Head from "next/head";

export default function AdSense() {
  return (
    <Head>
      {process.env.NODE_ENV === "production" ? (
        <script
          async={true}
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1833827605424482`}
          crossOrigin="anonymous"
        />
      ) : (
        ""
      )}
    </Head>
  );
}
