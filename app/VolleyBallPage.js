import { Text, View } from 'react-native';
import React, { Component } from 'react';
import { VolleyBall } from '../components';
import styles from '../styles/search';

export class VolleyBallPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <VolleyBall/>
      </View>
    )
  }
}

export default VolleyBallPage