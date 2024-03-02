/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../utils/overAllNormalization';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import { AuthContext } from '../Navigation/AuthProvider';
import { Button, Actionsheet, useDisclose, Center } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { updateUserDetails } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

const CompleteProfile = ( { route } ) => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();


  const initialState = {
    name: '',
    gender: '',
    avatar: '',
    country: '',
    state: '',
    city: '',
    mandal: '',
    village: '',
  };
  const [ profile, setProfile ] = useState( initialState );
  const [ loading, setLoading ] = useState( false );
  const { userToken, logout, BaseUrl } = React.useContext( AuthContext );
  const { isOpen, onOpen, onClose } = useDisclose();
  const [ open, setOpen ] = useState( false );
  const [ value, setValue ] = useState( null );
  const [ image, setImage ] = useState( '' );
  const [ mime, setMime ] = useState( '' );
  const [ fname, setFname ] = useState( '' );
  const [ firstName, setFirstName ] = useState( '' );
  const [ lastName, setLastName ] = useState( '' );

  useEffect( () => {
    setProfile( initialState );
    setFirstName( '' );
    setLastName( '' )

  }, [ isFocused ] )

  const [ items, setItems ] = useState( [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
  ] );


  const takePhotoFromCamera = () => {
    ImagePicker.openCamera( {
      mediaType: 'photo',
      cropping: true,
    } ).then( img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split( '/' ).pop();
      setMime( img.mime );
      setFname( fName );
      setImage( Uri );
    } );
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker( {
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    } ).then( img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split( '/' ).pop();
      setMime( img.mime );
      setFname( fName );
      setImage( Uri );
    } );
  };

  const AddOutFitType = async () => {
    setLoading( true );
    var form = new FormData();
    form.append( 'name', firstName + ' ' + lastName );
    form.append( 'gender', value );
    form.append( 'country', profile?.country );
    form.append( 'state', profile?.state );
    form.append( 'city', profile?.city );
    form.append( 'mandal', profile?.mandal );
    form.append( 'village', profile?.village );
    // form.append('avatar', upload);
    form.append( 'avatar', {
      uri: image,
      type: mime,
      name: fname,
    } );
    console?.log( form, 'form', userToken, `${ BaseUrl }/complete-profile` );

    await axios
      .post( BaseUrl + '/complete-profile', form, {
        headers: {
          Authorization: `Bearer ${ userToken }`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      } )
      .then( response => {
        console.log( response?.data, 'vvvvvvvvvvvv' );
        setLoading( false );
        if ( response?.data?.message === 'Profile completion successful' ) {
          setLoading( false );
          dispatch(
            updateUserDetails( {
              isLogin: true,
            } ),
          );

          Snackbar.show( {
            text: `${ response?.data?.message }`,
            textColor: 'green',
            numberOfLines: 1,
            backgroundColor: '#fff',
          } );
          //   navigation.goBack();
        }
      } )
      .catch( error => {
        setLoading( false );
        if ( error ) {
          console?.log( error, 'vvvvvvvvvvvv' );
          Snackbar.show( {
            text: `Something Went Wrong`,
            textColor: 'red',
            numberOfLines: 1,
            backgroundColor: '#fff',
          } );
        }
      } );
  };

  const onSubmit = () => {
    if ( image === '' ) {
      return Snackbar.show( {
        text: `Select Profile Picture`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( firstName === '' ) {
      return Snackbar.show( {
        text: `Enter First Name`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( lastName === '' ) {
      return Snackbar.show( {
        text: `Enter Last Name`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( value === null ) {
      return Snackbar.show( {
        text: `Choose a gender`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( profile?.country === '' ) {
      return Snackbar.show( {
        text: `Enter Your country`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( profile?.state === '' ) {
      return Snackbar.show( {
        text: `Enter Your State`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( profile?.city === '' ) {
      return Snackbar.show( {
        text: `Enter Your City`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( profile?.mandal === '' ) {
      return Snackbar.show( {
        text: `Enter Your Local Area`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else if ( profile?.village === '' ) {
      return Snackbar.show( {
        text: `Enter Your City Name`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      } );
    } else {
      AddOutFitType();
    }
  };

  useEffect( () => {
    if ( route?.params?.token !== undefined ) {
      var token = route?.params?.token;
      var user = route?.params?.user;
      console.log( 'token:::::::::::::::1', token )
      console.log( 'user:::::::::::::::2', user )
      dispatch(
        updateUserDetails( {
          token: token,
        } ),
      );
      setFirstName( user?.givenName );
      setLastName( user?.familyName );

    }

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem( 'user' );
        var abc = jsonValue != null ? JSON.parse( jsonValue ) : null;
        if ( abc ) {
          console.log( 'userDAta::::::::::::::::::::::::::::1', abc );
          setFirstName( abc?.firstName )
          setLastName( abc?.lastName )
        }
      } catch ( e ) {

      }
    };

    getData();
    requestLocationPermission();


    // 
    const getUser = () => {
      setLoading( true );
      try {
        axios
          .get( BaseUrl + '/profile', {
            headers: {
              Authorization: `Bearer ${ token }`,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          } )
          .then( response => {
            setLoading( false );
            if ( response?.status === 200 ) {
              console.log( response?.data?.user, 'resp:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::' );
              dispatch(
                updateUserDetails( {
                  profile: response?.data?.user,
                  isLogin: true,
                } ),
              );
              if ( response?.data?.user?.avatar ) {

              }
            }
          } );
      } catch ( error ) {
        setLoading( false );
        console.log( error, 'error' );
      }
    };

    getUser();

  }, [ isFocused, route ] )


  // lcoaiton
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      console.log( 'granted:::::::', granted );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        console.log( 'You can use the Location' );
        getAndroidLocation();
      }
      if ( granted.toLocaleLowerCase() === 'location permission denied' ) {
        // setMessage( 'Please turn on device location' );
        // setNormalModal( true )
        console.log( 'permission denied::::::::::::::' )
      }
    } catch ( err ) {
      console.warn( 'err:::::', err );
    }
  };

  // maps
  var MapApiKey = 'AIzaSyAyu-6Pv7RaiohWH1bWpQqwXbx7roNG_GA';
  // var GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';



  // Initialize the module (needs to be done only once)
  Geocoder.init( MapApiKey ); // use a valid API key

  const getAndroidLocation = async () => {
    console.log( 'hi::::::::::' );
    // setIsLocationModalVisible( false );
    console.log( 'hi:::::::::: 1' );

    Geolocation.getCurrentPosition(
      ( pos ) => {
        console.log( 'pos:::::', pos );
        // {"coords": {"accuracy": 92.9000015258789, "altitude": 201.5, "heading": 0, "latitude": 28.3909772, "longitude": 77.0495543, "speed": 0}, "extras": {"networkLocationType": "wifi"}, "mocked": false, "timestamp": 1708972475725}

        var lat = pos?.coords?.latitude;
        var long = pos?.coords?.longitude;
        console.log( lat, long );
        updateAddress( lat, long );
      },
      ( error ) => {
        JSON.stringify( error )
        console.log( 'hi::::::::::3', error );
        if ( error?.message.toLowerCase() === 'no location provider available.' ) {
          console.log( 'Hi::::::::::zz' )
          setMessage( 'Please turn on device location' );
          setNormalModal( true )
        }
      } );
  };



  // converting the lat long to the address
  async function updateAddress ( latitude, longitude ) {
    try {
      const response = await Geocoder.from( latitude, longitude );
      const address = response.results[ 0 ].formatted_address;

      // Extract components from the address
      const addressComponents = response.results[ 0 ].address_components;
      let city, state, country;

      for ( let i = 0; i < addressComponents.length; i++ ) {
        const component = addressComponents[ i ];

        if ( component.types.includes( 'locality' ) ) {
          city = component.long_name;
        } else if ( component.types.includes( 'administrative_area_level_1' ) ) {
          state = component.long_name;
        } else if ( component.types.includes( 'country' ) ) {
          country = component.long_name;
        }
      }

      //   name: '',
      // gender: '',
      // avatar: '',
      // country: '',
      // state: '',
      // city: '',
      // mandal: '',
      // village: '',
      console.log( 'City:', city );
      console.log( 'State:', state );
      console.log( 'Country:', country );
      setProfile( { ...profile, city: city, state: state, country: country } );

      // return { city, state, country };
    } catch ( error ) {
      console.error( 'Error getting address:', error );
      return null;
    }
  }


  return (
    <View style={{ backgroundColor: '#611EBD', flex: 1 }}>
      <Text
        style={{
          color: '#fff',
          fontSize: moderateScale( 26 ),
          fontFamily: 'AvenirMedium',
          textAlign: 'center',
          marginTop: moderateScale( 20 ),
        }}>
        Complete Your Profile
      </Text>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          position: 'absolute',
          height: '85%',
          zIndex: 1000,
          bottom: moderateScale( 0 ),
          borderTopLeftRadius: moderateScale( 40 ),
          borderTopRightRadius: moderateScale( 40 ),
          padding: moderateScale( 20 ),
        }}>
        <ScrollView
          contentContainerStyle={{ marginHorizontal: moderateScale( 20 ) }}>
          {!image ? (
            <View>
              <FastImage
                source={require( '../image/AddImage.png' )}
                style={{
                  height: moderateScale( 170 ),
                  width: moderateScale( 170 ),
                  alignSelf: 'center',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <TouchableOpacity onPress={onOpen} style={styles.boxIcon}>
                <Image
                  source={require( '../image/camera.png' )}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <FastImage
                source={{ uri: image }}
                style={{
                  height: moderateScale( 170 ),
                  width: moderateScale( 170 ),
                  alignSelf: 'center',
                  borderRadius: moderateScale( 100 ),
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <TouchableOpacity onPress={onOpen} style={styles.boxIcon}>
                <Image
                  source={require( '../image/camera.png' )}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}


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
            // onChangeText={e => onChangeNumber(e)}
            onChangeText={text => setFirstName( text )}
            value={firstName}
            placeholder="First Name"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
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
            // onChangeText={e => onChangeNumber(e)}
            onChangeText={text => setLastName( text )}
            value={lastName}
            placeholder="Last Name"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />


          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Gender
          </Text>
          {/* <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, gender: text})}
            value={profile?.gender}
            placeholder="Type your gender"
            keyboardType="email-address"
          /> */}
          <DropDownPicker
            style={styles.input}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose a gender.'}
          />
          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Country
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile( { ...profile, country: text } )}
            value={profile?.country}
            placeholder="Type your country"
            placeholderTextColor={'#8B8A8A'}
          />

          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your State
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile( { ...profile, state: text } )}
            value={profile?.state}
            placeholder="Type your State"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your City
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile( { ...profile, city: text } )}
            value={profile?.city}
            placeholder="Type your City"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Local (India Only)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile( { ...profile, mandal: text } )}
            value={profile?.mandal}
            placeholder="Type your Local Area"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Village (India Only)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile( { ...profile, village: text } )}
            value={profile?.village}
            placeholder="Type your City Name"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
        </ScrollView>
        {!loading ? (
          <TouchableOpacity
            onPress={() => {
              onSubmit();
            }}
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
              Continue
            </Text>
          </TouchableOpacity>
        ) : (
          <View
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
          </View>
        )}
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{ width: '100%' }}>
          <Center style={{ width: '100%' }}>
            <Text style={styles.uploadText}>Upload Photo</Text>
            <Text style={styles.chooseText}>Choose your profile Picture </Text>
            <Button
              style={styles.btnCamera}
              onPress={() => {
                takePhotoFromCamera();
                onClose();
              }}>
              Take Photo
            </Button>
            <Button
              style={styles.btnCamera}
              onPress={() => {
                choosePhotoFromLibrary();
                onClose();
              }}>
              Choose From Library
            </Button>
            {/* <Button style={styles.btnCamera} onPress={onClose}>
              Cancel
            </Button> */}
          </Center>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default CompleteProfile;
const styles = StyleSheet.create( {
  input: {
    height: moderateScale( 50 ),
    marginBottom: moderateScale( 20 ),
    borderWidth: moderateScale( 1 ),
    padding: moderateScale( 10 ),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale( 15 ),
    color: '#262626',
  },
  btnCamera: {
    backgroundColor: '#611EBD',
    width: '90%',
    margin: moderateScale( 10 ),
    height: moderateScale( 50 ),
    borderRadius: 10,
  },
  uploadText: {
    color: '#262626',
    fontSize: moderateScale( 25 ),
    fontWeight: '600',
  },
  chooseText: {
    color: '#757474',
    fontSize: moderateScale( 14 ),
    fontWeight: '400',
    marginBottom: moderateScale( 10 ),
  },
  icon: {
    width: moderateScale( 20 ),
    height: moderateScale( 20 ),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },
  boxIcon: {
    backgroundColor: '#611EBD',
    padding: moderateScale( 8 ),
    position: 'absolute',
    borderRadius: moderateScale( 50 ),
    bottom: 0,
    right: '30%',
  },
} );
