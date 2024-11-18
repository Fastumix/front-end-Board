import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import styles from '../VolleyBall/VolleyBall.style';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';

const UniversalRegister = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-Bold" : require("../../../assets/fonts/Montserrat-Bold.ttf"),
    });

    const [Team1, setTeam1 ] = useState("");
    const [Team2, setTeam2 ] = useState("");
    const [GameType, setGameType] = useState("");

    const handleTeamRegistration = () => {
        if(Team1 =='' || Team2 =='' || GameType ==''){
          Alert.alert('Заповніть всі поля');
        }
        if(Team1 == Team2 || Team1.length > 8 || Team2.length > 8){
          Alert.alert('Помилка', 'Назва команд не може бути однаковою або довшою за 8 символів');
        }
            navigation.navigate('UniversalPage', {
                team1: Team1,
                team2: Team2,
                type: GameType
            });
        
        
    };

    if(!fontsLoaded){
        return undefined;
        }
    return (
      <KeyboardAwareScrollView>
      <View style={{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 0,
        display: 'flex',
        justifyContent: 'center',
        height:'100%'
        }}>

        <View style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <Text style={{opacity: 0.6, color:'white', fontSize:20, fontFamily: 'Montserrat-Medium'}}>Реєстрація команд</Text>
        </View>
        <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(label) => setGameType(label)}
            items={[
                { label: 'Волейбол', value: 'Волейбол' },
                { label: 'Баскетбол', value: 'Баскетбол' },
            ]}
            placeholder={{
                label: 'Виберіть вид гри...',
                value: null,
                color: '#9EA0A4',
            }}
            style={{
                
                inputIOS: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    opacity: 0.6,
                    borderColor: 'white',
                    borderRadius: 8,
                    color: '#FFFFFF',
                    paddingRight: 30,
                    backgroundColor: '#000000',
                    marginTop: '15%',
                },
                inputAndroid: {
                    fontSize: 16,
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    opacity: 0.6,
                    borderColor: 'white',
                    borderRadius: 8,
                    color: '#FFFFFF',
                    paddingRight: 30,
                    backgroundColor: '#000000',
                    marginTop: '15%',
                },
                placeholder: {
                    color: '#FFFFFF',
                    opacity: 0.6
                },
            }}
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
            marginTop: '15%',
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
            marginTop: '15%'
          }}
          onPress={handleTeamRegistration}
          >
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 14}}>
                Зареєструвати команду
            </Text>
          </TouchableOpacity>
        <View style={{display: 'flex', justifyContent:'center', alignItems: 'center', marginTop: '15%'}}>
          <TouchableOpacity style={[styles.Button]} onPress={ () => navigation.navigate('MainPage')}>
            <Text style={{color: '#D21404', fontFamily: 'Montserrat-Medium'}}>
                Назад
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAwareScrollView>
    )
  }


export default UniversalRegister
