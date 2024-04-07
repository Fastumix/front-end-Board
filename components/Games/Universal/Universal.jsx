import { Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, { Component } from 'react';
import { useFonts } from 'expo-font';
import styles from './Universal.style';
import { Svg, Path } from 'react-native-svg';

  const Universal = () =>{

    const [fontsLoaded] = useFonts({
      "Mont" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
      "Mont-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
      "Sport" : require("../../../assets/fonts/scoreboard.ttf")
    });
    if(!fontsLoaded){
    return undefined;
    }

    return (      
      <View >
        <StatusBar hidden={true} />
        {/* Timer Menu */}
        <View style={styles.TimerContainer}>
          <View style={[styles.TeamContainer, {backgroundColor:'#0D7AC7', borderBottomRightRadius: 15}]}>
            <Text style={{color:'white', fontFamily:'Mont-Medium'}}>
              Team1
            </Text>
          </View>

          <View style={{justifyContent:'center', alignItems:'center', top:'4%'}}>
            <Text style={{color:'white', fontSize:16, fontFamily:'Mont-Medium'}}>
              Таймер
            </Text>
            <Text style={{color:'white', fontSize:22, fontFamily:'Sport'}}>
              00 : 00
            </Text>
          </View>

          <View style={[styles.TeamContainer, {backgroundColor:'#B20A0A', borderBottomLeftRadius:15}]}>
            <Text style={{color:'white', fontFamily:'Mont-Medium'}}>
              Team2
            </Text>
          </View>

        </View>

          {/* Counter Menu */}
        <View style={styles.CounterContainer}>
          <Text style={{color:'white', fontFamily:'Sport', fontSize:48}}>
            00
          </Text>
          <View style={{top:'5%'}}>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M13.3333 8.33331L5 16.6666L13.3333 25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <Path d="M5 16.6666H18.3333C27.5383 16.6666 35 24.1283 35 33.3333V35" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
          </View>
          <Text style={{color:'white', fontFamily:'Sport', fontSize:48}}>
            00
          </Text>
        </View>

          {/* Timer Counter */}
        <View style={styles.TimerCounterContainer}>
          <View>
            <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M13.6667 7.33331V17.3333L21.5 22.1666L22.8333 20.1666L16.1667 16.1666V7.33331H13.6667Z" fill="#7C7C7C"/>
              <Path d="M26.8667 14C27.1179 15.6566 27.0071 17.3479 26.542 18.9576C26.0768 20.5672 25.2683 22.0569 24.1722 23.3241C23.0761 24.5913 21.7183 25.6059 20.1924 26.2981C18.6666 26.9902 17.0088 27.3434 15.3333 27.3334C8.83333 27.3334 3.66666 22.1667 3.66666 15.6667C3.66666 9.16669 8.83333 4.00002 15.3333 4.00002C16.5 4.00002 17.6167 4.16669 18.6667 4.48335V1.05002C17.6 0.80002 16.4833 0.666687 15.3333 0.666687C7 0.666687 0.333328 7.33335 0.333328 15.6667C0.333328 24 7 30.6667 15.3333 30.6667C17.4461 30.6755 19.5368 30.2359 21.4672 29.3772C23.3976 28.5184 25.1239 27.2599 26.5321 25.6847C27.9402 24.1096 28.9983 22.2537 29.6363 20.2395C30.2743 18.2253 30.4778 16.0987 30.2333 14H26.8667Z" fill="#7C7C7C"/>
            </Svg>
            <View style={{
              padding:'10%',
              width:'75%',
              backgroundColor:"#0D7AC7", 
              borderRadius:100, 
              position:'absolute', 
              right:'-25%', 
              top:'-25%',
              zIndex:10
            }}>
              <Text style={{color:'white', textAlign:'center', fontSize:12}}>
                0
              </Text>
            </View>
          </View>
          <View>
            <Svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Path d="M13.6667 7.33331V17.3333L21.5 22.1666L22.8333 20.1666L16.1667 16.1666V7.33331H13.6667Z" fill="#7C7C7C"/>
              <Path d="M26.8667 14C27.1179 15.6566 27.0071 17.3479 26.542 18.9576C26.0768 20.5672 25.2683 22.0569 24.1722 23.3241C23.0761 24.5913 21.7183 25.6059 20.1924 26.2981C18.6666 26.9902 17.0088 27.3434 15.3333 27.3334C8.83333 27.3334 3.66666 22.1667 3.66666 15.6667C3.66666 9.16669 8.83333 4.00002 15.3333 4.00002C16.5 4.00002 17.6167 4.16669 18.6667 4.48335V1.05002C17.6 0.80002 16.4833 0.666687 15.3333 0.666687C7 0.666687 0.333328 7.33335 0.333328 15.6667C0.333328 24 7 30.6667 15.3333 30.6667C17.4461 30.6755 19.5368 30.2359 21.4672 29.3772C23.3976 28.5184 25.1239 27.2599 26.5321 25.6847C27.9402 24.1096 28.9983 22.2537 29.6363 20.2395C30.2743 18.2253 30.4778 16.0987 30.2333 14H26.8667Z" fill="#7C7C7C"/>
            </Svg>
            <View style={{
              padding:'10%',
              width:'75%',
              backgroundColor:"#B20A0A", 
              borderRadius:100, 
              position:'absolute', 
              right:'-25%', 
              top:'-25%',
              zIndex:10
            }}>
              <Text style={{color:'white', textAlign:'center', fontSize:12}}>
                0
              </Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.ButtonContainerBlue}>
            <TouchableOpacity style={styles.ButtonCounterBlue}>
              <Text style={{color:'white', fontSize:18}}>
                +1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ButtonCounterBlue}>
              <Text style={{color:'white', fontSize:18}}>
                +1
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ButtonContainerRed}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.ButtonCounterBlue}>
                  <Text style={{color:'white', fontSize:18}}>
                    +2
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonCounterBlue}>
                  <Text style={{color:'white', fontSize:18}}>
                    +3
                  </Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.ButtonCounterBlue}>
                  <Text style={{color:'white', fontSize:18}}>
                    +2
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonCounterBlue}>
                  <Text style={{color:'white', fontSize:18}}>
                    +3
                  </Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>
    )
  }


export default Universal