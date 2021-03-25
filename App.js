import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StyleSheet } from 'react-native';
import ListePromo from './src/components/Listepromos';
import Scan from './src/components/Scan';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scan" component = { Scan } />
        <Tab.Screen name="Liste promos" component = { ListePromo } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
