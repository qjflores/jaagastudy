import React, { Component } from 'react'
import Kitchen from './../../providers/Kitchen'
import Internet from './../../providers/Internet'
import TankerWater from './../../providers/TankerWater'
import DrinkingWater from './../../providers/DrinkingWater'
import Lease from './../../providers/Lease'

class Accounts extends Component {
  render() {
    console.log(this.props)
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Accounts</h1>
            <Kitchen />
            <Internet />
            <TankerWater />
            <DrinkingWater />
            <Lease />
          </div>
        </div>
      </main>
    )
  }
}

export default Accounts
