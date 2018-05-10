import React from 'react'
import Router from 'next/router'
import Layout from '../components/layout'

import { getUserFromServerCookie, getUserFromLocalCookie } from '../utils/auth'

export default Page => class DefaultPage extends React.Component {
    static getInitialProps (ctx) {
      const loggedUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(ctx.req)
      const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)
      return {
        ...pageProps,
        loggedUser,
        currentUrl: ctx.pathname,
        isAuthenticated: !!loggedUser
      }
    }
  
    logout = (eve) => {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }
  
    componentDidMount () {
      window.addEventListener('storage', this.logout, false)
    }
  
    componentWillUnmount () {
      window.removeEventListener('storage', this.logout, false)
    }
  
    render() {
        return(
          <Layout {...this.props}>
            <Page
              {...this.state}
              {...this.props}
              />
          </Layout>
        );
    }
}