// Ваш файл з навігацією (наприклад, AppNavigator.js)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/Log/Log_in/Login'; // Оновіть імпорт

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }} // Приховати заголовок, якщо потрібно
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
