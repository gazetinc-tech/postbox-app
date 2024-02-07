/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, {useContext, useState, useRef, useEffect} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../Screens/Onboarding';
import SignIn from '../Screens/SignIn';
import LocationPermission from '../Screens/LocationPermission';
import CameraPermission from '../Screens/CameraPermission';
import SmsPermission from '../Screens/SmsPermission';
import MediaPermission from '../Screens/MediaPermission';
import PermissionContact from '../Screens/PermissionContact';
import PermissionNotifications from '../Screens/PermissionNotifications';
import AddPhoneNumber from '../Screens/AddPhoneNumber';
import CompleteProfile from '../Screens/CompleteProfile';
import AddPost from '../Screens/AddPost';
import Myprofile from '../Screens/Myprofile';
import EditProfile from '../Screens/EditProfile';
import OtherProfile from '../Screens/OtherProfile';
import FollowPage from '../Screens/FollowPage';
import InboxList from '../Screens/InboxList';
import MessageScreen from '../Screens/MessageScreen';
import GroupChats from '../Screens/GroupChats';
import DiscoverPeople from '../Screens/DiscoverPeople';
import SearchScreen from '../Screens/SearchScreen';
import Status from '../Screens/Status';
import {AuthContext} from './AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerNavigator from '../Tab/DrawerNavigator';
import {useSelector} from 'react-redux';
import ForgotPassword from '../Screens/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const {isLogin, boarding} = useSelector(state => state?.userReducer);
  if (!isLogin) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {boarding === false && (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="OTPScreen" component={AddPhoneNumber} />
        <Stack.Screen
          name="LocationPermission"
          component={LocationPermission}
        />
        <Stack.Screen name="CameraPermission" component={CameraPermission} />
        <Stack.Screen name="SmsPermission" component={SmsPermission} />
        <Stack.Screen name="MediaPermission" component={MediaPermission} />
        <Stack.Screen name="PermissionContact" component={PermissionContact} />
        <Stack.Screen
          name="PermissionNotifications"
          component={PermissionNotifications}
        />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        // initialRouteName="Onboarding"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="Myprofile" component={Myprofile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="OtherProfile" component={OtherProfile} />
        <Stack.Screen name="FollowPage" component={FollowPage} />
        <Stack.Screen name="InboxList" component={InboxList} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="GroupChats" component={GroupChats} />
        <Stack.Screen name="DiscoverPeople" component={DiscoverPeople} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Status" component={Status} />
      </Stack.Navigator>
    );
  }
}
