// Ваш головний файл (наприклад, index.js)

import React from 'react';
import { View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';  
import LoginPage from './app/LoginPage';
import RegistrationPage from './app/RegistrationPage'
import styles from './styles/search';
import MainPage from './app/MainPage';
import VolleyBallPage  from './app/VolleyBallPage';
import VolleyBallTeam from './app/VolleyBallTeam';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegistrationPage" component={RegistrationPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainPage" component={MainPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VolleyBallPage" component={VolleyBallPage}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VolleyBallTeam" component={VolleyBallTeam}
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
