import React, {useState, useRef, useMemo, useCallback} from 'react';
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
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const ChatScreens = ({route}) => {
  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '85%',
          position: 'absolute',
          zIndex: 1000,
          bottom: moderateScale(0),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: moderateScale(20),
        }}>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
};

export default ChatScreens;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(40),
    margin: moderateScale(10),
    color: '#000',
    fontSize: moderateScale(14),
    padding: moderateScale(10),
    marginBottom: moderateScale(100),
  },
});
