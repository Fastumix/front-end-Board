import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Log_in/Login.style';
import { FIREBASE_AUTH } from '../../../firebase/firebase';
import { useFonts } from 'expo-font';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { sendPasswordResetEmail } from 'firebase/auth';

const Restore = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState('');
  const [email, setEmail] = useState('');
  const auth = FIREBASE_AUTH;
  const [fontsLoaded] = useFonts({
    "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold" : require("../../../assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
  });

  const handleReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error(error);
      Alert.alert('Помилка відновлення', 'Такого email не існує.');
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <KeyboardAwareScrollView>
    <SafeAreaView style={[styles.Container, {marginTop: '25%'}]}>
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
          placeholder='  Email для відновлення'
          placeholderTextColor='#fff'
          onChangeText={(text) => setEmail(text)}
        />

        {
        loading ? <ActivityIndicator size="large" color="white"/>
        : <>
      <TouchableOpacity
        style={[styles.Button, {marginTop: '65%'}]}
        onPress={handleReset}
        
      >
        <Text style={{fontFamily: 'Montserrat-Medium'}}>
          Відновити
        </Text>
      </TouchableOpacity>
        </>
      }

        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}>
          <TouchableOpacity style={{
            width:190,
            height: 40,
            borderColor: '#D21404',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRadius: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} onPress={() => navigation.navigate('MainPage')}>
              <Text style={{color:"#D21404", fontFamily: 'Montserrat-Medium'}}>Назад</Text>
          </TouchableOpacity>
        </View>

    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Restore;
