/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../Screens/Dashboard';
import InboxList from '../Screens/InboxList';
import AddPost from '../Screens/AddPost';
import Group from '../Screens/Group';
import { moderateScale } from '../utils/overAllNormalization';
import Notification from '../Screens/Notification';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import FriendsAndFamily from './FriendsAndFamily';
import HomeTown from './HomeTown';
import WorkLocation from './WorkLocation';

const Tab = createBottomTabNavigator();


export default function BottomTab () {
  return (
    <Tab.Navigator
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          // borderTopColor: '#f9f9f9',
          height: heightPercentageToDP( 6.5 ),
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
          tabBarIcon: ( { focused } ) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                  source={require( '../image/Home.png' )}
                  style={{
                    height: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ),
                    width: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 )
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={{
                  color: 'white',
                  fontSize: heightPercentageToDP( 1.35 ),
                }}>Home</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="FriendsAndFamily"
        component={FriendsAndFamily}
        options={{
          headerShown: false,
          tabBarIcon: ( { focused } ) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                  source={require( '../image/fnf.png' )}
                  style={{
                    height: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ),
                    width: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ),
                    // tinitColor:'#FFFFFF'
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                  tintColor={'#FFFFFF'}
                />
                <Text
                  ellipsizeMode='Tail'
                  numberOfLines={1}
                  style={{
                    color: 'white',
                    fontSize: widthPercentageToDP( 2.35 ),
                  }}>Friends & Family</Text>
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
          tabBarIcon: ( { focused } ) => {
            return (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: moderateScale( 15 ),
                }}>
                <FastImage
                  source={require( '../image/Plusbutton.png' )}
                  style={{
                    height: moderateScale( 70 ),
                    width: moderateScale( 70 ),
                    borderWidth: moderateScale( 1 ),
                    borderRadius: moderateScale( 70 ),
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
        name="HomeTown"
        component={HomeTown}
        options={{
          headerShown: false,
          tabBarIcon: ( { focused } ) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                  source={require( '../image/HomeTown.png' )}
                  style={{ height: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ), width: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ) }}
                  resizeMode={FastImage.resizeMode.stretch}
                  tintColor={'#FFFFFF'}
                />
                <Text
                  ellipsizeMode='Tail'
                  numberOfLines={1}
                  style={{
                    color: 'white',
                    fontSize: widthPercentageToDP( 2.35 ),
                  }}>Home town</Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="WorkLocation"
        component={WorkLocation}
        options={{
          headerShown: false,
          tabBarIcon: ( { focused } ) => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <FastImage
                  source={require( '../image/workLocation.png' )}
                  style={{ height: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ), width: focused === true ? heightPercentageToDP( 4 ) : heightPercentageToDP( 2.5 ) }}
                  resizeMode={FastImage.resizeMode.stretch}
                  tintColor={'#FFFFFF'}
                />
                <Text
                  ellipsizeMode='Tail'
                  numberOfLines={1}
                  style={{
                    color: 'white',
                    fontSize: widthPercentageToDP( 2.35 ),
                  }}>Work location</Text>
                {/*  */}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

