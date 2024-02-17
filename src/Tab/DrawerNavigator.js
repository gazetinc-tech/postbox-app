/* eslint-disable prettier/prettier */
import { Alert, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React from 'react';
import BottomTab from './BottomTab';
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { updateUserDetails } from '../../redux/reducers/userReducer';
import DrawerItemLabel from './DrawerItemLabel';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../utils/overAllNormalization';
import { useDispatch, useSelector } from 'react-redux';

// 
import Account from './account/Account';
import PrivacyPolicy from './privacy/PrivacyPolicy';
import ContactUs from './contactUs/ContactUs';
import HelpAndSupport from './helpSupport/HelpAndSupport';
import Profile from './profile/Profile';

// 
import ImageComp from '../comp/ImageComp'
import Fsize from '../comp/Fsize'


const Drawer = createDrawerNavigator();


export default function DrawerNavigator ( { navigation } ) {

  return (
    <Drawer.Navigator
      drawerContent={props => <Feed2 {...props} />}
      initialRouteName="BottomTab"
      screenOptions={{
        swipeEdgeWidth: 0,
        drawerStyle: {
          marginTop: heightPercentageToDP( 4 ),
          height: heightPercentageToDP( 100 ),
          overflow: 'hidden',
          borderRadius: heightPercentageToDP( 3 ),
          backgroundColor: '#E6EEFA',
          width: widthPercentageToDP( 80 ),
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLabel: () => (
            <DrawerItemLabel
              label={"Dashboard"}
              drawerIcon={undefined}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={"Profile"}
              drawerIcon={require( '../image/user.png' )}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={"Account"}
              drawerIcon={require( '../image/Account.png' )}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={"Contact us"}
              drawerIcon={require( '../image/ChatCircleDots.png' )}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={"Help & Support"}
              drawerIcon={require( '../image/Question.png' )}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          drawerLabel: () => (
            <DrawerItemLabel
              label={"PrivacyPolicy"}
              drawerIcon={require( '../image/ShieldWarning.png' )}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}


const Feed2 = ( { ...props } ) => {
  const dispatch = useDispatch();
  const { profile } = useSelector( state => state?.userReducer );

  const logoutUser = () => {
    Alert.alert( "Logout", "Are you sure want to logout?", [
      {
        text: "No",
        onPress: () => { },
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => confirmLogout(),
        style: "cancel",
      },
    ] );
  };

  const confirmLogout = () => {
    dispatch(
      updateUserDetails( {
        isLogin: false,
        profile: {},
        token: '',
      } ),
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{
        marginTop: heightPercentageToDP( 1.5 ),
        marginBottom: heightPercentageToDP( 2 )
      }}>


        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate( 'Myprofile' );
          }}
          style={{
            justifyContent: 'flex-start',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginLeft: widthPercentageToDP( 5 ),
            marginVertical: heightPercentageToDP( 1.5 ),
            marginTop: heightPercentageToDP( 3 )
          }}>
          <FastImage
            source={{ uri: profile?.avatar }}
            resizeMode={'cover'}
            style={{
              height: heightPercentageToDP( 7 ),
              width: heightPercentageToDP( 7 ),
              borderRadius: heightPercentageToDP( 3.5 )
            }}
          />
          <View
            style={{
              width: widthPercentageToDP( 52 ),
              flexDirection: 'column',
              marginLeft: widthPercentageToDP( 5 ),
              // backgroundColor: 'red'
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={{
                color: '#000',
                fontSize: Fsize.fs18,
                fontFamily: 'AvenirHeavy',
              }}>
              {profile?.name}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: Fsize.fs11,
                fontWeight: '400',
                fontFamily: 'Actor-Regular',
                textAlign: 'left',
              }}>
              Verified Profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* cross icon */}
        <TouchableOpacity
          onPress={() => props.navigation.closeDrawer()}
          style={{
            position: 'absolute',
            top: heightPercentageToDP( 1 ),
            right: widthPercentageToDP( 4 ),
          }}>
          <ImageComp
            source={require( '../image/cut.png' )}
            height={2.5}
            width={heightPercentageToDP( 2.5 )}
            mode={'contain'}
            style={{ tintColor: 'black' }}
          />
        </TouchableOpacity>
      </SafeAreaView>



      {/* line */}
      <View
        style={{
          borderBottomColor: "#D4D6DB",
          borderBottomWidth: widthPercentageToDP( "0.2" ),
          marginHorizontal: heightPercentageToDP( 3 ),
        }}
      />
      {/* drawer item */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <TouchableOpacity
          style={{
            marginTop: heightPercentageToDP( 3 ),
            height: heightPercentageToDP( 5 ),
            justifyContent: 'center'
          }}
          onPress={logoutUser}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create( {
  logoutText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: heightPercentageToDP( 2 ),
    marginLeft: widthPercentageToDP( '5' ),
  },
} );
