import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="upC0HEZqSTbD6EzT_b6xTrxsr8zYxFM982wGvWiVlsw"
        />
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
      <body className="min-h-screen bg-[#F5F5F5]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
