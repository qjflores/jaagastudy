import React, { Component } from 'react'
import SignUpFormContainer from '../../ui/signupform/SignUpFormContainer'

class SignUp extends Component {
  render() {
    console.log(this.props)
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Sign Up</h1>
            <p>We've got your wallet information!</p>
            <p>{}</p>
            <SignUpFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default SignUp
