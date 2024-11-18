import {  View } from 'react-native';
import React, { Component } from 'react';
import { Header, TeamRegistration} from '../components';
import styles from '../styles/search';

export class VolleyBallTeam extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <TeamRegistration/>
      </View>
    )
  }
}

export default VolleyBallTeam