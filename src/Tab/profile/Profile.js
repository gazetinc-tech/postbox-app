// import React from 'react';
// import { View, Text } from 'react-native';
// import Header from '../../../../comp/Header';

// export default function Profile ( { navigation } ) {
// 	return (
// 		<View style={{flex:1, backgroundColor:'#E6EEFA'}}>
// 			<Header
// 				navigation={navigation}
// 				label={'My Profile'}
// 			/>
// 			<View style={{flex:1}}>


// 			</View>
// 		</View>
// 	);
// }

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { 
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Platform,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../../utils/overAllNormalization';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from '../../Navigation/AuthProvider';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import { Button, Actionsheet, useDisclose, Center } from 'native-base';

const EditProfile = ( { route } ) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const nav = useNavigation();
  const { profile, token } = useSelector( state => state?.userReducer );

  const [ firstName, setFirstName ] = useState( '' );
  const [ lastName, setLastName ] = useState( '' );

  useEffect( () => {
    if ( profile?.name !== '' && profile?.name !== undefined && profile?.name.length > 0 ) {
      var varString = profile?.name;
      let parts = varString.split( ' ' );

      let part1 = parts.shift(); // Remove and get the first element
      let part2 = parts.join( ' ' );
      setFirstName( part1 );
      setLastName( part2 )
    }
  }, [ profile ] )




  const initialState = {
    firstName: '',
    lastName: '',
    name: profile?.name ? profile?.name : '',
    country: profile?.country ? profile?.country : '',
    state: profile?.state ? profile?.state : '',
    city: profile?.city ? profile?.city : '',
    mandal: profile?.mandal ? profile?.mandal : '',
    village: profile?.village ? profile?.village : '',
    bio: profile?.bio ? profile?.bio : '',
  };

  const [ profiles, setProfiles ] = useState( initialState );
  const [ open, setOpen ] = useState( false );
  const [ value, setValue ] = useState(
    profile?.gender === 1 ? 'male' : profile?.gender === 1 ? 'female' : 'other',
  );
  const [ items, setItems ] = useState( [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ] );

  const [ image, setImage ] = useState( profile?.avatar ? profile?.avatar : '' );
  const [ mime, setMime ] = useState( '' );
  const [ fname, setFname ] = useState( '' );
  const [ loading, setLoading ] = useState( false );
  const { BaseUrl } = React.useContext( AuthContext );

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
    form.append(
      'gender',
      value === 'male' ? '1' : value === 'female' ? '2' : '3',
    );
    form.append( 'country', profiles?.country );
    form.append( 'state', profiles?.state );
    form.append( 'city', profiles?.city );
    form.append( 'mandal', profiles?.mandal );
    form.append( 'village', profiles?.village );
    form.append( 'bio', profiles?.bio );
    // form.append('avatar', upload);
    if ( mime !== '' ) {
      form.append( 'avatar', {
        uri: image,
        type: mime,
        name: fname,
      } );
    }
    console?.log( form, 'form', token, `${ BaseUrl }/complete-profile` );

    await axios
      .post( BaseUrl + '/edit-profile', form, {
        headers: {
          Authorization: `Bearer ${ token }`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      } )
      .then( response => {
        console.log( response?.data, 'vvvvvvvvvvvv' );
        setLoading( false );
        if ( response?.data?.message === 'updated successfully' ) {
          setLoading( false );
          nav.goBack( null );
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
  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <FastImage
          source={require( '../../image/Allowleft.png' )}
          style={{
            height: moderateScale( 50 ),
            width: moderateScale( 50 ),
            marginTop: moderateScale( 20 ),
            marginLeft: moderateScale( 20 ),
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
      <View style={{}}>
        <TouchableOpacity
          onPress={onOpen}
          style={{
            height: moderateScale( 25 ),
            width: moderateScale( 25 ),
            alignSelf: 'center',
            left: '57%',
            zIndex: 10000,
            // marginTop:moderateScale(40),
            position: 'absolute',
          }}>
          <FastImage
            source={require( '../../image/PencilSimple.png' )}
            style={{
              height: moderateScale( 25 ),
              width: moderateScale( 25 ),
            }}
          />
        </TouchableOpacity>
        <FastImage
          source={{ uri: image }}
          style={{
            height: moderateScale( 100 ),
            width: moderateScale( 100 ),
            alignSelf: 'center',
            borderRadius: moderateScale( 50 ),
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: moderateScale( 20 ),
          marginTop: moderateScale( 15 ),
          paddingBottom: moderateScale( 60 ),
        }}>
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your First Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setFirstName( text )}
          value={firstName}
          placeholder="First Name"
          keyboardType="email-address"
        />

        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your Last Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setLastName( text )}
          value={lastName}
          placeholder="Last Name"
          keyboardType="email-address"
        />





        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your Gender
        </Text>
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
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your Country
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles( { ...profiles, country: text } )}
          value={profiles?.country}
          placeholder="Type your Country"
          keyboardType="email-address"
        />
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your State
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles( { ...profiles, state: text } )}
          value={profiles?.state}
          placeholder="Type your City"
          keyboardType="email-address"
        />
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your City
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles( { ...profiles, city: text } )}
          value={profiles?.city}
          placeholder="Type your City"
          keyboardType="email-address"
        />

        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your Mandal (India Only)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles( { ...profiles, mandal: text } )}
          value={profiles?.mandal}
          placeholder="Type your Mandal"
          keyboardType="email-address"
        />

        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Edit Your Village (India Only)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles( { ...profiles, village: text } )}
          value={profiles?.village}
          placeholder="Type your Village"
          keyboardType="email-address"
        />
        {/* 
        <Text
          style={{
            fontSize: moderateScale(16),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale(5),
          }}>
          Edit Your Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setProfiles({...profiles, country: text})}
          value={profiles?.country}
          placeholder="Type your Email"
          keyboardType="email-address"
        /> */}
        <Text
          style={{
            fontSize: moderateScale( 16 ),
            color: '#000',
            fontFamily: 'AvenirMedium',
            marginBottom: moderateScale( 5 ),
          }}>
          Add Bio
        </Text>
        <TextInput
          style={styles.inputText}
          onChangeText={text => setProfiles( { ...profiles, bio: text } )}
          value={profiles?.bio}
          multiline
          numberOfLines={3}
          maxLength={300}
          placeholder="Enter Your Bio"
          keyboardType="default"
          placeholderTextColor={'#737373'}
        />
      </ScrollView>
      {loading ? (
        <TouchableOpacity
          disabled
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
      ) : (
        <TouchableOpacity
          onPress={() => {
            AddOutFitType();
          }}
          style={{
            backgroundColor: '#611EBD',
            borderRadius: moderateScale( 20 ),
            justifyContent: 'center',
            alignItems: 'center',
            height: moderateScale( 50 ),
            margin: moderateScale( 20 ),
          }}>
          <Text
            style={{
              fontSize: moderateScale( 16 ),
              color: '#fff',
              fontFamily: 'AvenirMedium',
            }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      )}
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

export default EditProfile;
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
  inputText: {
    borderWidth: moderateScale( 1 ),
    padding: moderateScale( 12 ),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale( 15 ),
    color: '#262626',
    textAlign: 'left',
    textAlignVertical: 'top', // Set to 'top' to align text at the top
    height: moderateScale( 100 ),
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
} );
