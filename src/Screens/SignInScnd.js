/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import {AuthContext} from '../Navigation/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {isPasswordLen, isValidEmail} from './validation';

const SignInScnd = ({route}) => {
  const navigator = useNavigation();
  const [number, onChangeNumber] = React.useState('');
  const [psword, onPsword] = React.useState('');
  const {login, loading, SetSelect} = React.useContext(AuthContext);
  const loginUser = () => {
    if (!isValidEmail(number)) {
      return Snackbar.show({
        text: 'Please enter a valid Email!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    }
    if (!isPasswordLen(psword)) {
      return Snackbar.show({
        text: 'Please enter a Password!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    }
    if (isValidEmail(number) && isPasswordLen(psword)) {
      login(number, psword, navigator);
    }
  };
  return (
    <View style={{flex: 1, marginTop: moderateScale(20)}}>
      <Text
        style={{
          fontSize: moderateScale(16),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        E-mail
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={e => onChangeNumber(e)}
        value={number}
        placeholder="Type your E-mail"
        keyboardType="email-address"
      />
      <Text
        style={{
          fontSize: moderateScale(16),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={e => onPsword(e)}
        value={psword}
        placeholder="Type your E-mail"
        keyboardType="default"
        secureTextEntry={true}
      />
      {!loading ? (
        <TouchableOpacity
          onPress={() => loginUser()}
          style={{
            backgroundColor: '#611EBD',
            marginTop: moderateScale(30),
            borderRadius: moderateScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            height: moderateScale(50),
            marginBottom: moderateScale(20),
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#fff',
              fontFamily: 'AvenirMedium',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          // onPress={() => loginUser()}
          style={{
            marginTop: moderateScale(30),
            borderRadius: moderateScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            height: moderateScale(50),
            marginBottom: moderateScale(20),
          }}>
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{
              backgroundColor: '#611EBD',
              padding: moderateScale(10),
              borderRadius: moderateScale(50),
            }}
          />
        </TouchableOpacity>
      )}
      <Text
        onPress={() => {
          navigator.navigate('ForgotPassword');
        }}
        style={{
          fontSize: moderateScale(16),
          color: '#000',
          fontFamily: 'AvenirMedium',
          textAlign: 'right',
          marginBottom: moderateScale(40),
        }}>
        Forgor Password?
      </Text>
      <Text
        style={{
          fontSize: moderateScale(16),
          color: '#656F78',
          fontFamily: 'AvenirMedium',
          textAlign: 'center',
        }}>
        Don’t have a Account?{' '}
        <Text
          onPress={() => SetSelect('2')}
          style={{
            fontSize: moderateScale(16),
            color: '#611EBD',
            fontFamily: 'AvenirMedium',

            textAlign: 'center',
          }}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

export default SignInScnd;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(50),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale(15),
    color: '#262626',
  },
});
