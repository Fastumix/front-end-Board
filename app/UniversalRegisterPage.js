import React, { Component } from 'react'
import { UniversalRegister, Header } from '../components'
import { View } from 'react-native'
import styles from '../styles/search'

export class UniversalPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <UniversalRegister/>
      </View>
    )
  }
}

export default UniversalPage