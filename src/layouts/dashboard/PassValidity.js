import React, { Component } from 'react'

class BuyMonthlyPass extends Component {
  constructor(props){
    super(props)
    this.state ={
      validity:''
    }
  }
  componentWillMount() {
    // get the user's validity from fund manager contarct
  }
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          <p>Your pass is valid until</p>
          <h1>{this.state.validity}</h1>
          </div>
        </div>
      </main>
    )
  }
}

export default BuyMonthlyPass
