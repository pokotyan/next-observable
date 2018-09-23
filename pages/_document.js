import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <style jsx global>{`
            @font-face {
              font-family: 'pokemon-font';
              src: 
                url('static/fonts/pokemon-font.woff2') format('woff2'),
                url('static/fonts/pokemon-font.woff') format('woff');
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}