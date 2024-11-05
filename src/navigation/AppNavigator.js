// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeamsScreen from '../app/Teams';
import PlayersScreen from '../app/Players';
import StandingsScreen from '../app/Standings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TeamsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Teams" 
        component={TeamsScreen}
        options={{ title: 'Tim NBA' }}
      />
      <Stack.Screen 
        name="Players" 
        component={PlayersScreen}
        options={{ title: 'Pemain NBA' }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="TeamsTab" 
          component={TeamsStack}
          options={{ tabBarLabel: 'Tim' }}
        />
        <Tab.Screen 
          name="Standings" 
          component={StandingsScreen}
          options={{ tabBarLabel: 'Standings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
