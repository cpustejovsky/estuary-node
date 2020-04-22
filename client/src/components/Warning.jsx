import React, { Component } from 'react'

export default class Warning extends Component {
  render() {
    return (
      <div className="site__warning">
        <strong>WARNING:</strong> This site is undergoing maitenance and is not production ready. Do not save essential data that you cannot retrive.
      </div>
    )
  }
}
