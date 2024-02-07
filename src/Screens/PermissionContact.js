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

const PermissionContact = ({route}) => {
  const nav = useNavigation();
  const handlePermission = async Permission => {
    request(Permission).then(result => {
      console.log(result);
      nav.navigate('PermissionNotifications');
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
            source={require('../image/PermissionContact.png')}
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
            Connecting with friends and family Would you like to allow contacts
            access ?
          </Text>

          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(12),
              fontFamily: 'AvenirLight',
              textAlign: 'center',
            }}>
            To make connecting with friends and family smoother, our app may
            request access to your contacts. This permission allows you to
            easily find and interact with your contacts within the app, making
            social interactions and sharing content more convenient. We take
            your privacy seriously, and rest assured that we will only access
            your contacts for the sole purpose of enhancing your user
            experience, never sharing or using this information for any other
            purpose.
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
              handlePermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
            } else {
              handlePermission(PERMISSIONS.ANDROID.READ_CONTACTS);
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
            Allow contacts access
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => {
            nav.navigate('PermissionNotifications');
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

export default PermissionContact;
const styles = StyleSheet.create({});
