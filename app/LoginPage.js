import React, { Component } from 'react'
import { Header, Login } from '../components'
import { View } from 'react-native'

export class LoginPage extends Component {
  render() {
    return (
      <View>
        <Header/>
        <Login/>
      </View>
    )
  }
}

export default LoginPage