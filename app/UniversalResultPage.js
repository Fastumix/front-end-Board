import React, { Component } from 'react'
import { Results } from '../components'
import { View } from 'react-native'
import styles from '../styles/search'

export class UniversalResultPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Results/>
      </View>
    )
  }
}

export default UniversalResultPage