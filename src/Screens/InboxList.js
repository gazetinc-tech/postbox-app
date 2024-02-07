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

const InboxList = ({route}) => {
  const nav = useNavigation();
  const [select, SetSelect] = useState('1');
  const [number, onChangeNumber] = useState('');
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(35),
        }}
        >
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: 'AvenirHeavy',
            color: '#000',
          }}>
          Inbox
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#E6EEFA',
          paddingHorizontal: moderateScale(10),
          marginHorizontal: moderateScale(40),
          borderRadius: moderateScale(20),
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: moderateScale(20),
        }}>
        <FastImage
          source={require('../image/TagSearch.png')}
          style={{
            height: moderateScale(20),
            width: moderateScale(20),
            marginRight: moderateScale(5),
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Search"
          keyboardType="default"
          placeholderTextColor={'#000'}
        />
      </View>
      <View
        style={{
          borderBottomWidth: moderateScale(4),
          width: '100%',
          borderBottomColor: '#E6EEFA',
        }}></View>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: moderateScale(20),
            padding: moderateScale(10),
            borderBottomWidth: moderateScale(2),
            borderBottomColor: '#E6EEFA',
          }}>
          <TouchableOpacity
            onPress={() => nav.navigate('MessageScreen')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
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
                Khushi Kapoor
              </Text>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: '#687684',
                  fontFamily: 'AvenirMedium',
                }}>
                Let’s get dinner! How About shu...
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: moderateScale(10),
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#687684',
                fontFamily: 'AvenirMedium',
                paddingHorizontal: moderateScale(25),
                paddingVertical: moderateScale(6),
              }}>
              Just Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default InboxList;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(40),
    margin: moderateScale(5),
    color: '#000',
    fontSize: moderateScale(14),
    padding: moderateScale(10),
    width: moderateScale(200),
  },
});
