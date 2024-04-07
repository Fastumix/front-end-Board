import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.style';
import { FIREBASE_AUTH} from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Svg, Path } from 'react-native-svg';

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
  const [secret, setSecret] = useState(true);

  const handleSecret = () =>{
    setSecret(prevState => !prevState);
  }

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
    <KeyboardAwareScrollView>
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


      <View>
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
          secureTextEntry={secret}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={{position:'absolute', bottom:'15%', right:'0%'}} onPress={handleSecret}>
          { secret ?
          <Svg width="24" height="24" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M17.2603 5.82914C17.2364 5.7743 16.6514 4.47703 15.345 3.17063C14.1328 1.95984 12.0502 0.515625 9.00002 0.515625C5.94986 0.515625 3.86721 1.95984 2.65502 3.17063C1.34861 4.47703 0.763613 5.77219 0.739707 5.82914C0.715669 5.88314 0.703247 5.94159 0.703247 6.0007C0.703247 6.05981 0.715669 6.11826 0.739707 6.17227C0.763613 6.22641 1.34861 7.52367 2.65502 8.83008C3.86721 10.0409 5.94986 11.4844 9.00002 11.4844C12.0502 11.4844 14.1328 10.0409 15.345 8.83008C16.6514 7.52367 17.2364 6.22852 17.2603 6.17227C17.2844 6.11826 17.2968 6.05981 17.2968 6.0007C17.2968 5.94159 17.2844 5.88314 17.2603 5.82914ZM9.00002 10.6406C6.79361 10.6406 4.86705 9.83766 3.27307 8.25492C2.60487 7.59085 2.03943 6.83085 1.59541 6C2.03931 5.16928 2.60476 4.40949 3.27307 3.74578C4.86705 2.16234 6.79361 1.35938 9.00002 1.35938C11.2064 1.35938 13.133 2.16234 14.727 3.74578C15.3953 4.40949 15.9607 5.16928 16.4046 6C15.9567 6.85852 13.711 10.6406 9.00002 10.6406ZM9.00002 2.76562C8.36032 2.76562 7.73499 2.95532 7.2031 3.31072C6.67121 3.66611 6.25665 4.17125 6.01185 4.76226C5.76704 5.35326 5.70299 6.00359 5.82779 6.63099C5.95259 7.2584 6.26064 7.83471 6.71297 8.28705C7.16531 8.73938 7.74162 9.04743 8.36902 9.17223C8.99643 9.29703 9.64676 9.23298 10.2378 8.98817C10.8288 8.74337 11.3339 8.32881 11.6893 7.79692C12.0447 7.26503 12.2344 6.6397 12.2344 6C12.2333 5.14253 11.8922 4.32051 11.2858 3.71418C10.6795 3.10786 9.85749 2.76674 9.00002 2.76562ZM9.00002 8.39062C8.5272 8.39062 8.065 8.25042 7.67186 7.98773C7.27872 7.72505 6.97231 7.35168 6.79137 6.91485C6.61043 6.47802 6.56309 5.99735 6.65533 5.53361C6.74757 5.06988 6.97526 4.64391 7.30959 4.30957C7.64393 3.97524 8.0699 3.74755 8.53363 3.65531C8.99737 3.56307 9.47804 3.61041 9.91487 3.79135C10.3517 3.97229 10.7251 4.2787 10.9878 4.67184C11.2504 5.06498 11.3906 5.52718 11.3906 6C11.3906 6.63403 11.1388 7.2421 10.6904 7.69043C10.2421 8.13876 9.63405 8.39062 9.00002 8.39062Z" fill="white"/>
          </Svg>
          :
          <Svg width="18" height="18" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M13.5655 5.27499C13.5048 5.30959 13.4379 5.33188 13.3686 5.3406C13.2993 5.34931 13.229 5.34427 13.1616 5.32576C13.0943 5.30726 13.0312 5.27566 12.9761 5.23276C12.921 5.18986 12.8748 5.13651 12.8404 5.07577L11.5786 2.87108C10.8451 3.36705 10.0359 3.74069 9.18271 3.97741L9.57251 6.31623C9.58401 6.38509 9.58183 6.45553 9.56609 6.52354C9.55035 6.59155 9.52137 6.65579 9.48079 6.71259C9.4402 6.76939 9.38883 6.81764 9.32959 6.85457C9.27036 6.8915 9.20442 6.9164 9.13556 6.92784C9.10723 6.93247 9.07859 6.93491 9.04989 6.93514C8.92422 6.93495 8.80267 6.89021 8.70687 6.80887C8.61106 6.72754 8.54719 6.61487 8.52661 6.49088L8.14345 4.19456C7.33541 4.307 6.5157 4.307 5.70767 4.19456L5.3245 6.49088C5.30389 6.61509 5.23982 6.72794 5.14374 6.8093C5.04766 6.89067 4.9258 6.93527 4.79989 6.93514C4.77053 6.93502 4.74122 6.93258 4.71224 6.92784C4.64337 6.9164 4.57744 6.8915 4.5182 6.85457C4.45897 6.81764 4.40759 6.76939 4.36701 6.71259C4.32643 6.65579 4.29744 6.59155 4.2817 6.52354C4.26596 6.45553 4.26378 6.38509 4.27528 6.31623L4.66708 3.97741C3.81418 3.73994 3.00546 3.36563 2.27247 2.86909L1.01474 5.07577C0.979854 5.13655 0.933341 5.18987 0.877854 5.23267C0.822366 5.27548 0.758991 5.30694 0.691345 5.32525C0.6237 5.34357 0.55311 5.34838 0.483605 5.33941C0.414101 5.33044 0.347043 5.30788 0.28626 5.27299C0.225478 5.23811 0.172161 5.1916 0.129354 5.13611C0.0865473 5.08062 0.0550886 5.01725 0.0367745 4.9496C0.0184603 4.88196 0.0136491 4.81137 0.0226158 4.74186C0.0315824 4.67236 0.0541512 4.6053 0.0890336 4.54452L1.41716 2.2203C0.950654 1.81726 0.521682 1.37273 0.135518 0.892173C0.0873594 0.838403 0.0506639 0.775382 0.0276713 0.706958C0.00467871 0.638535 -0.00412863 0.566143 0.00178708 0.494202C0.00770279 0.422261 0.0282174 0.352281 0.0620786 0.288532C0.0959397 0.224783 0.142437 0.168604 0.198732 0.123423C0.255028 0.0782419 0.31994 0.0450076 0.389507 0.0257483C0.459074 0.00648891 0.531836 0.00160849 0.603352 0.0114053C0.674867 0.0212021 0.743637 0.0454706 0.805461 0.082729C0.867286 0.119987 0.920869 0.169454 0.96294 0.22811C2.06528 1.59209 3.99372 3.21639 6.92489 3.21639C9.85606 3.21639 11.7845 1.5901 12.8868 0.22811C12.9284 0.168254 12.9819 0.117596 13.0439 0.0792884C13.1059 0.040981 13.1751 0.0158433 13.2473 0.00543962C13.3194 -0.0049641 13.3929 -0.000411419 13.4632 0.0188144C13.5336 0.0380402 13.5992 0.0715281 13.656 0.117194C13.7128 0.16286 13.7596 0.219728 13.7935 0.284259C13.8273 0.34879 13.8476 0.419604 13.8529 0.492295C13.8583 0.564987 13.8486 0.638 13.8245 0.706794C13.8004 0.775587 13.7625 0.838689 13.7129 0.892173C13.3268 1.37273 12.8978 1.81726 12.4313 2.2203L13.7594 4.54452C13.7951 4.6051 13.8184 4.67216 13.8279 4.74181C13.8374 4.81146 13.8331 4.88231 13.815 4.95025C13.797 5.01819 13.7657 5.08188 13.7228 5.13763C13.68 5.19337 13.6265 5.24006 13.5655 5.27499Z" fill="white"/>
          </Svg>
          } 
        </TouchableOpacity>
      </View>
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
    </KeyboardAwareScrollView>
  );
};

export default Login;
