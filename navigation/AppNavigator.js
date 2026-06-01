import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddProblemScreen from '../screens/AddProblemScreen';
import EditProblemScreen from '../screens/EditProblemScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Adicionar Problema"
          component={AddProblemScreen}
        />
        <Stack.Screen
          name="Editar Problema"
          component={EditProblemScreen}
        />
        <Stack.Screen
          name="Detalhes"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
