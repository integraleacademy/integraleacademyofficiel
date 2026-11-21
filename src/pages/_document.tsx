import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class SiteDocument extends Document {
  render() {
    const isParcours = this.props.__NEXT_DATA__.page === '/parcoursalternance';
    return (
      <Html lang="fr">
        <Head>
          {isParcours && <link rel="stylesheet" href="/parcours-alternance/presentation.css" />}
        </Head>
        <body className={isParcours ? 'landing-page' : undefined}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
