/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import Snackbar from 'react-native-snackbar';

const AddPhoneNumber = ({route}) => {
  const nav = useNavigation();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [otp, setOtp] = useState('');
  let defaultResendTime = 30;
  const [seconds, setSeconds] = useState(defaultResendTime);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [otpScreen, setOtpScreen] = useState(false);
  const [otpVerfie, setOtpVerfie] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState(false);

  useEffect(() => {
    if (otpScreen === true) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          setIsResendVisible(true);
          clearInterval(interval);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpScreen, seconds]);
  const otpVerfies = () => {
    var val = Math.floor(1000 + Math.random() * 9000);
    Snackbar.show({
      text: `${val}`,
      textColor: '#fff',
      backgroundColor: 'green',
      numberOfLines: 1,
      duration: 6000,
      marginBottom: moderateScale(100),
      action: {
        text: 'Hide',
        textColor: '#fff',
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
    setOtpVerfie(val);
    setIsResendVisible(false);
    setSeconds(30);
  };
  const phoneInput = useRef(null);
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
        {otpScreen === false ? (
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
                Add mobile phone number
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'center',
                }}>
                Enter your current mobile phone number in Messenger and Add your
                Facebook account to log in and enter your password. You can
                reset and receive SMS notifications. Also Recommend friends and
                display advertisements on Facebook products and It also helps
                with improvement. Your mobile phone number is in your profile.
                Only members can see it. Learn more
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
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="second"
                containerStyle={{
                  backgroundColor: '#611EBD',
                  width: '100%',
                  height: moderateScale(70),
                  borderRadius: moderateScale(10),
                  marginVertical: moderateScale(10),
                  elevation: 0,
                }}
                textContainerStyle={{
                  backgroundColor: '#f2f2f2',
                  borderTopRightRadius: moderateScale(10),
                  borderBottomRightRadius: moderateScale(10),
                }}
                textInputStyle={{color:'#262626'}}
                textInputProps={{
                  keyboardType: 'phone-pad',
                  maxLength: 10, // Maximum length
                  minLength: 10, // Minimum length
                }}
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme={true}
                // withShadow
                autoFocus
                textProps={{style: {color: 'white'}}}
                placeholder={'Phone Number'}
                placeholderTextColor="#262626"
                codeTextStyle={{color: '#ffffff'}}
                disableArrowIcon
              />
            </ScrollView>
            <TouchableOpacity
              // onPress={() => nav.navigate('CompleteProfile')}
              onPress={() => {
                if (value === '') {
                  Snackbar.show({
                    text: 'Please enter a valid Mobile Number!!!',
                    textColor: 'red',
                    numberOfLines: 1,
                    backgroundColor: '#fff',
                    marginBottom: moderateScale(100),
                  });
                } else {
                  otpVerfies();
                  setOtpScreen(true);
                }
              }}
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
                Sent
              </Text>
            </TouchableOpacity>
          </>
        ) : (
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
                Add mobile phone number
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'center',
                }}>
                Enter your current mobile phone number in Messenger and Add your
                Facebook account to log in and enter your password. You can
                reset and receive SMS notifications. Also Recommend friends and
                display advertisements on Facebook products and It also helps
                with improvement. Your mobile phone number is in your profile.
                Only members can see it. Learn more
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
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor={'#262626'}
                value={otp}
                keyboardType="number-pad"
                maxLength={4}
                onChangeText={text => setOtp(text.replace(/[^0-9]/g, ''))}
                style={{
                  backgroundColor: '#f2f2f2',
                  padding: moderateScale(10),
                  color: '#262626',
                  borderRadius: moderateScale(10),
                  marginTop: moderateScale(25),
                }}
              />
              {otpErrorMessage && (
                <Text style={styles.wrongOtp}>
                  Wrong code, please try again
                </Text>
              )}
              <View
                style={{
                  margin: moderateScale(25),
                }}>
                <Text style={styles.reciveOtp}>Don't receive an OTP ? </Text>
                {isResendVisible ? (
                  <TouchableOpacity onPress={() => otpVerfies()}>
                    <Text style={styles.resenOtp}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.resenOtpSec}>
                    Resend OTP in 00:{seconds} Seconds
                  </Text>
                )}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => {
                if (otp === '') {
                  setOtpErrorMessage(true);
                } else if (otp == otpVerfie) {
                  nav.navigate('LocationPermission');
                } else {
                  Snackbar.show({
                    text: 'Wrong OTP',
                    textColor: 'White',
                    numberOfLines: 1,
                    backgroundColor: 'red',
                    marginBottom: moderateScale(100),
                  });
                  setOtpErrorMessage(false);
                }
              }}
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
          </>
        )}
      </View>
    </View>
  );
};

export default AddPhoneNumber;
const styles = StyleSheet.create({
  reciveOtp: {
    fontSize: moderateScale(16),
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  resenOtp: {
    fontSize: moderateScale(16),
    color: 'green',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  resenOtpSec: {
    fontSize: moderateScale(16),
    color: 'red',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
  wrongOtp: {
    fontSize: moderateScale(16),
    color: 'red',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
});
