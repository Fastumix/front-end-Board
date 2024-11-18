import React, { Component } from 'react'
import { Header, Restore } from '../components'
import { View } from 'react-native'
import styles from '../styles/search'

export class RegistrationPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Restore/>
      </View>
    )
  }
}

export default RegistrationPage