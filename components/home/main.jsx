import React from 'react';
import { Image, TouchableOpacity, View, Text, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import volley from '../../assets/images/Volleyball.png';
import football from '../../assets/images/FootBall.png';
import basketball from '../../assets/images/Basketball.png';
import tennis from '../../assets/images/Tennis.png'
import { useNavigation } from '@react-navigation/native';
import styles from './main.style';
import { useFonts } from 'expo-font';

const Main = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
      "Montserrat" : require("../../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Medium" : require("../../assets/fonts/Montserrat-Medium.ttf"),
    });
    if(!fontsLoaded){
    return undefined;
    }
    return (
      <SafeAreaView style={styles.Container}>
        
        <TouchableOpacity style={[styles.Button3, {justifyContent:'center'}]} onPress={() => navigation.navigate('UniversalPage')}>
            <Text style={{ fontFamily:'Montserrat-Medium'}}>Universal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button1} onPress={() => navigation.navigate('VolleyBallTeam')}>
            <Image
            style={styles.Image}
            source={volley}
            />
            <Text style={{fontWeight:'500', marginLeft: 90,}}>Волейбол</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button2}>
            <Image
            style={styles.Image}
            source={basketball}
            />
            <Text style={{fontWeight:'500'}}>Баскетбол</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button4}>
            <Image
            style={styles.Image}
            source={tennis}
            />
            <Text style={{fontWeight:'500'}}>Теніс</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.ExitButton} onPress={() => navigation.navigate('LoginPage')}>
            <Text style={{color:'#D21404'}} >Вихід</Text>
        </TouchableOpacity>

      </SafeAreaView>
    )
  }

export default Main