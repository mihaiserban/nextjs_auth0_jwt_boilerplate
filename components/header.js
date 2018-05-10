/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import Package from '../package.json'

const links = [
  { href: '/product', text: 'Product', anonymousOnly: true},
  { href: '/pricing', text: 'Pricing', anonymousOnly: true },
  { href: '/auth/sign-in', text: 'Sign In', anonymousOnly: true },
  { href: '/auth/sign-off', text: 'Sign Off', authRequired: true },
  { href: '/get-started', text: 'Get Started', anonymousOnly: true},
]

const getAllowedLinks = isAuthenticated => links
  .filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
  .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))
  
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      isAuthenticated: PropTypes.bool.isRequired,
    }
  }

  static get defaultProps() {
    return {
      isAuthenticated: false,
    }
  }

  render() {
    const {isAuthenticated} = this.props

    return (
      <div className='header flex-parent flex-parent--row flex-parent--center-cross'>
        <div className='leftButtons flex-parent flex-parent--row'>
          <Link href='/'><a className='flex-child mr20 link'>project_name</a></Link>
        </div>
        <div className='rightButtons flex-parent flex-parent--row'>
          {getAllowedLinks(isAuthenticated).map(l => (
            <Link key={l.href} href={l.href}><a className='flex-child mr10 link'>{l.text}</a></Link>
          ))}
        </div>
        <style jsx>{`
          .header {
            padding-top: 1.5rem;
            padding-bottom: 1.5rem;
            margin-left: 50px;
            margin-right: 50px;
          }
          .link {
            color: #999;
            text-decoration: none;
            text-transform: uppercase;
            padding-top: 2px;
            padding-bottom: 2px;
            border-top: 1px solid transparent;
            border-bottom: 1px solid transparent;
            transition: color .25s;
            cursor:pointer
          }
          .link:hover {
            color: black;
          }
          .leftButtons {
            margin-left:0;
            margin-right:auto;
          }
          .rightButtons {
            margin-left:auto;
            margin-right:0;
          }
          .menuItem {
            height: 15px;
          }
          .menuIcons {
            color: #262a5f;
          }
        `}</style>
      </div>
    )
  }
}

export default Header;
