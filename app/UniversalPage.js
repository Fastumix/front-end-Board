import React, { Component } from 'react'
import { Universal } from '../components'
import { View } from 'react-native'
import styles from '../styles/search'

export class UniversalPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Universal/>
      </View>
    )
  }
}

export default UniversalPage