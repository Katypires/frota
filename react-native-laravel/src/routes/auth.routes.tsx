import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import RegisterUser from '../pages/RegisterUser';
import ProfissionalScreen from '../pages/Profissional';
import Home from '../pages/Home';
import Motorista from '../pages/Motorista';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} options={{ title: "Cadastro de Usuário" }}/>
      <Stack.Screen name="Profissional" component={ProfissionalScreen} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Motorista" component={Motorista} />
    </Stack.Navigator>
  )
}


export default AuthRoutes;