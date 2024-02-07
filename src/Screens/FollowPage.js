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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import Following from './Following';
import Followers from './Followers';

const FollowPage = ({route}) => {
  const userSearch = route?.params?.user;
  const [select, SetSelect] = React.useState('1');
  const nav = useNavigation();
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: moderateScale(20),
          left: moderateScale(20),
        }}
        onPress={() => nav.goBack()}>
        <FastImage
          source={require('../image/Allowleft.png')}
          style={{
            height: moderateScale(50),
            width: moderateScale(50),
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(35),
        }}
        onPress={() => nav.goBack()}>
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: 'AvenirHeavy',
            color: '#000',
          }}>
          Nabarun
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: moderateScale(20),
        }}>
        <TouchableOpacity
          onPress={() => SetSelect('1')}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:
              select === '1' ? moderateScale(3) : moderateScale(1),
            borderBottomColor: select === '1' ? '#611EBD' : '#687684',
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: select === '1' ? '#611EBD' : '#687684',
              fontFamily: 'AvenirMedium',
              paddingBottom: moderateScale(5),
            }}>
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetSelect('2')}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:
              select === '2' ? moderateScale(3) : moderateScale(1),
            borderBottomColor: select === '2' ? '#611EBD' : '#687684',
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: select === '2' ? '#611EBD' : '#687684',
              fontFamily: 'AvenirMedium',
              paddingBottom: moderateScale(5),
            }}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScale(15),
          paddingBottom: moderateScale(60),
        }}>
        {select === '2' ? (
          <Following userSearch={userSearch} />
        ) : (
          <Followers userSearch={userSearch} />
        )}
      </ScrollView>
    </View>
  );
};

export default FollowPage;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(50),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale(15),
  },
});
