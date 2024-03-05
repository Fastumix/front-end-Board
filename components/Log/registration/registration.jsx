import React, { useState, Component } from 'react';
import { TextInput, TouchableOpacity, View, Text, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import styles from './registratyion.style';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, fetchSignInMethodsForEmail } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';


const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;


  const [fontsLoaded] = useFonts({
    "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold" : require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
  });
  if(!fontsLoaded){
    return undefined;
  }
  

  const handleRegistration = async () => {
    try {
      if (password !== repeatPassword) {
        alert('Паролі не співпадають.');
        return;
      }

      setLoading(true);

      const response = await createUserWithEmailAndPassword(auth, email, password);

      console.log(response);

      // Navigate to the login page upon successful registration
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Registration error:', error);
      console.error('User registration error details:', error.details);
      console.error('User registration error details:', error.text); 
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.Container}>
      <TextInput
        style={{
          fontFamily: 'Montserrat',
          color: '#fff',
          borderStyle: 'solid',
          borderColor: '#D9D9D9',
          borderBottomWidth: 1,
          justifyContent: 'center',
          opacity: 0.6,
          marginTop: 40,
          paddingBottom:8,
        }}
        placeholder='  E-mail'
        placeholderTextColor='#fff'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={{
          fontFamily: 'Montserrat',
          color: '#fff',
          borderStyle: 'solid',
          borderColor: '#D9D9D9',
          borderBottomWidth: 1,
          justifyContent: 'center',
          opacity: 0.6,
          marginTop: 40,
          paddingBottom:8,
        }}
        placeholder='  Логін'
        placeholderTextColor='#fff'
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{
          fontFamily: 'Montserrat',
          color: '#fff',
          borderStyle: 'solid',
          borderColor: '#D9D9D9',
          borderBottomWidth: 1,
          justifyContent: 'center',
          opacity: 0.6,
          marginTop: 40,
          paddingBottom:8,
        }}
        placeholder='  Пароль'
        placeholderTextColor='#fff'
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TextInput
        style={{
          fontFamily: 'Montserrat',
          color: '#fff',
          borderStyle: 'solid',
          borderColor: '#D9D9D9',
          borderBottomWidth: 1,
          justifyContent: 'center',
          opacity: 0.6,
          marginTop: 40,
          paddingBottom:8,
        }}
        placeholder='  Повторіть Пароль'
        placeholderTextColor='#fff'
        secureTextEntry={true}
        onChangeText={(text) => setRepeatPassword(text)}
        value={repeatPassword}
      />

        <TouchableOpacity
          style={styles.Button}
          disabled={loading}
          onPress={handleRegistration}  
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ fontWeight: 500, fontFamily: 'Montserrat-Medium'}}>Зареєструватися</Text>
          )}
        </TouchableOpacity>

      <View style={styles.RegisterContainer}>
        <Text style={{ color: '#D9D9D9', fontSize: 12, textAlign: 'center', fontFamily: 'Montserrat' }}>
          Вже зареєстровані?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <Text style={{ color: '#EE6730', fontSize: 12, marginLeft: 5, fontFamily: 'Montserrat'}}>Увійти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registration;