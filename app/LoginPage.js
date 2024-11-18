import React, { Component } from 'react';
import { Header, Login } from '../components';
import { View } from 'react-native';
import styles from '../styles/search';

export class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Login/>
      </View>
    )
  }
}

export default LoginPage