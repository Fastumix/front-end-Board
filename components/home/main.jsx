import React, {useState, useEffect} from 'react';
import { Image, TouchableOpacity, View, Text, SafeAreaView, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import volley from '../../assets/images/Volleyball.png';
import football from '../../assets/images/FootBall.png';
import basketball from '../../assets/images/Basketball.png';
import tennis from '../../assets/images/Tennis.png'
import { useNavigation } from '@react-navigation/native';
import styles from './main.style';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Main = () => {
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
      "Montserrat" : require("../../assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Medium" : require("../../assets/fonts/Montserrat-Medium.ttf"),
    });

    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
      const checkForSavedGame = async () => {
        const gameState = await AsyncStorage.getItem('gameState');
        if (gameState !== null) {

          setIsModalVisible(true); 
        }
      };
    
      checkForSavedGame();
    }, []);
    
    const handleContinueGame = async () => {
      const gameState = await AsyncStorage.getItem('gameState');
      if (gameState !== null) {
          const parsedState = JSON.parse(gameState);
          // Встановити стан компонента відповідно до збереженого стану
      setTimer(parsedState.timer);
      setTimer2(parsedState.timer2);
      setSetsResults(parsedState.setsResults);
      setCountSets(parsedState.CountSets);
      setIsPaused(parsedState.isPause);
      setIsPaused2(parsedState.isPause2);
      setCounter(parsedState.Counter);
      setCounter2(parsedState.Counter2);
      setWin(parsedState.Win);
      setWin2(parsedState.Win2);
      setCountPause(parsedState.CountPause);
      setCountPause2(parsedState.CountPause2);
      // Встановити будь-які інші збережені значення стану
    }
    setIsModalVisible(false); // Закрити модальне вікно
  };

  const handleStartNewGame = async () => {

    navigation.navigate('VolleyBallTeam')
  };
  if(!fontsLoaded){
    return undefined;
    }
    return (
      <SafeAreaView style={styles.Container}>
        <StatusBar hidden={true} />
        <TouchableOpacity style={[styles.Button3, {justifyContent:'center'}]} onPress={() => navigation.navigate('UniversalRegisterPage')}>
            <Text style={{ fontFamily:'Montserrat-Medium'}}>Universal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button1} onPress={/**() =>setIsModalVisible(true)**/handleStartNewGame}>
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
        {/* <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
          onSwipeComplete={() => setIsModalVisible(false)}
          swipeDirection={['down']} // Дозволяє закрити модальне вікно слайдом вниз
          style={styles.modal}
        >
          
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.iconContainer}>
              <FontAwesomeIcon name="minus" size={25} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.modalContent}> */}
              {/* Іконка для індикації закриття слайдом вниз */}
              
              {/* <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'white'}}>Чи бажаєте продовжити гру</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('VolleyBallTeam')}>
                  <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'#D21404'}}>Ні</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStartNewGame}>
                  <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'#5DAD41'}}>Так</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}
      </SafeAreaView>
    )
  }

export default Main