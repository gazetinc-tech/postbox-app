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
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {
  isValidEmail,
  isValidMobile,
  isValidName,
  isValidPassCPass,
} from './validation';
import { AuthContext } from '../Navigation/AuthProvider';

const SignUpSec = ( { route } ) => {
  const { signup, loading } = React.useContext( AuthContext );
  const nav = useNavigation();

  const initialState = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    cPassword: '',
  };

  const [ user, setUser ] = useState( initialState );



  const signUpUser = () => {
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
      // console.log( user?.firstName + user?.lastName )
      signup( user?.firstName, user?.lastName, user?.email, user?.password, nav );
    }
  };


  // useEffect( () => {
  //   console.log( 'firstName::::::', user?.firstName );
  //   console.log( 'LastName::::::', user?.lastName )
  //   console.log( 'name::::::', user?.name )
  // }, [ user ] )

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
        Your E-mail
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUser( { ...user, email: text } )}
        value={user?.email}
        placeholder="Type your E-mail"
        keyboardType="default"
      />
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
    </View>
  );
};

export default SignUpSec;
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
} );
