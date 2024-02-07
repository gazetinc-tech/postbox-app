/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import {isValidEmail} from './validation';
import Snackbar from 'react-native-snackbar';
import {AuthContext} from '../Navigation/AuthProvider';

export default function ForgotPassword() {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const {forgotPassword, loading} = React.useContext(AuthContext);
  const loginUser = () => {
    if (!isValidEmail(value)) {
      return Snackbar.show({
        text: 'Please enter a valid Email!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    }
    if (isValidEmail(value)) {
      forgotPassword(value, nav);
    }
  };
  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '90%',
          position: 'absolute',
          zIndex: 1000,
          bottom: moderateScale(0),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: moderateScale(20),
        }}>
        <>
          <ScrollView
            contentContainerStyle={{marginHorizontal: moderateScale(20)}}>
            <FastImage
              source={require('../image/AddPhoneNumber.png')}
              style={{
                height: moderateScale(180),
                width: '90%',
                alignSelf: 'center',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text
              style={{
                color: '#000',
                fontSize: moderateScale(16),
                fontFamily: 'AvenirHeavy',
                textAlign: 'center',
              }}>
              Forgot Password
            </Text>

            <Text
              style={{
                color: '#000',
                fontSize: moderateScale(12),
                fontFamily: 'AvenirLight',
                textAlign: 'center',
              }}>
              This process ensures security by requiring access to the user's
              email to reset the password. Always use secure practices, like
              token validation, to prevent unauthorized access to the password
              reset functionality.
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#611EBD',
                  fontSize: moderateScale(14),
                  fontFamily: 'AvenirHeavy',
                  textAlign: 'center',
                }}>
                Learn More
              </Text>
            </TouchableOpacity>
            <View style={{marginVertical: moderateScale(20)}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: '#611EBD',
                  fontFamily: 'AvenirMedium',
                  padding: moderateScale(2),
                }}>
                Email
              </Text>
              <TextInput
                style={styles.input}
                // onChangeText={e => onChangeNumber(e)}
                onChangeText={text => setValue(text)}
                value={value}
                placeholder="Enter Your Email"
                keyboardType="email-address"
                placeholderTextColor={'#8B8A8A'}
              />
            </View>
          </ScrollView>
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
                Submit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled
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
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: moderateScale(50),
    marginBottom: moderateScale(20),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale(10),
    color: '#262626',
  },
});
