import { Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import styles from './Universal.style';
import { Svg, Path } from 'react-native-svg';
import { _Universal } from '../../../structure/universal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUniversalResults } from '../../../firebase/firebase';

const Universal = () =>{
  
  const [fontsLoaded] = useFonts({
    "Mont" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
    "Sport" : require("../../../assets/fonts/scoreboard.ttf")
  });
  const navigation = useNavigation();
  const game = new _Universal(useRoute().params.team1, useRoute().params.team2, useRoute().params.type);

  const [scoreRed, setScoreRed] = useState(0);
  const [scoreBlue, setScoreBlue] = useState(0);

  const [pauseTimer, setPauseTimer] = useState(null);

  const [Pause1, setPause1] = useState(false);
  const [Pause2, setPause2] = useState(false);

  const [timer, setTimer] = useState(0);
  const [Ended, setEnded] = useState(false);

  const [PauseRedCount, setPauseRedCount] = useState(0);
  const [PauseBlueCount, setPauseBlueCount] = useState(0);

  const [setActive, setSetActive] = useState(true);

  const [countSets, setCountSets] = useState(1)

  const [Actions, setActions] = useState([]);

  const handlePause1 = () => {
    if (Pause1 || Pause2 || !setActive) return;
    setPause1(true);
    setPauseTimer(45); 
    setPauseBlueCount((state) => state + 1);
    const newAction = { type: 'pause', team: 'blue' };
    setActions([...Actions, newAction]);
  
    saveUniversalResults(
      game.team1.name, 
      game.team2.name, 
      scoreBlue, 
      scoreRed, 
      countSets, 
      false, 
      true, 
      Pause2, 
      game.type,
      timer      
      );
  
    const interval = setInterval(() => {
      setPauseTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setPause1(false);
          setPauseTimer(null);
          return null;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  
  const handlePause2 = () => {
    if (Pause1 || Pause2 || !setActive) return;
    setPause2(true);
    setPauseTimer(45); 
    setPauseRedCount((state) => state + 1);
    const newAction = { type: 'pause', team: 'red' };
    setActions([...Actions, newAction]);
  
    saveUniversalResults(
      game.team1.name, 
      game.team2.name, 
      scoreBlue, 
      scoreRed, 
      countSets, 
      false, 
      Pause1, 
      true, 
      game.type,
      timer      
      );
  
    const interval = setInterval(() => {
      setPauseTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setPause2(false);
          setPauseTimer(null);
          return null;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const undoLastAction = () => {
    if (Actions.length === 0 || !setActive) return;

    const lastAction = Actions[Actions.length - 1];
    setActions(Actions.slice(0, -1)); 

    if (lastAction.type === 'score' && lastAction.team === 'red') {
      setScoreRed(scoreRed - lastAction.points);
    } else if (lastAction.type === 'score' && lastAction.team === 'blue') {
      setScoreBlue(scoreBlue - lastAction.points);
    }
  };

  const handleScoreRed = (points) => {
    if(Pause1 || Pause2 || !setActive) return;
    setScoreRed(scoreRed + points);
    const newAction = { type: 'score', team: 'red', points };
    setActions([...Actions, newAction]);
  
    saveUniversalResults(
      game.team1.name, 
      game.team2.name, 
      scoreBlue, 
      scoreRed, 
      countSets, 
      false, 
      Pause1, 
      Pause2, 
      game.type,
      timer      
      );
  };
  
  const handleScoreBlue = (points) => {
    if(Pause1 || Pause2 || !setActive) return;
    setScoreBlue(scoreBlue + points);
    const newAction = { type: 'score', team: 'blue', points };
    setActions([...Actions, newAction]);
  
    saveUniversalResults(
      game.team1.name, 
      game.team2.name, 
      scoreBlue, 
      scoreRed, 
      countSets, 
      false, 
      Pause1, 
      Pause2, 
      game.type,
      timer      
      );
  };

  const formatScore = (score) => {
    return score.toString().padStart(2, '0');
  }

  const formatTime = (time) => {
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
  };

  const handleEndSet = () => {
    if (!setActive || Pause1 || Pause2) return;
    setSetActive(false);
    setCountSets((prevCountSets) => prevCountSets + 1);

    saveUniversalResults(
      game.team1.name, 
      game.team2.name, 
      scoreBlue, 
      scoreRed, 
      countSets, 
      true, 
      Pause1, 
      Pause2, 
      game.type,
      timer
    );
  
    setScoreRed(0);
    setScoreBlue(0);
    setPause1(false);
    setPause2(false);
    setPauseRedCount(0);
    setPauseBlueCount(0);
    setEnded(false);
  };

  const handleStartSet = () => {
    setSetActive(true); 
  };

  const getResultPage = () =>{
    navigation.navigate('UniversalResultPage', {
      team1: game.team1.name,
      team2: game.team2.name,
      type: game.type
    });
  }
  useEffect(() => {
    const saveGameState = async () => {
      const gameState = {
        timer, scoreBlue, scoreRed, countSets, Ended, Pause1, Pause2
      };
      await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
    };
  
    saveGameState();
  }, [timer,scoreBlue, scoreRed, countSets, Ended, Pause1, Pause2]);
  

  useEffect(() => {
    let interval;
    if (setActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
  
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [setActive]);

  useEffect(() => {
    if(!Pause1 && !Pause2 && setActive){
      saveUniversalResults(
        game.team1.name, 
        game.team2.name, 
        scoreBlue, 
        scoreRed, 
        countSets, 
        false, 
        Pause1, 
        Pause2, 
        game.type,
        timer
    );
      }
    else{
      saveUniversalResults(
        game.team1.name, 
        game.team2.name, 
        scoreBlue, 
        scoreRed, 
        countSets, 
        false, 
        Pause1, 
        Pause2, 
        game.type,
        pauseTimer
    );
    }
  }, 
  [
    game.team1.name, 
    game.team2.name, 
    scoreBlue, 
    scoreRed, 
    countSets, 
    Pause2, 
    Pause1,
    game.type,
    timer
  ]);

  if(!fontsLoaded){
    return undefined;
  }

  return (      
    <View style={styles.Container}>
      <StatusBar hidden={true} />
      {/* Timer Menu */}
      <View style={styles.TimerContainer}>
        <TouchableOpacity
        onPress={getResultPage} 
        style={[styles.TeamContainer, {backgroundColor:'#0D7AC7', borderBottomRightRadius: 15}]}>
          <Text style={{color:'white', fontFamily:'Mont-Medium', textAlign: 'center'}}>
            {game.team1.name}
          </Text>
        </TouchableOpacity>

        <View style={{justifyContent:'center', alignItems:'center', top:'4%'}}>
          <Text style={{color:'white', fontSize:16, fontFamily:'Mont-Medium'}}>
            Таймер
          </Text>
          <Text style={{color:'white', fontSize:24, fontFamily:'Sport'}}>
          {pauseTimer !== null ? pauseTimer.toString().padStart(2, '0') : formatTime(timer)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={getResultPage}  
          style={[styles.TeamContainer, {backgroundColor:'#B20A0A', borderBottomLeftRadius:15}]}
        >
          <Text style={{color:'white', fontFamily:'Mont-Medium', textAlign: 'center'}}>
            {game.team2.name}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Counter Menu */}
      <View style={styles.CounterContainer}>
        <Text style={{color:'white', fontFamily:'Sport', fontSize:48}}>
          {formatScore(scoreBlue)}
        </Text>
        <View style={{top:'5%'}}>
          <TouchableOpacity onPress={undoLastAction}>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M13.3333 8.33331L5 16.6666L13.3333 25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <Path d="M5 16.6666H18.3333C27.5383 16.6666 35 24.1283 35 33.3333V35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </TouchableOpacity>
        </View>
        <Text style={{color:'white', fontFamily:'Sport', fontSize:48}}>
          {formatScore(scoreRed)}
        </Text>
      </View>

          {/* Timer Counter */}
        <View style={styles.TimerCounterContainer}>
          <View>
            <TouchableOpacity onPress={handlePause2}>
              <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M13.6667 7.33331V17.3333L21.5 22.1666L22.8333 20.1666L16.1667 16.1666V7.33331H13.6667Z" fill="#7C7C7C"/>
                <Path d="M26.8667 14C27.1179 15.6566 27.0071 17.3479 26.542 18.9576C26.0768 20.5672 25.2683 22.0569 24.1722 23.3241C23.0761 24.5913 21.7183 25.6059 20.1924 26.2981C18.6666 26.9902 17.0088 27.3434 15.3333 27.3334C8.83333 27.3334 3.66666 22.1667 3.66666 15.6667C3.66666 9.16669 8.83333 4.00002 15.3333 4.00002C16.5 4.00002 17.6167 4.16669 18.6667 4.48335V1.05002C17.6 0.80002 16.4833 0.666687 15.3333 0.666687C7 0.666687 0.333328 7.33335 0.333328 15.6667C0.333328 24 7 30.6667 15.3333 30.6667C17.4461 30.6755 19.5368 30.2359 21.4672 29.3772C23.3976 28.5184 25.1239 27.2599 26.5321 25.6847C27.9402 24.1096 28.9983 22.2537 29.6363 20.2395C30.2743 18.2253 30.4778 16.0987 30.2333 14H26.8667Z" fill="#7C7C7C"/>
              </Svg>
            </TouchableOpacity>
            <View 
            style={{
              height:'75%',
              width:'75%',
              backgroundColor:"#0D7AC7", 
              borderRadius:100, 
              position:'absolute', 
              right:'-25%', 
              top:'-25%',
              zIndex:10,
              alignItems:'center',
              justifyContent:'center'
            }}>
              
                <Text style={{color:'white', textAlign:'center', fontSize:12}}>
                  {PauseRedCount}
                </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={handlePause1}>
              <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M13.6667 7.33331V17.3333L21.5 22.1666L22.8333 20.1666L16.1667 16.1666V7.33331H13.6667Z" fill="#7C7C7C"/>
                <Path d="M26.8667 14C27.1179 15.6566 27.0071 17.3479 26.542 18.9576C26.0768 20.5672 25.2683 22.0569 24.1722 23.3241C23.0761 24.5913 21.7183 25.6059 20.1924 26.2981C18.6666 26.9902 17.0088 27.3434 15.3333 27.3334C8.83333 27.3334 3.66666 22.1667 3.66666 15.6667C3.66666 9.16669 8.83333 4.00002 15.3333 4.00002C16.5 4.00002 17.6167 4.16669 18.6667 4.48335V1.05002C17.6 0.80002 16.4833 0.666687 15.3333 0.666687C7 0.666687 0.333328 7.33335 0.333328 15.6667C0.333328 24 7 30.6667 15.3333 30.6667C17.4461 30.6755 19.5368 30.2359 21.4672 29.3772C23.3976 28.5184 25.1239 27.2599 26.5321 25.6847C27.9402 24.1096 28.9983 22.2537 29.6363 20.2395C30.2743 18.2253 30.4778 16.0987 30.2333 14H26.8667Z" fill="#7C7C7C"/>
              </Svg>
            </TouchableOpacity>
            <View 
            style={{
              height:'75%',
              width:'75%',
              backgroundColor:"#B20A0A", 
              borderRadius:100, 
              position:'absolute', 
              right:'-25%', 
              top:'-25%',
              zIndex:10,
              justifyContent:'center'
            }}>
              
                <Text style={{color:'white', textAlign:'center', fontSize:12}}>
                  {PauseBlueCount}
                </Text>

            </View>
          </View>
        </View>

        <View style={{flexDirection:'column', height:'100%', marginTop:'10%'}}>

        <View style={[styles.ButtonContainerBlue]}>
          <TouchableOpacity style={[styles.ButtonCounterBlue,{height:'45%'}]} onPress={() => handleScoreBlue(1)}>
            <Text style={{color:'white', fontSize:18}}>
              +1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ButtonCounterRed, {height:'45%'}]} onPress={() => handleScoreRed(1)}>
            <Text style={{color:'white', fontSize:18}}>
              +1
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:'-30%'}}>
          <TouchableOpacity style={[styles.ButtonCounterBlue, {height:'45%'}]} onPress={() => handleScoreBlue(2)}>
            <Text style={{color:'white', fontSize:18, textAlign:'center'}}>
              +2
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.ButtonCounterRed,{height:'45%'}]} onPress={() => handleScoreRed(2)}>
            <Text style={{color:'white', fontSize:18, textAlign:'center'}}>
              +2
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <TouchableOpacity style={[styles.ButtonCounterBlue]} onPress={() => handleScoreBlue(3)}>
            <Text style={{color:'white', fontSize:18, textAlign:'center'}}>
              +3
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.ButtonCounterRed]} onPress={() => handleScoreRed(3)}>
            <Text style={{color:'white', fontSize:18, textAlign:'center'}}>
              +3
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{position:'absolute', width: '50%', left:"25%", top: '-28%'}}>
          {setActive ? (
            <TouchableOpacity style={{
              width:'100%',
              height: 40,
              borderColor: '#D21404',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} onPress={handleEndSet}>
              <Text style={{color:"#D21404", fontFamily: 'Montserrat-Medium'}}>Закінчити сет</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{
              width:'100%',
              height: 40,
              borderColor: 'green',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} onPress={handleStartSet}>
              <Text style={{color:"green", fontFamily: 'Montserrat-Medium'}}>Розпочати сет</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
      </View>
    </View>
  )
}

export default Universal
