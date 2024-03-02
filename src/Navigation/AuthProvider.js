/* eslint-disable prettier/prettier */
import { View, Text } from 'react-native';
import React, {
  useState,
  useEffect,
  createContext,
  useReducer,
  Modal,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
// import messaging from '@react-native-firebase/messaging';
// import { getAppData } from '../screens/appScreens/AppData';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import messaging from '@react-native-firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';
import { updateUserDetails } from '../../redux/reducers/userReducer';

const AuthContext = createContext();
const AuthProvider = ( { children, navigation } ) => {
  const BaseUrl = 'https://shopninja.in/anurag/postbox/api/user';
  const [ userToken, setUserToken ] = useState( null );
  const [ isFirstLaunch, setIsFirstLaunch ] = useState( null );
  const [ deviceId, setDeviceId ] = useState( null );
  const [ userDetails, setUserDetails ] = useState( {} );
  const [ loading, setLoading ] = useState( false );
  const [ message, setMessage ] = useState( false );
  const [ select, SetSelect ] = useState( '1' );
  const dispatch = useDispatch();
  const { token } = useSelector( state => state?.userReducer );

  const initialFetch = {
    loading: false,
    success: false,
    error: false,
    response: false,
  };
  const fetchReducer = ( state, action ) => {
    switch ( action.type ) {
      case 'setLoading':
        return { ...state, loading: action.value };
      case 'setSuccess':
        return { ...state, success: action.value };
      case 'setError':
        return { ...state, error: action.value };
      case 'setResponse':
        return { ...state, response: action.value };
      case 'reset':
        return initialFetch;
      default:
        return state;
    }
  };
  const [ fetching, setFetching ] = useReducer( fetchReducer, initialFetch );

  const initialAppData = {
    patients: '',
  };
  const dataReducer = ( state, action ) => {
    switch ( action.type ) {
      case 'setPatients':
        return { ...state, patients: action.value };
      default:
        return state;
    }
  };
  const [ appData, setAppData ] = useReducer( dataReducer, initialAppData );

  const getToken = async () => {
    await AsyncStorage.getItem( 'userToken' ).then( value => {
      if ( value !== null ) {
        setUserToken( value );
        // getApiData(value)
      }
    } );
  };
  const getDetails = async () => {
    await AsyncStorage.getItem( 'userDetails' ).then( value => {
      if ( value !== null ) {
        setUserDetails( JSON.parse( value ) );
        // getApiData(value)
      }
    } );
  };

  const getIntialLaunch = () => {
    AsyncStorage.getItem( 'alreadyLaunched' ).then( value => {
      if ( value == null ) {
        AsyncStorage.setItem( 'alreadyLaunched', 'true' );
        setIsFirstLaunch( true );
      }
    } );
  };

  useEffect( () => {
    if ( token ) {
      setUserToken( token );
    } else {
      getToken();
    }
    getDetails();
    getIntialLaunch();
  }, [ token ] );

  return (
    <AuthContext.Provider
      value={{
        userToken,
        fetching,
        setFetching,
        isFirstLaunch,
        setIsFirstLaunch,
        appData,
        setAppData,
        BaseUrl,
        userDetails,
        setLoading,
        loading,
        SetSelect,

        select,

        handleSocialLogin: async ( userInfo, nav ) => {
          setLoading( true );
          var form = new FormData();
          form.append( 'email', userInfo?.user?.email );
          form.append( 'name', userInfo?.user?.name );
          form.append( 'device_id', userInfo?.user?.id );
          console.log( 'google Social login::::', form );
          await axios
            .post( 'https://shopninja.in/anurag/postbox/api/user/social_login', form, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              // console?.log( response, 'login' );
              if ( response?.data?.status === 200 ) {
                setLoading( false );
                setUserToken( response?.data?.accessToken );
                AsyncStorage.setItem( 'userToken', response?.data?.accessToken );
                // setTimeout( () => {
                nav.navigate( 'CompleteProfile', { token: response?.data?.accessToken, user: userInfo?.user } )
                // }, 400 );
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              } else if (
                response?.data?.status === 200 &&
                response?.data?.email_verified_at === null
              ) {
                console.log( 'hiiiiiiiiiiiii1111zzz', response?.data )
                // navigation.navigate('Otp', {
                //   email: email,
                // });
              } else if ( response?.data?.message === 'user not found' ) {
                navigation?.navigate( 'SignUp' );
                SetSelect( '2' );
                console.log( 'hiiiiiiiiiiiii1111zzzbbbbb', response?.data )
              }
            } )
            .catch( error => {
              setLoading( false );
              console?.log( 'error:::::::::::::::::::', error );
              Snackbar.show( {
                text: `Enter Correct Email or Password`,
                textColor: '#002570',
                numberOfLines: 1,
                backgroundColor: '#fff',
              } );
            } );

        },

        signup: async ( firstName, lastName, email, password, nav, phone, countryCode ) => {
          setLoading( true );
          var form = new FormData();
          form.append( 'name', firstName + ' ' + lastName );
          form.append( 'email', email );
          form.append( 'password', password );
          form.append( 'device_id', '1234' );
          console.log( form );
          await axios
            .post( BaseUrl + '/signup', form, {
              headers: {
                Accept: 'application/json',
                'Content-type': 'multipart/form-data',
              },
            } )
            .then( response => {
              console.log( response?.data, 'sssssssssss' );
              setLoading( false );
              if ( response?.data?.status === 200 ) {
                setUserToken( response?.data?.accessToken );
                AsyncStorage.setItem( 'userToken', response?.data?.accessToken );
                dispatch(
                  updateUserDetails( {
                    token: response?.data?.accessToken,
                  } ),
                );
                nav.navigate( 'OTPScreen', { countryCode: countryCode, phone: phone } );
              } else if ( response?.data?.status === 400 ) {
                Snackbar.show( {
                  text: `${ response.data?.message } Please Login`,
                  textColor: 'red',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
                SetSelect( '1' );
              }
            } )
            .catch( error => {
              // setFetching({ type: 'setError', value: { heading: " Error !", data: error?.response?.data } })
              if ( error ) {
                Snackbar.show( {
                  text: `${ error?.response?.data?.message }`,
                  textColor: 'red',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
                setLoading( false );
              }
            } );
        },

        login: async ( email, password, navigation ) => {
          setLoading( true );
          var form = new FormData();
          form.append( 'email', email );
          form.append( 'password', password );
          form.append( 'device_id', '1234' );
          console.log( form );
          await axios
            .post( BaseUrl + '/login', form, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              console?.log( response, 'login' );
              setLoading( false );
              if ( response?.data?.status === 200 ) {
                setUserToken( response?.data?.accessToken );
                AsyncStorage.setItem( 'userToken', response?.data?.accessToken );
                dispatch(
                  updateUserDetails( {
                    isLogin: true,
                    token: response?.data?.accessToken,
                  } ),
                );
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              } else if (
                response?.data?.status === 200 &&
                response?.data?.email_verified_at === null
              ) {
                // navigation.navigate('Otp', {
                //   email: email,
                // });
              } else if ( response?.data?.message === 'user not found' ) {
                // navigation?.navigate('SignUp');
                SetSelect( '2' );
              }
            } )
            .catch( error => {
              setLoading( false );
              console?.log( error );
              Snackbar.show( {
                text: `Enter Correct Email or Password`,
                textColor: '#002570',
                numberOfLines: 1,
                backgroundColor: '#fff',
              } );
            } );
        },

        verifyOtp: async ( email, otp, navigation ) => {
          var form = new FormData();
          form.append( 'email', email );
          form.append( 'otp', otp );
          console?.log( form );
          await axios
            .post( 'http://shopninja.in/anurag/wardrobe/api/verify-otp', form, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              console?.log( response, 'dddd' );
              if ( response?.data?.message === 'Registration successful' ) {
                setUserToken( response?.data?.accessToken );
                AsyncStorage.setItem( 'userToken', response?.data?.accessToken );
                // navigation.navigate('Gender', {
                //   token: response?.data?.accessToken,
                // });
              } else {
                // setMessage(response.data.message);
                // setFetching({
                //   type: 'setError',
                //   value: {heading: ' Error !', data: response.data.error},
                // });
              }
            } )
            .catch( error => {
              console?.log( error, 'error' );
              setFetching( { type: 'setLoading', value: false } );
            } );
        },

        forgotPassword: async ( email, navigation ) => {
          setLoading( true );
          var form = new FormData();
          form.append( 'email', email );
          await axios
            .post( BaseUrl + '/reset-password', form, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              setLoading( false );
              // console?.log(response,"forgotPassword")
              if ( response?.data?.status === 200 ) {
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
                navigation.navigate( 'SignIn' );
              } else {
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              }
            } )
            .catch( error => {
              setLoading( false );
              console?.log( error, 'forgot' );
              if ( error ) {
                Snackbar.show( {
                  text: `User Not Found`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              }
            } );
        },
        resendOtp: async email => {
          setLoading( true );
          var form = new FormData();
          form.append( 'email', email );
          await axios
            .post( BaseUrl + '/resend-otp', form, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              if ( response?.data?.status === 200 ) {
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
                navigation.navigate( 'SignIn' );
              } else {
              }
            } )
            .catch( error => { } );
        },
        changePwd: async ( newPassword, confirmPassword, navigation ) => {
          setLoading( true );
          var form = new FormData();
          form.append( 'old_psw', newPassword );
          form.append( 'new_psw', confirmPassword );

          await axios
            .post( BaseUrl + '/change-password', form, {
              headers: {
                Authorization: `Bearer ${ userToken }`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              setLoading( false );
              if ( response.data.status === 200 ) {
              } else {
                setFetching( {
                  type: 'setError',
                  value: { heading: ' Error !', data: response.data.msg },
                } );

                setMessage( response.data.msg );
              }
            } )
            .catch( error => {
              setMessage( 'Network issue.' );
              setFetching( {
                type: 'setError',
                value: { heading: ' Error !', data: response.data.msg },
              } );
              setLoading( false );
            } );
        },

        CompleteRegistration: async (
          house_no,
          locality,
          landmark,
          pin_code,
          gender,
          url,
          type,
          name,
          token,
        ) => {
          var form = new FormData();
          form.append( 'house_no', house_no );
          form.append( 'locality', locality );
          form.append( 'landmark', landmark );
          form.append( 'pin_code', pin_code );
          form.append( 'gender', gender );
          form.append( 'image', {
            uri: url,
            type: type,
            name: name,
          } );
          await axios
            .post( BaseUrl + '/complete-profile', form, {
              headers: {
                Authorization: `Bearer ${ token }`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              if ( response?.data?.status === 200 ) {
                setUserToken( token );
                AsyncStorage.setItem( 'userToken', token );
                Snackbar.show( {
                  text: `Successfully Added`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              } else if ( response?.data?.status === 400 ) {
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: 'red',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              }
            } )
            .catch( error => {
              setLoading( false );
            } );
        },
        CompleteRegistrationOne: async (
          house_no,
          locality,
          landmark,
          pin_code,
          gender,
          token,
        ) => {
          var form = new FormData();
          form.append( 'house_no', house_no );
          form.append( 'locality', locality );
          form.append( 'landmark', landmark );
          form.append( 'pin_code', pin_code );
          form.append( 'gender', gender );

          await axios
            .post( BaseUrl + '/complete-profile', form, {
              headers: {
                Authorization: `Bearer ${ token }`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
              },
            } )
            .then( response => {
              if ( response?.data?.status === 200 ) {
                setUserToken( token );
                AsyncStorage.setItem( 'userToken', token );
                Snackbar.show( {
                  text: `Successfully Added`,
                  textColor: '#002570',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              } else if ( response?.data?.status === 400 ) {
                Snackbar.show( {
                  text: `${ response?.data?.message }`,
                  textColor: 'red',
                  numberOfLines: 1,
                  backgroundColor: '#fff',
                } );
              }
            } )
            .catch( error => {
              setLoading( false );
            } );
        },

        logout: async () => {
          try {
            setFetching( { type: 'setLoading', value: true } );
            await AsyncStorage.getItem( 'userToken' ).then( value =>
              console.log( value, 'is being logged out' ),
            );
            await AsyncStorage.removeItem( 'userToken' );
            setUserToken( null );
            setFetching( { type: 'setLoading', value: false } );
          } catch ( e ) {
            setFetching( { type: 'setLoading', value: false } );
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

// generate new debug.keystore ---
// keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
// see sha1 key --
// keytool -exportcert -keystore ./android/app/debug.keystore -list -v
