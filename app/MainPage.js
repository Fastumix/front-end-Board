import React, { Component } from 'react'
import { Header, Main } from '../components'
import { View, SafeAreaView } from 'react-native'
import styles from '../styles/search'

export class RegistrationPage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header/>
        <Main/>
      </SafeAreaView>
    )
  }
}

export default RegistrationPage