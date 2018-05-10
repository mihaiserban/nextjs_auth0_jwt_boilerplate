// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from 'next/document'
import {title, description, keywords, author} from '../project_config.json'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="en">
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
            <meta charSet="utf-8"/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>

            <link rel="icon" type="image/png" href="https://example.com/favicon.png"/>

            <link href="https://unpkg.com/normalize.css@8.0.0/normalize.css" rel="stylesheet"/>

            <link rel="stylesheet" href="/static/css/colors.css" />
            <link rel="stylesheet" href="/static/css/layout.css" />
            <link rel="stylesheet" href="/static/css/style.css" />

            <script defer src="/static/fonts/fontawesome-all.js"></script>
            <script defer src="/static/fonts/fa-v4-shims.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}