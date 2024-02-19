import { View } from 'react-native';
import styles from './styles/search'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationPage from './app/RegistrationPage';
import LoginPage from './app/LoginPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage/>
    </View>
  );
}


