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
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';

const SmsPermission = ({route}) => {
  const nav = useNavigation();
  const handlePermission = async Permission => {
    request(Permission).then(result => {
      console.log(result);
      nav.navigate('MediaPermission');
    });
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
        <ScrollView
          contentContainerStyle={{marginHorizontal: moderateScale(20)}}>
          <FastImage
            source={require('../image/SmsPermission.png')}
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
            Automatically fetch OTP Would you like to allow SMS access ?
          </Text>

          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(12),
              fontFamily: 'AvenirLight',
              textAlign: 'center',
            }}>
            To enhance your experience and provide seamless communication, our
            app may request SMS permission. Granting this permission will enable
            you to receive important messages and updates directly within the
            app, ensuring you stay informed and connected with ease. Rest
            assured, your privacy and security are our top priorities, and we
            will only access SMS for the purpose of enhancing your user
            experience.
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
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'ios') {
              handlePermission(PERMISSIONS.IOS.CONTACTS);
            } else {
              handlePermission(PERMISSIONS.ANDROID.RECEIVE_SMS);
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
            Allow sms access
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.navigate('MediaPermission');
          }}
          style={{
            color: '#000',
            fontSize: moderateScale(12),
            fontFamily: 'AvenirHeavy',
            textAlign: 'center',
          }}>
          Do it later
        </Text>
      </View>
    </View>
  );
};

export default SmsPermission;
const styles = StyleSheet.create({});
