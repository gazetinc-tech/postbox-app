/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { moderateScale } from '../utils/overAllNormalization';
import { AuthContext } from '../Navigation/AuthProvider';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { isPasswordLen, isValidEmail } from './validation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
// import { AccessToken, LoginManager, GraphRequestManager, GraphRequest } from 'react-native-fbsdk-next';
// import auth from "@react-native-firebase/auth";
import axios from 'react-native-axios';
import { updateUserDetails } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';


const SignInScnd = ( { route } ) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const [ number, onChangeNumber ] = React.useState( 'cubiprodev@gmail.com' );
  const [ psword, onPsword ] = React.useState( 'Homeshop@18' );
  const { handleSocialLogin, login, loading, SetSelect } = React.useContext( AuthContext );
  const loginUser = () => {
    if ( !isValidEmail( number ) ) {
      return Snackbar.show( {
        text: 'Please enter a valid Email!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }
    if ( !isPasswordLen( psword ) ) {
      return Snackbar.show( {
        text: 'Please enter a Password!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }
    if ( isValidEmail( number ) && isPasswordLen( psword ) ) {
      login( number, psword, navigator );
    }
  };

  // google signin
  useEffect( () => {
    GoogleSignin.configure( {
      scopes: [ "email" ], // what API you want to access on behalf of the user, default is email and profile
      webClientId: "50053603736-3h4v8jvl0kdhieprigmfi6jeit6j8353.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    } );
  }, [] );

  const google_login = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log( "google userInfo :::", userInfo );
      // add api to do login
      handleSocialLogin( userInfo, navigator );
    } catch ( error ) {
      if ( error.code === statusCodes.SIGN_IN_CANCELLED ) {
        console.log( "user cancelled the login flow" );
      } else if ( error.code === statusCodes.IN_PROGRESS ) {
        console.log( "operation (e.g. sign in) is in progress already" );
      } else if ( error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE ) {
        console.log( "play services not available or outdated" );
      } else {
        console.log( "some other error happened" );
      }
    }
  };



  // facebook login:----
  const Facebook_Login = async () => {
    // Attempt login with permissions
    // try {
    //   const result = await LoginManager.logInWithPermissions( [ "public_profile", "email" ] );
    //   console.log( "facebook resoult :::", result );
    //   if ( result.isCancelled ) {
    //     console.log( "user cancelled the login flow" );
    //     return;
    //   }
    //   // Once signed in, get the users AccesToken
    //   const data = await AccessToken.getCurrentAccessToken();
    //   if ( !data ) {
    //     console.log( "unable to get users acces token" );
    //     return;
    //   }
    //   const facebookCredential = await auth.FacebookAuthProvider.credential( data.accessToken );
    //   console.log( "facebook credential :::", facebookCredential );
    //   const infoRequest = new GraphRequest( "/me", {
    //     accessToken: facebookCredential?.accessToken,
    //     parameters: {
    //       fields: {
    //         string: "email,name,first_name,middle_name,last_name",
    //       },
    //     },
    //   }, ( error: any, result: any ) => {
    //     if ( error ) {
    //       console.log( "*** error ***", error );
    //     } else {
    //       console.log( "*** result ***", result );
    //       // API
    //       let objBody: oProps = {
    //         trainee_name: result?.name,
    //         social_media_id: result?.id,
    //         social_media_type: facebookCredential?.providerId,
    //       };
    //       console.log( "*** objBody ***", objBody );
    //       // api to do facebook login


    //     }
    //   }
    //   );
    //   new GraphRequestManager().addRequest( infoRequest ).start();
    // } catch ( e ) {
    //   console.log( "facebook sign in error" );
    // }
  };


  return (
    <View style={{ flex: 1, marginTop: moderateScale( 20 ), }}>

      <ScrollView contentContainerStyle={{ flex: 1 }}>

        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#611EBD',
            fontFamily: 'AvenirMedium',
          }}>
          E-mail
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => onChangeNumber( e )}
          value={number}
          placeholder="Type your E-mail"
          keyboardType="email-address"
        />
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#611EBD',
            fontFamily: 'AvenirMedium',
          }}>
          Password
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={e => onPsword( e )}
          value={psword}
          placeholder="Type your E-mail"
          keyboardType="default"
          secureTextEntry={true}
        />
        {!loading ? (
          <TouchableOpacity
            onPress={() => loginUser()}
            style={{
              backgroundColor: '#611EBD',
              marginTop: moderateScale( 30 ),
              borderRadius: moderateScale( 20 ),
              justifyContent: 'center',
              alignItems: 'center',
              height: moderateScale( 50 ),
              marginBottom: moderateScale( 20 ),
            }}>
            <Text
              style={{
                fontSize: moderateScale( 16 ),
                color: '#fff',
                fontFamily: 'AvenirMedium',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // onPress={() => loginUser()}
            style={{
              marginTop: moderateScale( 30 ),
              borderRadius: moderateScale( 20 ),
              justifyContent: 'center',
              alignItems: 'center',
              height: moderateScale( 50 ),
              marginBottom: moderateScale( 20 ),
            }}>
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{
                backgroundColor: '#611EBD',
                padding: moderateScale( 10 ),
                borderRadius: moderateScale( 50 ),
              }}
            />
          </TouchableOpacity>
        )}
        <Text
          onPress={() => {
            navigator.navigate( 'ForgotPassword' );
          }}
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            textAlign: 'right',
            marginBottom: moderateScale( 40 ),
          }}>
          Forgot Password?
        </Text>
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#656F78',
            fontFamily: 'AvenirMedium',
            textAlign: 'center',
          }}>
          Don’t have a Account?{' '}
          <Text
            onPress={() => SetSelect( '2' )}
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',

              textAlign: 'center',
            }}>
            Sign up
          </Text>
        </Text>

        {/* or line */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: heightPercentageToDP( 1.5 ),
          marginTop: heightPercentageToDP( 1 )
        }}>
          <View style={{
            width: widthPercentageToDP( 30 ),
            borderBottomWidth: heightPercentageToDP( 0.1 )
          }}></View>
          <Text style={{ color: '#000000', paddingHorizontal: widthPercentageToDP( 3 ) }}>or Login with</Text>
          <View style={{
            width: widthPercentageToDP( 30 ),
            borderBottomWidth: heightPercentageToDP( 0.1 )
          }}></View>
        </View>

        {/* google login */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[ styles.google, { marginTop: heightPercentageToDP( 3 ), alignItems: 'center', justifyContent: 'center' } ]}
          onPress={() => google_login()}
        >
          <View style={styles.gLogoView}>
            <Image
              resizeMode="contain"
              style={styles.gLogo}
              source={require( "../image/google.png" )}
            />
          </View>

          <Text style={[ {
            paddingLeft: heightPercentageToDP( 1 ),
            color: '#000000',
          } ]}>
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* facebook login */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[ styles.google, { marginTop: heightPercentageToDP( 3 ), alignItems: 'center', justifyContent: 'center' } ]}
          onPress={() => {Facebook_Login()}}
        >
          <View style={styles.gLogoView}>
            <Image
              resizeMode="contain"
              style={styles.gLogo}
              source={require( "../image/facebook.png" )}
            />
          </View>

          <Text style={[ {
            paddingLeft: heightPercentageToDP( 1 ),
            color: '#000000',
          } ]}>
            Sign in with Facebook
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default SignInScnd;
const styles = StyleSheet.create( {
  input: {
    height: moderateScale( 50 ),
    marginBottom: moderateScale( 10 ),
    borderWidth: moderateScale( 1 ),
    padding: moderateScale( 10 ),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale( 15 ),
    color: '#262626',
  },

  google: {
    // flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: heightPercentageToDP( 3 ),
    paddingHorizontal: heightPercentageToDP( 2 ),
    height: heightPercentageToDP( 5 ),
    borderColor: "#D4D6DB",
  },
  gLogoView: {
    borderWidth: 1,
    borderColor: "#D4D6DB",
    borderRadius: heightPercentageToDP( 2 ),
    padding: heightPercentageToDP( 0.2 ),
    marginHorizontal: heightPercentageToDP( 1 ),
    height: heightPercentageToDP( 3 ),
    width: heightPercentageToDP( 3 ),
  },
  gLogo: {
    height: '100%',
    width: '100%',
  }


} );
