/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthStack from './LoggedIn';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Onboarding from '../Screens/Onboarding';
import Authentication from './Authentication';
import LoggedIn from './LoggedIn';

const Stack = createNativeStackNavigator();

const NavigationMain = () => {

  const {boarding} = useSelector(state => state?.userReducer);

  return (
    <NavigationContainer>
      {boarding === false && (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}

      <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoggedIn"
          component={LoggedIn}
          options={{headerShown: false}}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};
export default NavigationMain;
