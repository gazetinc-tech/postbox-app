/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import {AuthContext} from '../Navigation/AuthProvider';
import {Button, Actionsheet, useDisclose, Center} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {updateUserDetails} from '../../redux/reducers/userReducer';
import {useDispatch} from 'react-redux';

const CompleteProfile = ({route}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();

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
  const [profile, setProfile] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const {userToken, logout, BaseUrl} = React.useContext(AuthContext);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [image, setImage] = useState('');
  const [mime, setMime] = useState('');
  const [fname, setFname] = useState('');
  const [items, setItems] = useState([
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
    {label: 'Other', value: '3'},
  ]);
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    }).then(img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split('/').pop();
      setMime(img.mime);
      setFname(fName);
      setImage(Uri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split('/').pop();
      setMime(img.mime);
      setFname(fName);
      setImage(Uri);
    });
  };

  const AddOutFitType = async () => {
    setLoading(true);
    var form = new FormData();
    form.append('name', profile?.name);
    form.append('gender', value);
    form.append('country', profile?.country);
    form.append('state', profile?.state);
    form.append('city', profile?.city);
    form.append('mandal', profile?.mandal);
    form.append('village', profile?.village);
    // form.append('avatar', upload);
    form.append('avatar', {
      uri: image,
      type: mime,
      name: fname,
    });
    console?.log(form, 'form', userToken, `${BaseUrl}/complete-profile`);

    await axios
      .post(BaseUrl + '/complete-profile', form, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response?.data, 'vvvvvvvvvvvv');
        setLoading(false);
        if (response?.data?.message === 'Profile completion successful') {
          setLoading(false);
          dispatch(
            updateUserDetails({
              isLogin: true,
            }),
          );
          Snackbar.show({
            text: `${response?.data?.message}`,
            textColor: 'green',
            numberOfLines: 1,
            backgroundColor: '#fff',
          });
          //   navigation.goBack();
        }
      })
      .catch(error => {
        setLoading(false);
        if (error) {
          console?.log(error, 'vvvvvvvvvvvv');
          Snackbar.show({
            text: `Something Went Wrong`,
            textColor: 'red',
            numberOfLines: 1,
            backgroundColor: '#fff',
          });
        }
      });
  };
  const onSubmit = () => {
    if (image === '') {
      return Snackbar.show({
        text: `Select Profile Picture`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.name === '') {
      return Snackbar.show({
        text: `Enter Name`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (value === null) {
      return Snackbar.show({
        text: `Choose a gender`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.country === '') {
      return Snackbar.show({
        text: `Enter Your country`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.state === '') {
      return Snackbar.show({
        text: `Enter Your State`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.city === '') {
      return Snackbar.show({
        text: `Enter Your City`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.mandal === '') {
      return Snackbar.show({
        text: `Enter Your Mandal`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else if (profile?.village === '') {
      return Snackbar.show({
        text: `Enter Your village`,
        textColor: 'red',
        numberOfLines: 1,
        backgroundColor: '#fff',
      });
    } else {
      AddOutFitType();
    }
  };
  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>
      <Text
        style={{
          color: '#fff',
          fontSize: moderateScale(26),
          fontFamily: 'AvenirMedium',
          textAlign: 'center',
          marginTop: moderateScale(20),
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
          bottom: moderateScale(0),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: moderateScale(20),
        }}>
        <ScrollView
          contentContainerStyle={{marginHorizontal: moderateScale(20)}}>
          {!image ? (
            <View>
              <FastImage
                source={require('../image/AddImage.png')}
                style={{
                  height: moderateScale(170),
                  width: moderateScale(170),
                  alignSelf: 'center',
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <TouchableOpacity onPress={onOpen} style={styles.boxIcon}>
                <Image
                  source={require('../image/camera.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <FastImage
                source={{uri: image}}
                style={{
                  height: moderateScale(170),
                  width: moderateScale(170),
                  alignSelf: 'center',
                  borderRadius: moderateScale(100),
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <TouchableOpacity onPress={onOpen} style={styles.boxIcon}>
                <Image
                  source={require('../image/camera.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Full Name
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={e => onChangeNumber(e)}
            onChangeText={text => setProfile({...profile, name: text})}
            value={profile?.name}
            placeholder="your name"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
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
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Country
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, country: text})}
            value={profile?.country}
            placeholder="Type your country"
            placeholderTextColor={'#8B8A8A'}
          />

          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your State
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, state: text})}
            value={profile?.state}
            placeholder="Type your State"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your City
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, city: text})}
            value={profile?.city}
            placeholder="Type your City"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Mandal (India Only)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, mandal: text})}
            value={profile?.mandal}
            placeholder="Type your mandal"
            keyboardType="email-address"
            placeholderTextColor={'#8B8A8A'}
          />
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#611EBD',
              fontFamily: 'AvenirMedium',
            }}>
            Your Village (India Only)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setProfile({...profile, village: text})}
            value={profile?.village}
            placeholder="Type your Village"
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
              marginTop: moderateScale(30),
              borderRadius: moderateScale(20),
              justifyContent: 'center',
              alignItems: 'center',
              height: moderateScale(50),
              marginBottom: moderateScale(20),
            }}>
            <Text
              style={{
                fontSize: moderateScale(16),
                color: '#fff',
                fontFamily: 'AvenirMedium',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: moderateScale(30),
              borderRadius: moderateScale(20),
              justifyContent: 'center',
              alignItems: 'center',
              height: moderateScale(50),
              marginBottom: moderateScale(20),
            }}>
            <ActivityIndicator
              size="large"
              color="#fff"
              style={{
                backgroundColor: '#611EBD',
                padding: moderateScale(10),
                borderRadius: moderateScale(50),
              }}
            />
          </View>
        )}
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{width: '100%'}}>
          <Center style={{width: '100%'}}>
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
const styles = StyleSheet.create({
  input: {
    height: moderateScale(50),
    marginBottom: moderateScale(20),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale(15),
    color: '#262626',
  },
  btnCamera: {
    backgroundColor: '#611EBD',
    width: '90%',
    margin: moderateScale(10),
    height: moderateScale(50),
    borderRadius: 10,
  },
  uploadText: {
    color: '#262626',
    fontSize: moderateScale(25),
    fontWeight: '600',
  },
  chooseText: {
    color: '#757474',
    fontSize: moderateScale(14),
    fontWeight: '400',
    marginBottom: moderateScale(10),
  },
  icon: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },
  boxIcon: {
    backgroundColor: '#611EBD',
    padding: moderateScale(8),
    position: 'absolute',
    borderRadius: moderateScale(50),
    bottom: 0,
    right: '30%',
  },
});
