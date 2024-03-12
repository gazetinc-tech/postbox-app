import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import DrawerNavigator from '../Tab/DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function LoggedIn() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
