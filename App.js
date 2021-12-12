import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Spalash from './components/Spalash';
import Pdflist from './components/Pdflist';
import Main from './components/Main';
const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="main">
        <Stack.Screen
          name="Spalash"
          component={Spalash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="list"
          component={Pdflist}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="main"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
