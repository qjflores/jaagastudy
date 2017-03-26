import React, { Component } from 'react'
import BuyFestivalPass from './BuyFestivalPass'
import BuyMonthlyPass from './BuyMonthlyPass'
import BuyDayPass from './BuyDayPass'
import PassValidity from './PassValidity'


class Dashboard extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Purchase Passes</h1>
            <BuyFestivalPass />
            <BuyMonthlyPass />
            <BuyDayPass />
            <PassValidity />
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
