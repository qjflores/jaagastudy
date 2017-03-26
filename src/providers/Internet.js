import React, { Component } from 'react'

class Internet extends Component {
  constructor(props){
    super(props)
    this.state = {amount:''}
  }
  componentWillMount(){
    // get the amount from the drinking water contract
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
          Internet
          </div>
          <div>
          {this.state.amount}
          </div>
        </div>
      </main>
    )
  }
}

export default Internet
