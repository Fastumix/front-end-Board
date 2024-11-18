import React, { Component } from 'react'
import { Header, Registration } from '../components'
import { View } from 'react-native'
import styles from '../styles/search'

export class RegistrationPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Registration/>
      </View>
    )
  }
}

export default RegistrationPage