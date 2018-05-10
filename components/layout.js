import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Footer from './footer'

import { initGA, logPageView } from '../utils/analytics'
import Header from './header';

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  static get propTypes() {
    return {

    }
  }

  static get defaultProps() {
    return {

    }
  }

  componentDidMount () {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }

  render() {

    return (
      <div className='flex-parent flex-parent--column wrapper'>
        <div className='header'>
          <Header {...this.props}/>
        </div>

        <div className='flex-parent flex-parent--column wrapper'>
          {this.props.children}
        </div>

        <div className='footer'>
          <Footer/>
        </div>
        <style jsx>{`
          .wrapper {
            min-width: 100vw;
            min-height: 100vh;
          }
          .header {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }

}
