import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from './VolleyBall.style';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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

    const [Team1, setTeam1 ] = useState("");
    const [Team2, setTeam2 ] = useState("");

    const handleTeamRegistration = () => {
      if (Team1.length > 8 || Team2.length > 8) {
          Alert.alert("Помилка", "Назва команди не може бути довшою за 8 символів");
          return;
      }

      if (Team1.length == 0 || Team2.length == 0) {
        Alert.alert("Помилка", "Назва команд не може бути порожньою");
        return;
      }

      if (Team1 == Team2) {
        Alert.alert("Помилка", "Назва команд не може бути однаковою");
        return;
      }

      

      navigation.navigate('VolleyBallPage', {
          team1: Team1,
          team2: Team2,
      });
  };
    return (
      <KeyboardAwareScrollView>
      <View style={{
        width: '90%',
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
            marginTop: '25%',
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
            marginTop: '20%',
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
            marginTop: '20%'
          }}
          onPress={handleTeamRegistration}
          >
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14}}>
                Зареєструвати команду
            </Text>
          </TouchableOpacity>
        <View style={{display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: '40%'}}>
          <TouchableOpacity style={[styles.Button, {bottom: '25%'}]} onPress={() => navigation.navigate('MainPage')}>
            <Text style={{color: '#D21404', fontFamily: 'Montserrat-Medium'}}>
                Назад
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    )
  }


export default TeamRegistration