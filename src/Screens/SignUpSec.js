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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { moderateScale } from '../utils/overAllNormalization';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {
  isValidEmail,
  isValidMobile,
  isValidName,
  isValidPassCPass,
} from './validation';
import { AuthContext } from '../Navigation/AuthProvider';
import { CountryPicker } from "react-native-country-codes-picker";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignUpSec = ( { route } ) => {
  const { signup, loading } = React.useContext( AuthContext );
  const nav = useNavigation();
  const isFocused = useIsFocused();

  const initialState = {
    firstName: '',
    lastName: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    cPassword: '',
  };

  const [ user, setUser ] = useState( initialState );
  const [ show, setShow ] = useState( false );
  const [ countryCode, setCountryCode ] = useState( '+91' );
  const [ countryData, setCountryData ] = useState( [] );



  const signUpUser = async () => {

    if ( !isValidName( user?.firstName ) ) {
      return Snackbar.show( {
        text: 'Please enter a valid First Name!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }
    if ( !isValidName( user?.lastName ) ) {
      return Snackbar.show( {
        text: 'Please enter a valid Last Name!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }

    setUser( { ...user, name: user?.firstName + ' ' + user?.lastName } );

    if ( user?.phone.length > 10 || user?.phone.length < 10 ) {
      return Snackbar.show( {
        text: 'Please enter a valid Phone Number!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }

    if ( !isValidEmail( user?.email ) ) {
      return Snackbar.show( {
        text: 'Please enter a valid Email!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }
    if ( !isValidPassCPass( user?.password, user?.cPassword ) ) {
      return Snackbar.show( {
        text: 'Please enter a same Password!!!',
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    }
    if (
      isValidName( user?.firstName ) &&
      isValidName( user?.lastName ) &&
      isValidEmail( user?.email ) &&
      isValidPassCPass( user?.password, user?.cPassword )
    ) {


      try {
        const jsonValue = JSON.stringify( user );
        console.log( 'users:::::::::::::::::::0', jsonValue, typeof jsonValue );
        await AsyncStorage.setItem( 'user', jsonValue );
        signup( user?.firstName, user?.lastName, user?.email, user?.password, nav, user?.phone, countryCode );

      } catch ( e ) {
        // saving error
      }

      // console.log( user?.firstName + user?.lastName )
    }
  };


  useEffect( () => {
    console.log( 'countryCode::::::::::', countryData )

    const storeData = async ( value ) => {
      try {
        const jsonValue = JSON.stringify( value );
        await AsyncStorage.setItem( 'country', jsonValue );
      } catch ( e ) {
        // saving error
      }
    };
    storeData( countryData )
  }, [ countryData ] )



  useEffect( () => {
    var data = { "code": "IN", "dial_code": "+91", "flag": "🇮🇳", "name": { "ar": "الهند", "bg": "Индия", "by": "Індыя", "cn": "印度", "cz": "Indie", "da": "Indien", "de": "Indien", "ee": "India", "el": "Ινδία", "en": "India", "es": "India", "fr": "Inde", "he": "הוֹדוּ", "it": "India", "jp": "インド", "nl": "India", "pl": "Indie", "pt": "Índia", "ro": "India", "ru": "Индия", "tr": "Hindistan", "ua": "Індія", "zh": "印度" } };
    setCountryCode( data?.dial_code );
    setCountryData( data );
  }, [ isFocused ] )


  return (
    <View style={{ flex: 1, marginTop: moderateScale( 0 ) }}>
      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Your First Name
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, firstName: text } )}
        value={user?.firstName}
        placeholder="First Name"
        keyboardType="email-address"
      />

      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Your Last Name
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, lastName: text } )}
        value={user?.lastName}
        placeholder="Last Name"
        keyboardType="email-address"
      />


      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Phone
      </Text>


      <View style={[ {
        height: moderateScale( 50 ),
        marginBottom: moderateScale( 10 ),
        borderWidth: moderateScale( 1 ),
        borderColor: '#c4c4c4',
        borderRadius: moderateScale( 15 ),
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: widthPercentageToDP( 3 ),
      } ]}>


        <View style={{
          width: widthPercentageToDP( 10 ),
          paddingLeft: widthPercentageToDP( 3 ),
          height: moderateScale( 50 ),
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={() => setShow( true )}
            style={{
              width: widthPercentageToDP( 15 )
            }}
          >
            <Text style={{
              color: '#262626',
              // fontSize: 20
            }}>
              {countryCode}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          // style={styles.input}
          style={{
            flex: 1,
            color: '#262626',
            // backgroundColor: 'red'
          }}
          onChangeText={text => setUser( { ...user, phone: text } )}
          value={user?.phone}
          placeholder="Type a phone number"
          keyboardType="phone-pad"
        />
      </View>


      {/* email */}
      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Your E-mail
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, email: text } )}
        value={user?.email}
        placeholder="Type your E-mail"
        keyboardType="default"
      />


      {/* password */}
      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Your Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, password: text } )}
        value={user?.password}
        placeholder="Type your Password"
        keyboardType="default"
        secureTextEntry={true}
      />

      {/*c  password */}
      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',
        }}>
        Confirm Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, cPassword: text } )}
        value={user?.cPassword}
        placeholder="Retype your password"
        keyboardType="default"
        secureTextEntry={true}
      />



      {!loading ? (
        <TouchableOpacity
          onPress={() => signUpUser()}
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
            Join Now
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
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
        style={{
          fontSize: moderateScale( 16 ),
          color: '#656F78',
          fontFamily: 'AvenirMedium',
          textAlign: 'center',
        }}>
        By Using this app you agree with the
      </Text>
      <Text
        style={{
          fontSize: moderateScale( 16 ),
          color: '#611EBD',
          fontFamily: 'AvenirMedium',

          textAlign: 'center',
        }}>
        Terms of Service
      </Text>




      <View style={{
        height: heightPercentageToDP( 50 ),
        width: widthPercentageToDP( 100 )
      }}>
        <CountryPicker
          onBackdropPress={() => setShow( false )}
          show={show}
          style={{
            modal: {
              color: '#262626',
              height: heightPercentageToDP( 50 ),
              width: widthPercentageToDP( 100 )
            },
            itemsList: {
              color: '#262626'
            },
            textInput: {
              color: '#262626',
              paddingLeft: widthPercentageToDP( 3 )
            },
            countryMessageContainer: {
              color: '#262626',
            },
            countryName: {
              color: '#262626',
            },
            dialCode: {
              color: '#262626',
            },
          }}
          // when picker button press you will get the country object with dial code
          pickerButtonOnPress={( item ) => {
            console.log( 'item::::::::::::::::', item )
            setCountryCode( item?.dial_code );
            setCountryData( item );
            setShow( false );
          }}
        />
      </View>
    </View>
  );
};

export default SignUpSec;
const styles = StyleSheet.create( {
  input: {
    height: moderateScale( 50 ),
    marginBottom: moderateScale( 10 ),
    borderWidth: moderateScale( 1 ),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale( 15 ),
    color: '#262626',
    padding: moderateScale( 10 ),
  },
} );
