/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateUserDetails} from '../../redux/reducers/userReducer';
import {useDispatch} from 'react-redux';

const Onboarding = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Swiper style={{}} showsButtons={false} loop={false}>
        <ImageBackground
          source={require('../image/onboarding1.png')}
          resizeMode="cover"
          style={styles.slide1}>
          <StatusBar backgroundColor={'#611EBD'} hidden={false} />
        </ImageBackground>
        <ImageBackground
          source={require('../image/Onboarding2.png')}
          resizeMode="cover"
          style={styles.slide2}>
          <StatusBar backgroundColor={'#611EBD'} hidden={false} />
          <TouchableOpacity
            onPress={() => {
              dispatch(
                updateUserDetails({
                  boarding: true,
                }),
              );
              nav.navigate('SignIn');
            }}
            style={{
              padding: moderateScale(10),
              width: moderateScale(90),
              height: moderateScale(45),
              position: 'absolute',
              borderWidth: moderateScale(1),
              borderColor: '#fff',
              borderRadius: moderateScale(15),
              bottom: moderateScale(20),
              right: moderateScale(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'AvenirMedium',
                fontSize: moderateScale(14),
              }}>
              Let's Go
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </Swiper>
    </View>
  );
};

export default Onboarding;
const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: 'red'},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
