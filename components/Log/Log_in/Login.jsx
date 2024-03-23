import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.style';
import { FIREBASE_AUTH} from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH

  const [fontsLoaded] = useFonts({
    "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold" : require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail && savedPassword) {
        try {
          setLoading(true);
          const response = await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
          console.log(response);
          navigation.navigate('MainPage');
        } catch (error) {
          console.error(error);
          // Handle error, e.g., credentials are no longer valid
        } finally {
          setLoading(false);
        }
      }
    };

    checkLoggedIn();
  }, []);
  

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      console.log(response);
      navigation.navigate('MainPage');
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка входу', 'Невірний логін або пароль. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator until fonts are loaded
  }

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
        placeholder='  Логін'
        placeholderTextColor='#fff'
        onChangeText={(text) => setEmail(text)}
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
      />
        {
        loading ? <ActivityIndicator size="large" color="white"/>
        : <>
      <TouchableOpacity
        style={styles.Button}
        onPress={handleLogin}
        
      >
        <Text style={{fontFamily: 'Montserrat-Medium'}}>
          Увійти
        </Text>
      </TouchableOpacity>
        </>
      }

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
        <Text style={{ color: '#EE6730', fontFamily: 'Montserrat'}}>
          Забули пароль?
        </Text>
      </TouchableOpacity>

      <View style={styles.RegisterContainer}>
        <Text style={{ color: '#D9D9D9', fontSize: 12, textAlign: 'center', fontFamily: 'Montserrat'}}>
          Не маєте Аккаунта?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
          <Text
            style={{ color: '#EE6730', fontSize: 12, marginLeft: 5, fontFamily: 'Montserrat'}}
          >
            Зареєструватися
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
