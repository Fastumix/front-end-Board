import React from 'react';
import { Image, TouchableOpacity, View, Text, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import volley from '../../assets/images/Volleyball.png';
import football from '../../assets/images/FootBall.png';
import basketball from '../../assets/images/Basketball.png';
import { useNavigation } from '@react-navigation/native';
import styles from './main.style';
const Main = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.Container}>
        
        <TouchableOpacity style={styles.Button1}>
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

        <TouchableOpacity style={styles.Button3}>
            <Image
            style={styles.Image}
            source={football}
            />
            <Text style={{fontWeight:'500'}}>Футбол</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button4}>
            <Image
            style={styles.Image}
            source={volley}
            />
            <Text style={{fontWeight:'500'}}>Теніс</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.ExitButton}>
            <Text style={{color:'#D21404'}} onPress={() => navigation.navigate('LoginPage')}>Вихід</Text>
        </TouchableOpacity>

      </SafeAreaView>
    )
  }

export default Main