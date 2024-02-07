import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import { useNavigation } from '@react-navigation/native';

const OtherProfile = ({route}) => {
const nav = useNavigation()
  const [select, SetSelect] = useState('1');
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
        <TouchableOpacity onPress={() => nav.goBack()} >
      <FastImage
        source={require('../image/Allowleft.png')}
        style={{
          height: moderateScale(50),
          width: moderateScale(50),
          marginTop: moderateScale(20),
          marginLeft: moderateScale(20),
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      </TouchableOpacity>

      <View
        style={{
          backgroundColor: '#E6EEFA',
          width: '90%',
          height: '85%',
          position: 'absolute',
          zIndex: 1000,
          bottom: moderateScale(0),
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          //   padding: moderateScale(20),
          alignSelf: 'center',
        }}>
        <FastImage
          source={require('../image/SHiV.png')}
          style={{
            height: moderateScale(100),
            width: moderateScale(100),
            alignSelf: 'center',
            marginTop: moderateScale(-50),
            zIndex: 10000,
          }}
        />
        <FastImage
          source={require('../image/PencilSimple.png')}
          style={{
            height: moderateScale(25),
            width: moderateScale(25),
            alignSelf: 'center',
            marginTop: moderateScale(-110),
            marginLeft: moderateScale(80),
            zIndex: 10000,
          }}
        />
        <ScrollView
          style={{
            marginTop: moderateScale(40),
            paddingHorizontal: moderateScale(20),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity  onPress={() => nav.navigate('FollowPage')} style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'AvenirHeavy',
                  fontSize: moderateScale(15),
                  color: '#000',
                }}>
                69
              </Text>
              <Text
                style={{
                  fontFamily: 'AvenirMedium',
                  fontSize: moderateScale(13),
                  color: '#000',
                }}>
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nav.navigate('FollowPage')} style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'AvenirHeavy',
                  fontSize: moderateScale(15),
                  color: '#000',
                }}>
                69
              </Text>
              <Text
                style={{
                  fontFamily: 'AvenirMedium',
                  fontSize: moderateScale(13),
                  color: '#000',
                }}>
                Following
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'AvenirHeavy',
              fontSize: moderateScale(15),
              color: '#000',
              alignSelf: 'center',
              marginTop: moderateScale(20),
            }}>
            Nabarun
          </Text>
          <Text
            style={{
              fontFamily: 'AvenirMedium',
              fontSize: moderateScale(13),
              color: '#000',
              textAlign: 'center',
              margin: moderateScale(15),
            }}>
            My name is SHiV. I love designing and creating user experiences like
            never before.
          </Text>
          <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row",}}>
          <TouchableOpacity
          onPress={() => nav.navigate('EditProfile')}
            style={{
              backgroundColor: '#611EBD',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: moderateScale(15),
            //   marginRight:moderateScale(20)
            }}>
            <Text
              style={{
                fontFamily: 'AvenirHeavy',
                fontSize: moderateScale(12),
                color: '#fff',
                alignSelf: 'center',
                paddingHorizontal: moderateScale(30),
                paddingVertical: moderateScale(10),
              }}>
              Follow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: moderateScale(15),
              marginLeft:moderateScale(15)
            }}>
            <Text
              style={{
                fontFamily: 'AvenirHeavy',
                fontSize: moderateScale(12),
                color: '#000',
                alignSelf: 'center',
                paddingHorizontal: moderateScale(30),
                paddingVertical: moderateScale(10),
                marginLeft:moderateScale(10)
              }}>
              Message
            </Text>
          </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: moderateScale(15),
            }}>
            <TouchableOpacity
              onPress={() => SetSelect('1')}
              style={{
                // width: moderateScale(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: select === '1' ? moderateScale(1) : 0,
                borderBottomColor: select === '1' ? '#000' : '#c4c4c4',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: select === '1' ? '#611EBD' : '#000',
                  fontFamily: 'AvenirMedium',
                  paddingBottom: moderateScale(5),
                }}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SetSelect('2')}
              style={{
                // width: moderateScale(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: select === '2' ? moderateScale(1) : 0,
                borderBottomColor: select === '2' ? '#000' : '#c4c4c4',
                marginHorizontal: moderateScale(30),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: select === '2' ? '#611EBD' : '#000',
                  fontFamily: 'AvenirMedium',
                  paddingBottom: moderateScale(5),
                }}>
                Photos
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => SetSelect('3')}
              style={{
                // width: moderateScale(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: select === '3' ? moderateScale(1) : 0,
                borderBottomColor: select === '3' ? '#000' : '#c4c4c4',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: select === '3' ? '#611EBD' : '#000',
                  fontFamily: 'AvenirMedium',
                  paddingBottom: moderateScale(5),
                }}>
                Videos
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              padding: moderateScale(10),
              borderTopLeftRadius: moderateScale(30),
              borderTopRightRadius: moderateScale(30),
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: moderateScale(10),
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              padding: moderateScale(10),
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              source={require('../image/VLy9IPyH3s.png')}
              style={{height: moderateScale(80), width: moderateScale(80)}}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OtherProfile;
const styles = StyleSheet.create({});
