import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getUniversalMatchKey } from '../../../firebase/firebase';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Results = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { team1, team2, type } = route.params;
  const [matchHistory, setMatchHistory] = useState([]);

  const [fontsLoaded] = useFonts({
    "Mont" : require("../../../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-Medium" : require("../../../assets/fonts/Montserrat-Medium.ttf"),
    "Sport" : require("../../../assets/fonts/scoreboard.ttf")
  });

  useEffect(() => {
    const db = getDatabase();
    const matchKey = getUniversalMatchKey(team1, team2, type);
    const matchRef = ref(db, `universal_matches/${matchKey}/gameResults`);

    const unsubscribe = onValue(matchRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const history = Object.values(data).map(set => ({
          team1: set.team1,
          team2: set.team2,
          team1Score: set.results1,
          team2Score: set.results2,
          setNumber: set.set,
          ended: set.ended
        }));
        setMatchHistory(history);
      } else {
        console.log('No data available');
      }
    });

    return () => unsubscribe();
  }, [team1, team2, type]);

  if (matchHistory.length === 0) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Завантаження результатів...</Text>
    </View>;
  }

  if(!fontsLoaded){
    return undefined;
  }

  return (
    <>
      <ScrollView>
        {matchHistory.map((set, index) => (
          <View 
          key={index} 
          style={{ 
            padding: 10, 
            borderBottomWidth: 1, 
            borderColor: '#ccc', 
            justifyContent:'center', 
            alignItems:'center'
            }}>
            <Text style={{
                color:'white', 
                fontFamily:'Montserrat-Medium',
                fontSize: 18
            }}>
                Set {set.setNumber}: {set.team1} {set.team1Score} - {set.team2} {set.team2Score} {set.ended ? '(Закінчено)' : ''}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            style={{
                width:190,
                height: 40,
                borderColor: '#D21404',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}
        >
            <Text style={{ color: '#D21404', fontFamily:'Montserrat-Medium' }}>Назад</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Results;