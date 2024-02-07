/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {moderateScale} from '../utils/overAllNormalization';
import FastImage from 'react-native-fast-image';

const MediaPermission = ({route}) => {
  const nav = useNavigation();
  const handlePermission = async (Permission, Permission2) => {
    request(Permission).then(result => {
      console.log(result);
      request(Permission2).then(result1 => {
        console.log(result1);
        nav.navigate('PermissionContact');
      });
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
            source={require('../image/MediaPermission.png')}
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
            Choose existing photos and videos Would you like to allow media
            access ?
          </Text>

          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(12),
              fontFamily: 'AvenirLight',
              textAlign: 'center',
            }}>
            Our app may seek media permission to provide you with a richer and
            more interactive experience. By granting this permission, you can
            effortlessly upload and share photos, videos, and other multimedia
            content, enhancing your engagement with the app's community and
            features. Rest assured, we prioritize your privacy and security, and
            media access will only be used within the app's intended
            functionalities, with your control and convenience in mind.
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
              handlePermission(
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
                PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
              );
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
            Allow media access
          </Text>
        </TouchableOpacity>
        <Text
        onPress={()=>nav.navigate('PermissionContact')}
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

export default MediaPermission;
const styles = StyleSheet.create({});
