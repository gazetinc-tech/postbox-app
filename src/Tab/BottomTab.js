/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import InboxList from '../Screens/InboxList';
import AddPost from '../Screens/AddPost';
import Group from '../Screens/Group';
import {moderateScale} from '../utils/overAllNormalization';
import Notification from '../Screens/Notification';

export default function BottomTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          // borderTopColor: '#f9f9f9',
          height: 55,
          backgroundColor: '#7521FF',
          marginHorizontal: 0,
          // borderRadius: 15,
          marginVertical: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FastImage
                  source={require('../image/Home.png')}
                  style={{height: 20, width: 20}}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="chat"
        component={InboxList}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FastImage
                  source={require('../image/Chat.png')}
                  style={{height: 20, width: 20}}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="PlusIcon"
        component={AddPost}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: moderateScale(15),
                }}>
                <FastImage
                  source={require('../image/Plusbutton.png')}
                  style={{
                    height: moderateScale(70),
                    width: moderateScale(70),
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(70),
                    borderColor: '#c4c4c4',
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="user"
        component={Group}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FastImage
                  source={require('../image/Users.png')}
                  style={{height: 20, width: 20}}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FastImage
                  source={require('../image/Notification.png')}
                  style={{height: 20, width: 20}}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
