/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import SignUpSec from './SignUpSec';
import SignInScnd from './SignInScnd';
import {AuthContext} from '../Navigation/AuthProvider';

const SignIn = ({route}) => {
  const authContext = useContext(AuthContext);

  const handleSignUp = () => {
    authContext.SetSelect('2');
  };
  const handleSignIn = () => {
    authContext.SetSelect('1');
  };
  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>
      <FastImage
        source={require('../image/PostboxLogo.png')}
        style={{
          height: moderateScale(300),
          width: moderateScale(300),
          alignSelf: 'center',
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '75%',
          position: 'absolute',
          zIndex: 1000,
          bottom: moderateScale(0),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: moderateScale(20),
        }}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => handleSignIn()}
              style={{
                width: moderateScale(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth:
                  authContext?.select === '1' ? moderateScale(1) : 0,
                borderBottomColor:
                  authContext?.select === '1' ? '#000' : '#c4c4c4',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: authContext?.select === '1' ? '#611EBD' : '#c4c4c4',
                  fontFamily: 'AvenirMedium',
                  paddingBottom: moderateScale(5),
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSignUp()}
              style={{
                width: moderateScale(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth:
                  authContext?.select === '2' ? moderateScale(1) : 0,
                borderBottomColor:
                  authContext?.select === '2' ? '#000' : '#c4c4c4',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: authContext?.select === '2' ? '#611EBD' : '#c4c4c4',
                  fontFamily: 'AvenirMedium',
                  paddingBottom: moderateScale(5),
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {authContext?.select === '1' ? <SignInScnd /> : <SignUpSec />}
        </ScrollView>
      </View>
    </View>
  );
};

export default SignIn;
const styles = StyleSheet.create({});
