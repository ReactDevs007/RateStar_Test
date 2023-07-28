import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail';
import {StackParamList} from './src/utils/interfaces';
import {MainProvider} from './src/contexts/MainContext';

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <MainProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MainProvider>
  );
}

export default App;
