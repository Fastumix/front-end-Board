import React, { Component } from 'react'
import { Header, Registration } from '../components'
import { View } from 'react-native'

export class RegistrationPage extends Component {
  render() {
    return (
      <View>
        <Header/>
        <Registration/>
      </View>
    )
  }
}

export default RegistrationPage