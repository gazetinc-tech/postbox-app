/* eslint-disable prettier/prettier */
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthStack from './AuthStack';
import {NativeBaseProvider, Box} from 'native-base';

const NavigationMain = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default NavigationMain;
