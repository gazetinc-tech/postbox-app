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
  PermissionsAndroid,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
const CameraPermission = ({route}) => {
  const nav = useNavigation();
  const handlePermission = async Permission => {
    request(Permission).then(result => {
      console.log(result);
      nav.navigate('SmsPermission');
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
            source={require('../image/CameraPermission.png')}
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
            Capture the things around you Would you like to capture ?
          </Text>

          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(12),
              fontFamily: 'AvenirLight',
              textAlign: 'center',
            }}>
            To unlock the full potential of our app's features, we may request
            access to your device's camera. Granting camera permission empowers
            you to capture and share memorable moments, scan QR codes, or engage
            in immersive augmented reality experiences seamlessly. Be assured
            that your privacy is of utmost importance to us, and we will only
            use camera access for the intended features within the app,
            respecting your personal space and security at all times.
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
              handlePermission(PERMISSIONS.IOS.CAMERA);
            } else {
              handlePermission(PERMISSIONS.ANDROID.CAMERA);
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
            Allow camera access
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.navigate('SmsPermission');
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

export default CameraPermission;
const styles = StyleSheet.create({});
