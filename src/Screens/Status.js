/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Animated,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {Menu} from 'react-native-paper';
import {AuthContext} from '../Navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import moment from 'moment';

export default function Status({route, navigation}) {
  const data = route?.params;
  const progressBar = useRef(new Animated.Value(0));
  const timeoutRef = useRef(null);
  const {BaseUrl} = React.useContext(AuthContext);
  const {token, profile} = useSelector(state => state?.userReducer);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const startProgressBar = () => {
    Animated.timing(progressBar.current, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if(finished) {
        navigation.goBack();
      }
    });
  };

  const stopProgressBar = () => {
    progressBar.current.stopAnimation();
  };

  useEffect(() => {
    startProgressBar();
    timeoutRef.current = setTimeout(() => {
      stopProgressBar();
      navigation.goBack();
    }, 5000);
  }, []);

  const progressAnimation = progressBar.current.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });
  const handleTouchStart = () => {
    stopProgressBar();
    clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = () => {
    startProgressBar();
    clearTimeout(timeoutRef.current);
  };

  const handelRemoveStory = id => {
    try {
      axios
        .get(BaseUrl + `/remove-story?story_id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // console.log(response?.data, 'GetUserDetails');
          if(response?.data?.status === 200) {
            navigation.navigate('Home');
            Snackbar.show({
              text: `${response?.data?.message}`,
              textColor: 'green',
              numberOfLines: 1,
              backgroundColor: '#fff',
            });
          }
        });
    } catch(error) {
      console.log(error, 'error');
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          height: moderateScale(3),
          width: '95%',
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          top: moderateScale(15),
        }}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}></Animated.View>
      </View>
      <View
        style={{
          padding: moderateScale(15),
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: moderateScale(12),
          left: 0,
          width: '90%',
        }}>
        <View
          style={{
            borderRadius: 100,
            width: moderateScale(40),
            height: moderateScale(40),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: data?.avatar}}
            style={{
              borderRadius: moderateScale(30),
              backgroundColor: 'orange',
              resizeMode: 'cover',
              width: '92%',
              height: '92%',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: moderateScale(16),
              paddingLeft: moderateScale(10),
            }}>
            {data?.username}
            <Text
              style={{
                color: 'white',
                fontSize: moderateScale(12),
                paddingLeft: moderateScale(10),
              }}>
              {' '}
              {`${moment().diff(data?.created_at, 'hours')} h`}
            </Text>
          </Text>
          {profile?.id !== data?.user_id ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FastImage
                source={require('../image/cut.png')}
                style={{
                  height: moderateScale(18),
                  width: moderateScale(18),
                  marginRight: moderateScale(5),
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
          ) : (
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Image
                    source={require('../image/dots.png')}
                    style={{
                      height: moderateScale(18),
                      width: moderateScale(18),
                      marginRight: moderateScale(5),
                      tintColor: '#ffffff',
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  handelRemoveStory(data?.id);
                }}
                title="Delete"
              />
            </Menu>
          )}
        </View>
      </View>

      <FastImage
        source={{uri: data?.images[0]?.image}}
        style={{
          position: 'absolute',
          width: '100%',
          height: moderateScale(600),
        }}
        resizeMode={FastImage.resizeMode.stretch}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
      {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginVertical: moderateScale(10),
          width: '100%',
        }}>
        <TextInput
          placeholder="send message"
          placeholderTextColor="white"
          style={{
            borderColor: 'white',
            borderRadius: moderateScale(20),
            width: '85%',
            height: moderateScale(40),
            paddingLeft: moderateScale(20),
            borderWidth: 1,
            fontSize: moderateScale(16),
            color: 'white',
          }}
        />
        <TouchableOpacity onPress={() => nav.goBack(null)}>
          <FastImage
            source={require('../image/send.png')}
            style={{
              height: moderateScale(25),
              width: moderateScale(25),
              marginRight: moderateScale(8),
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({});
