import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from './VolleyBall.style';
import { useNavigation } from '@react-navigation/native';

const TeamRegistration = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-Bold" : require("../../../assets/fonts/Montserrat-Bold.ttf"),
    });
    if(!fontsLoaded){
    return undefined;
    }
    const [MatchSet, setMatchSet] = useState(1);
    const [Team1, setTeam1 ] = useState("");
    const [Team2, setTeam2 ] = useState("");

    const handleTeamRegistration = () => {

        navigation.navigate('VolleyBallPage', {
            team1: Team1,
            team2: Team2,
        });
    };
    return (
      <View style={{
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 0,
        display: 'flex',
        justifyContent: 'center'
        }}>

        <View style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <Text style={{opacity: 0.6, color:'white', fontSize:20, fontFamily: 'Montserrat-Medium'}}>Реєстрація команд</Text>
        </View>
        <TextInput
        style={{
            fontFamily: 'Montserrat',
            color: '#fff',
            borderStyle: 'solid',
            borderColor: '#D9D9D9',
            borderBottomWidth: 1,
            justifyContent: 'center',
            opacity: 0.6,
            marginTop: 80,
            paddingBottom:8,
          }}
        placeholder='  Назва команди 1'
        placeholderTextColor='#fff'
        onChangeText={(text) => setTeam1(text)}
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
            marginTop: 60,
            paddingBottom:8,
          }}
        placeholder='  Назва команди 2'
        placeholderTextColor='#fff'
        onChangeText={(text) => setTeam2(text)}
        />

          <TouchableOpacity 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: '#EE6730',
            height: 45,
            borderRadius: 50,
            marginTop: 65
          }}
          onPress={handleTeamRegistration}
          >
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14}}>
                Зареєструвати команду
            </Text>
          </TouchableOpacity>
        <View style={{display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: 140}}>
          <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('MainPage')}>
            <Text style={{color: '#D21404', fontFamily: 'Montserrat-Medium'}}>
                Назад
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


export default TeamRegistration