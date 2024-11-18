import { Text, TouchableOpacity, View, Modal, StatusBar } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useFonts } from 'expo-font';
import Svg, {Path} from "react-native-svg"
import styles from './VolleyBall.style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveGameResults, deletePreviousGameResults } from '../../../firebase/firebase';
import { Game } from '../../../structure/game';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VolleyBall = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const game = new Game(route.params?.team1, route.params?.team2);

    const [timer, setTimer] = useState(0);
    const [timer2, setTimer2] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [setsResults, setSetsResults] = useState([]);
    const [CountSets, setCountSets] = useState(1);
    const [isPause, setIsPaused] = useState(true);
    const [isPause2, setIsPaused2] = useState(true);
    const [Counter, setCounter] = useState(0);
    const [Counter2, setCounter2] = useState(0);
    const [Win, setWin] = useState(0);
    const [Win2, setWin2] = useState(0);
    const [CountPause, setCountPause] = useState(0);
    const [CountPause2, setCountPause2] = useState(0);

    const [fontsLoaded] = useFonts({
        "Montserrat" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
    });
    if(!fontsLoaded){
    return undefined;
    }

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };


    useEffect(() => {
    const saveGameState = async () => {
        const gameState = {
        timer, timer2, setsResults, CountSets, isPause, isPause2, Counter, Counter2, Win, Win2, CountPause, CountPause2
        };
        await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
    };

    saveGameState();
    }, [timer, timer2, setsResults, CountSets, isPause, isPause2, Counter, Counter2, Win, Win2, CountPause, CountPause2]);

    // useEffect(() => {
    //     const checkForSavedGame = async () => {
    //       const gameState = await AsyncStorage.getItem('gameState');
    //       if (gameState !== null) {
    //         // Існує збережений стан гри
    //         // Показати модальне вікно з опціями продовжити або почати нову гру
    //         setIsModalVisible(true); // Припустимо, що у вас є стан isModalVisible для керування видимістю модального вікна
    //       }
    //     };
      
    //     checkForSavedGame();
    //   }, []);

    useEffect(() => {
        let interval;
        if (isPause && isPause2) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPause, isPause2]);

    useEffect(() => {
        if (Win === 2 || Win2 === 2) {
            setIsModalVisible(true);
        }
    }, [Win, Win2]);

    useEffect(() => {
        let interval;
        if (isPause2 && isPause) {
            interval = setInterval(() => {
                setTimer2((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPause, isPause2]);

    useEffect(() => {
        if (CountSets === 4) {
            setIsModalVisible(true);
        }
        else {
            if(CountSets === 6){
                
            }
        }
    }, [CountSets]);
    
    useEffect(() => {
        saveGameResults(
            game.team1.name, 
            game.team2.name, 
            Counter, 
            Counter2, 
            CountSets, 
            false, 
            Win, 
            Win2, 
            isPause, 
            isPause2, 
            0, 
            0,
            timer
        );

      }, 
      [
        game.team1.name, 
        game.team2.name, 
        Counter, 
        Counter2, 
        CountSets, 
        Win, 
        Win2, 
        isPause, 
        isPause2,
        timer
      ]);

    const resetGame = () => {
        setTimer(0);
        setTimer2(0);
        setIsModalVisible(false);
        setSetsResults([]);
        setCountSets(1);
        setIsPaused(true);
        setIsPaused2(true);
        setCounter(0);
        setCounter2(0);
        setWin(0);
        setWin2(0);
        setCountPause(0);
        setCountPause2(0);
        navigation.navigate('MainPage');
    };

    const handleEndGame = () => {

        if (Win === 3 || Win2 === 3) {
            alert(`Гра завершена. Переможець: ${Win === 3 ? game.team1.name : game.team2.name}`);
            resetGame();
            return;
        }
    
        if (CountSets > 1) {
            deletePreviousGameResults(game.team1.name, game.team2.name, CountSets - 1);
        }

        resetGame();
    };

    const handleContinue = () => {
        setCounter(0);
        setCounter2(0);
        setCountPause(0);
        setCountPause2(0);
        setIsModalVisible(false);
    };

    const handleCounterPress = () => {
        if (isPause && isPause2) {
            setCounter((prevCount) => prevCount + 1);
            if (Counter >= 24 && Counter2 >= 24) {
                if (Counter - Counter2 >= 2) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
                    setWin((prevWin) => prevWin + 1);
                    setSetsResults((prevResults) => [
                        ...prevResults,
                        { team1: Counter, team2: Counter2 },
                    ]);
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name,
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        CountPause, 
                        CountPause2,
                        timer
                    );

                } else if (Counter2 - Counter >= 2) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
                    setWin2((prevWin) => prevWin + 1);
                    setSetsResults((prevResults) => [
                        ...prevResults,
                        { team1: Counter, team2: Counter2 },
                    ]);
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        CountPause, 
                        CountPause2,
                        timer
                    );

                }
            } else if (Counter === 25) {
                setCounter(0);
                setCounter2(0);
                setCountSets((prevSets) => prevSets + 1);
                setIsPaused(true);
                setIsPaused2(true);
                setWin((prevWin) => prevWin + 1);
                setSetsResults((prevResults) => [
                    ...prevResults,
                    { team1: Counter, team2: Counter2 },
                ]);
                saveGameResults(
                    game.team1.name, 
                    game.team2.name, 
                    Counter, 
                    Counter2, 
                    CountSets, 
                    false, 
                    Win, 
                    Win2, 
                    isPause, 
                    isPause2, 
                    CountPause, 
                    CountPause2,
                    timer
                    );

            }
            saveGameResults(
                game.team1.name, 
                game.team2.name, 
                Counter, 
                Counter2, 
                CountSets, 
                false, 
                Win, 
                Win2, 
                isPause, 
                isPause2, 
                CountPause, 
                CountPause2,
                timer);

        }
    };

    const handleCounterPress2 = () => {
        if (isPause && isPause2) {
            setCounter2((prevCount) => prevCount + 1);
            if (Counter >= 24 && Counter2 >= 24) {
                if (Counter2 - Counter >= 2) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
                    setWin2((prevWin) => prevWin + 1);
                    setSetsResults((prevResults) => [
                        ...prevResults,
                        { team1: Counter, team2: Counter2 },
                    ]);
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        CountPause, 
                        CountPause2,
                        timer
                        );

                } else if (Counter - Counter2 >= 2) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
                    setWin((prevWin) => prevWin + 1);
                    setSetsResults((prevResults) => [
                        ...prevResults,
                        { team1: Counter, team2: Counter2 },
                    ]);
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        CountPause, 
                        CountPause2,
                        timer
                    );
                      
                }
            } else if (Counter2 === 25) {
                setCounter(0);
                setCounter2(0);
                setCountSets((prevSets) => prevSets + 1);
                setIsPaused(true);
                setIsPaused2(true);
                setWin2((prevWin) => prevWin + 1);
                setSetsResults((prevResults) => [
                    ...prevResults,
                    { team1: Counter, team2: Counter2 },
                ]);
                saveGameResults(
                    game.team1.name, 
                    game.team2.name, 
                    Counter, 
                    Counter2, 
                    CountSets, 
                    false, 
                    Win, 
                    Win2, 
                    isPause, 
                    isPause2, 
                    CountPause, 
                    CountPause2,
                    timer
                    );
            }
            saveGameResults(
                game.team1.name, 
                game.team2.name, 
                Counter, 
                Counter2, 
                CountSets, 
                false, 
                Win, 
                Win2, 
                isPause, 
                isPause2, 
                CountPause, 
                CountPause2,
                timer
                );
        }
    };    

    const handleMinusCounterPress = () => {
        if (Counter > 0) {
            setCounter((prevCount) => prevCount - 1);
            if (Counter === 25 && Counter2 === 25) {
                if (Counter - Counter2 >= 2 && Counter > 0) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
    
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        0, 
                        0,
                        timer
                        );
                }
            } else if (Counter === 25 && Counter2 !== 25) {
                if (Counter - Counter2 >= 2 && Counter > 0) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
    
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, Counter2, 
                        CountSets, 
                        false,
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        0, 
                        0, 
                        timer);
                }
            } else if (Counter < 25) {
                saveGameResults(
                    game.team1.name, 
                    game.team2.name, 
                    Counter, 
                    Counter2, 
                    CountSets, 
                    false, 
                    Win, 
                    Win2, 
                    isPause, 
                    isPause2, 
                    0, 
                    0, 
                    timer
                    );
            }
        }
    };
    
    const handleMinusCounterPress2 = () => {
        if (Counter2 !== 0) {
            setCounter2((prevCount) => prevCount - 1);
            if (Counter === 25 && Counter2 === 25) {
                if (Counter2 - Counter >= 2 && Counter2 > 0) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
    
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        0, 0,
                        timer);
                }
            } else if (Counter2 === 25 && Counter !== 25) {
                if (Counter2 - Counter >= 2 && Counter2 > 0) {
                    setCounter(0);
                    setCounter2(0);
                    setCountSets((prevSets) => prevSets + 1);
                    setIsPaused(true);
                    setIsPaused2(true);
    
                    saveGameResults(
                        game.team1.name, 
                        game.team2.name, 
                        Counter, 
                        Counter2, 
                        CountSets, 
                        false, 
                        Win, 
                        Win2, 
                        isPause, 
                        isPause2, 
                        0, 0,
                        timer);
                }
            } else if (Counter2 < 25) {
                saveGameResults(
                    game.team1.name, 
                    game.team2.name, 
                    Counter, 
                    Counter2, 
                    CountSets, 
                    false, 
                    Win, 
                    Win2, 
                    isPause, 
                    isPause2, 
                    0, 0,
                    timer);
            }
        }
    };

    const handlePauseButtonPress = () => {
        
        if (isPause2) {
            setIsPaused((prevState) => !prevState);
            setCountPause((prevPause)=> prevPause+1);
            if(CountPause == 4){
                alert('Використано всі таймаути')
            }
        }
        
    };

    const handlePauseButtonPress2 = () => {
        if (isPause) {
            setIsPaused2((prevState) => !prevState);
            setCountPause2((prevPause) => prevPause+1);
            if(CountPause2 == 4){
                alert('Використано всі таймаути')
            }
        }
        
    };

    return (
      <View>
        <StatusBar hidden={true} />
        <View style={{backgroundColor:'#EE6730', height: 370, borderRadius:15 }}>


            <View style={{display:'flex', flexDirection:'row', justifyContent:"space-between"}}>
                <View style={{ backgroundColor:'black', width:130, height:75, borderBottomRightRadius: 30}}>
                    <Text style={{color:"white", textAlign:'center', marginTop:35, fontFamily:'Montserrat-Medium'}}>{game.team1.name}</Text>
                </View>

                <View style={{display:'flex', alignItems:'center'}}>
                    <Text style={{color:'white',  marginTop: 25, fontSize: 17, fontFamily:'Montserrat-Medium'}}>
                        Таймер
                    </Text>
                    <Text style={{fontWeight: '500', fontSize:24, fontFamily:'Montserrat'}}>
                        {formatTime(timer)}
                    </Text>
                </View>

                <View style={{backgroundColor:'white', width:130, height: 75, borderBottomLeftRadius: 30}}>
                  <Text style={{textAlign:'center', marginTop:35, fontFamily:'Montserrat-Medium'}}>{game.team2.name}</Text>
                </View>
            </View>

            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop: 25}}>
                <View style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontSize:32, fontFamily:'Montserrat-Medium'}}>
                        {Counter.toString().padStart(2, '0')}
                    </Text>
                    <TouchableOpacity 
                    style={{
                        backgroundColor:'black', width: 75, height: 75, borderRadius: 100, color: 'white', display:'flex', alignItems:'center', justifyContent:'center'
                    }}
                    onPress={handleCounterPress}
                    >
                        <Text style={{color:'white', fontFamily:'Montserrat-Medium', fontSize:20}}>
                            +1
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{color:'white', fontFamily:'Montserrat-Medium', fontSize: 17}}>
                        Сет
                    </Text>
                    <Text style={{fontSize: 24, fontFamily: 'Montserrat-Medium'}}>
                        {CountSets}
                    </Text>
                </View>

                <View style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 32, fontFamily:'Montserrat-Medium'}}>
                        {Counter2.toString().padStart(2, '0')}
                    </Text>
                    <TouchableOpacity 
                    style={{
                        backgroundColor:'white', width: 75, height: 75, borderRadius: 100, color: 'white', display:'flex', alignItems:'center', justifyContent:'center'
                    }}
                    onPress={handleCounterPress2}
                    >
                        <Text style={{color:'black', fontFamily:'Montserrat-Medium', fontSize: 20}}>
                            +1
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{display:'flex', flexDirection: 'row', justifyContent:'space-around', alignItems:'center', gap: 100, marginTop: 10}}>
                <TouchableOpacity style={styles.Minus_Button} onPress={handleMinusCounterPress}>
                <Text style={{fontFamily:'Montserrat-Medium', color: 'white', fontSize: 20}}>-1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Minus_Button} onPress={handleMinusCounterPress2}>
                    <Text style={{fontFamily:'Montserrat-Medium', color: 'white', fontSize: 20}}>-1</Text>
                </TouchableOpacity>
            </View>

            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around', marginTop: 25}}>
                <TouchableOpacity style={{
                    backgroundColor:'black', width:165, height:50, borderRadius: 100, display:'flex', alignItems: 'center', justifyContent:"space-around", flexDirection:'row',
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.4,
                    shadowRadius: 3, 
                }}
                onPress={handlePauseButtonPress}
                >
                    <Text style={{color:'white', fontFamily:'Montserrat-Medium'}}>
                        {isPause ? 'Перерва' : 'Продовжити'}
                    </Text>
                    {
                        isPause ? (
                            <Svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.66667 14C2.58333 14 3.33333 13.1 3.33333 12V2C3.33333 0.9 2.58333 0 1.66667 0C0.75 0 0 0.9 0 2V12C0 13.1 0.75 14 1.66667 14ZM6.66667 2V12C6.66667 13.1 7.41667 14 8.33333 14C9.25 14 10 13.1 10 12V2C10 0.9 9.25 0 8.33333 0C7.41667 0 6.66667 0.9 6.66667 2Z" fill="white"/>
                            </Svg>
                        )
                        :
                        (
                        <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                            <Path fill="#fff" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/>
                        </Svg>
                        )
                        
                    }
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor:'white', width:165, height:50, borderRadius: 100, display:'flex', alignItems: 'center', justifyContent:"space-around", flexDirection:'row',
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.4,
                    shadowRadius: 3, 
                }}
                onPress={handlePauseButtonPress2}
                >
                    {
                        isPause2 ?(
                            <Svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M1.66667 14C2.58333 14 3.33333 13.1 3.33333 12V2C3.33333 0.9 2.58333 0 1.66667 0C0.75 0 0 0.9 0 2V12C0 13.1 0.75 14 1.66667 14ZM6.66667 2V12C6.66667 13.1 7.41667 14 8.33333 14C9.25 14 10 13.1 10 12V2C10 0.9 9.25 0 8.33333 0C7.41667 0 6.66667 0.9 6.66667 2Z" fill="black"/>
                            </Svg>
                        )
                        :
                        (
                            <Svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                <Path fill="#000" d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128"/>
                            </Svg>
                        )

                    }
                    <Text style={{color:'black', fontFamily:'Montserrat-Medium', fontWeight:'500'}}>
                        {isPause2 ? 'Перерва' : 'Продовжити'}
                    </Text>
                        
                    
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.SetContainer}>
                <Text style={{ fontFamily: 'Montserrat-Medium', marginTop: 5, color: 'white' }}>
                    Рахунок сету
                </Text>

                <View>
                    {setsResults.map((setResult, index) => (
                        <View key={index} style={{ display: 'flex', gap: 15, flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium' }}>{game.team1.name}</Text>
                            <Text style={{ fontFamily: 'Montserrat-Medium' }}>
                                {setResult.team1} : {setResult.team2}
                            </Text>
                            <Text style={{ color: 'white', fontFamily: 'Montserrat-Medium' }}>{game.team2.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
    
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('MainPage')}>
                <Text style={{color:"#D21404", fontFamily: 'Montserrat-Medium'}}>Назад</Text>
            </TouchableOpacity>
        </View>

        <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'white'}}>Гра завершена, бажаєте продовжити?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity onPress={handleContinue} style={styles.modalButton}>
                                <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'white'}}>Так</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleEndGame} style={styles.modalButton}>
                                <Text style={{fontSize:20, fontFamily:"Montserrat-Medium", color:'white'}}>Ні</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>

      </View>
    )
}

export default VolleyBall