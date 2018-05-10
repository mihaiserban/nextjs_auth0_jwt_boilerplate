import React from 'react'
import Link from 'next/link'

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className='footer fullWidth'>
          footer
        </div>
        <style jsx>{`
          .footer {
            position: relative;
            bottom: -50px;
            left: 0;
            height: 50px;
            background: red;
          }
        `}</style>
      </footer>
    )
  }
}
