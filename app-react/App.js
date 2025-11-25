import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TelaInicial from './screens/TelaInicial';
import TelaLogin from './screens/TelaLogin';
import TelaFlashcards from './screens/Flashcards'

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="telaLogin" component={TelaLogin} />
        <Stack.Screen name="telaInicial" component={TelaInicial} />
        <Stack.Screen name="Flashcards" component={TelaFlashcards} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
