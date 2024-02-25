import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.style';
import { FIREBASE_AUTH} from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH


  



  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await  signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('MainPage');
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка входу', 'Невірний логін або пароль. Спробуйте ще раз.');
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.Container}>
      <TextInput
        style={styles.Login}
        placeholder='  Логін'
        placeholderTextColor='#fff'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.Login}
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
        <Text style={{ fontWeight: 500}}>
          Увійти
        </Text>
      </TouchableOpacity>
        </>
      }

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 15 }}>
        <Text style={{ color: '#EE6730' }}>
          Забули пароль?
        </Text>
      </TouchableOpacity>

      <View style={styles.RegisterContainer}>
        <Text style={{ color: '#D9D9D9', fontSize: 12, textAlign: 'center'}}>
          Не маєте Аккаунта?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
          <Text
            style={{ color: '#EE6730', fontSize: 12, marginLeft: 5}}
          >
            Зареєструватися
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
