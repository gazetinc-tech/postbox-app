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
  PermissionsAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';

const LocationPermission = ({route}) => {
  const nav = useNavigation();
  const handlePermission = async Permission => {
    request(Permission).then(result => {
      console.log('Location:::::::::::::::::::', result)
      console.log(result);
      nav.navigate('CameraPermission');
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
        <ScrollView>
          <FastImage
            source={require('../image/LocationPermission.png')}
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
            Real-time location with friends
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(16),
              fontFamily: 'AvenirHeavy',
              textAlign: 'center',
            }}>
            Would you like to share information?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(25),
            }}>
            <FastImage
              source={require('../image/heart.png')}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <View
              style={{marginLeft: moderateScale(15), flexDirection: 'column'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirHeavy',
                  textAlign: 'left',
                }}>
                Keep your location information safe
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                Share your private maps with your friends
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                for even more It's easy to assemble.
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(25),
            }}>
            <FastImage
              source={require('../image/Setting.png')}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <View
              style={{marginLeft: moderateScale(15), flexDirection: 'column'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirHeavy',
                  textAlign: 'left',
                }}>
                Choose what to share
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                Who and where can see your location information.
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                You can control when you share information there is.
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: moderateScale(25),
            }}>
            <FastImage
              source={require('../image/Sheld.png')}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <View
              style={{marginLeft: moderateScale(15), flexDirection: 'column'}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirHeavy',
                  textAlign: 'left',
                }}>
                Change your settings at any time
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                Change the Messenger location option in
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: moderateScale(12),
                  fontFamily: 'AvenirLight',
                  textAlign: 'left',
                }}>
                your device settings. You can turn it off.
              </Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'ios') {
              handlePermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
            } else {
              handlePermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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
            Allow location access
          </Text>
        </TouchableOpacity>
        <Text
          onPress={() => nav.navigate('CameraPermission')}
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

export default LocationPermission;
const styles = StyleSheet.create({});
