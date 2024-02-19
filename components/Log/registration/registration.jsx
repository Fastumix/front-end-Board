import React, { Component } from 'react'
import { TextInput, TouchableOpacity, View, Text, SafeAreaView } from 'react-native'
import styles from '../Log_in/Login.style'

export class Registration extends Component {
  render() {
    return (
        <SafeAreaView style={styles.Container}>
        <TextInput 
          style={styles.Login}
          placeholder='  E-mail'
          placeholderTextColor= {'#fff'}
        />
        <TextInput 
          style={styles.Login}
          placeholder='  Логін'
          placeholderTextColor= {'#fff'}
        />
        <TextInput 
          style={styles.Login}
          placeholder='  Пароль'
          placeholderTextColor= {'#fff'}
        />
        <TextInput 
          style={styles.Login}
          placeholder='  Повторіть Пароль'
          placeholderTextColor= {'#fff'}
        />

        <TouchableOpacity style={styles.Button}>
          <Text style={{fontWeight:500}}>
            Зареєструватися
          </Text>
        </TouchableOpacity>

        <View style={styles.RegisterContainer}>
          <Text style={{ color: '#D9D9D9', fontSize: 12, textAlign: 'center' }}>
            Вже зареєстровані?
          </Text>
          <TouchableOpacity >
            <Text style={{ color: '#EE6730', fontSize: 12, marginLeft: 5 }}>
              Увійти
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
}

export default Registration