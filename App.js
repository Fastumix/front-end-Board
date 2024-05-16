// Ваш головний файл (наприклад, index.js)

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';  
import LoginPage from './app/LoginPage';
import RegistrationPage from './app/RegistrationPage'
import UniversalResultPage from './app/UniversalResultPage';
import MainPage from './app/MainPage';
import VolleyBallPage  from './app/VolleyBallPage';
import VolleyBallTeam from './app/VolleyBallTeam';
import UniversalPage from './app/UniversalPage';
import UniversalRegisterPage from './app/UniversalRegisterPage';
import RestorePage from './app/RestorePage';

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
          name="RestorePage"
          component={RestorePage}
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
        <Stack.Screen
          name="UniversalRegisterPage"
          component={UniversalRegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UniversalPage"
          component={UniversalPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UniversalResultPage"
          component={UniversalResultPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
