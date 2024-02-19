import React, { Component } from 'react'
import { TextInput, TouchableOpacity, View, Text, SafeAreaView } from 'react-native'
import styles from './Login.style'


export class Login extends Component {
  render(navigation) {
    return (
      <SafeAreaView style={styles.Container}>
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

        <TouchableOpacity style={styles.Button}>
          <Text style={{fontWeight:500}}>
            Увійти
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{alignItems: 'center', marginTop: 15}}>
          <Text style={{color:'#EE6730' }}>
            Забули пароль?
          </Text>
        </TouchableOpacity>
        
        <View style={styles.RegisterContainer}>
          <Text style={{ color: '#D9D9D9', fontSize: 12, textAlign: 'center' }}>
            Не маєте Аккаунта?
          </Text>
          <TouchableOpacity >
            <Text style={{ color: '#EE6730', fontSize: 12, marginLeft: 5 }}>
              Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default Login