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

const DiscoverPeople = ({route}) => {
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
          Discover People
        </Text>
      </TouchableOpacity>
      <View style={{marginVertical:moderateScale(15), borderBottomWidth:moderateScale(2), borderBottomColor:"#E6EEFA"}} ></View>

      <ScrollView
        contentContainerStyle={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScale(1),
          paddingBottom: moderateScale(60),
        }}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage
                source={require('../image/SHiV.png')}
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50),
                  borderRadius: moderateScale(50),
                  marginRight: moderateScale(15),
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: moderateScale(16),
                    color: '#000',
                    fontFamily: 'AvenirMedium',
                  }}>
                  Nabarun Adhikary
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    color: '#687684',
                    fontFamily: 'AvenirMedium',
                  }}>
                  69M Followers
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#611EBD',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: moderateScale(10),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: '#fff',
                  fontFamily: 'AvenirMedium',
                  paddingHorizontal: moderateScale(25),
                  paddingVertical: moderateScale(6),
                }}>
                Follow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverPeople;
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
