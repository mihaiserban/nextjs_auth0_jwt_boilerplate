import React from 'react'
import Layout from '../components/layout'
import Package from '../package.json'
import Router from 'next/router'

import defaultPage from '../hocs/defaultPage'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        test
      </div>
    )
  }
}

export default defaultPage(Index)
