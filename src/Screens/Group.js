import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';

const Group = ({route}) => {
  const nav = useNavigation();
  const [select, SetSelect] = useState('1');
  const [number, onChangeNumber] = useState('');
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: moderateScale(20),
          left: moderateScale(20),
        }}
        onPress={() => nav.goBack()}>
        <FastImage
          source={require('../image/Allowleft.png')}
          style={{
            height: moderateScale(50),
            width: moderateScale(50),
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: moderateScale(35),
        }}
        onPress={() => nav.goBack()}>
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: 'AvenirHeavy',
            color: '#000',
          }}>
          Inbox
        </Text>
      </TouchableOpacity>

      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: moderateScale(20),
        }}>
        <TouchableOpacity
          onPress={() => SetSelect('1')}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:
              select === '1' ? moderateScale(3) : moderateScale(1),
            borderBottomColor: select === '1' ? '#611EBD' : '#687684',
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: select === '1' ? '#611EBD' : '#687684',
              fontFamily: 'AvenirMedium',
              paddingBottom: moderateScale(5),
            }}>
            My Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SetSelect('2')}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth:
              select === '2' ? moderateScale(3) : moderateScale(1),
            borderBottomColor: select === '2' ? '#611EBD' : '#687684',
          }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: select === '2' ? '#611EBD' : '#687684',
              fontFamily: 'AvenirMedium',
              paddingBottom: moderateScale(5),
            }}>
            Discover
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{backgroundColor: '#E6EEFA'}}>
        {select === '1' ? (
          <TouchableOpacity onPress={() => nav.navigate('GroupChats')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: moderateScale(20),
              // marginTop: moderateScale(20),
              backgroundColor: '#fff',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{flexDirection: 'column', marginLeft: moderateScale(5)}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: '#000',
                    fontFamily: 'AvenirMedium',
                  }}>
                  Techninza Team
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(19),
                    color: '#000',
                    fontFamily: 'AvenirMedium',
                  }}>
                  Announcement
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: '#687684',
                    fontFamily: 'AvenirMedium',
                  }}>
                  69 People
                </Text>
              </View>
            </View>
            <FastImage
              source={require('../image/Group691.png')}
              style={{height: moderateScale(60), width: moderateScale(60)}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={() => nav.navigate('GroupChats')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: moderateScale(20),
              // marginTop: moderateScale(20),
              backgroundColor: '#fff',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{flexDirection: 'column', marginLeft: moderateScale(5)}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: '#000',
                    fontFamily: 'AvenirMedium',
                  }}>
                  Techninza Team
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(19),
                    color: '#000',
                    fontFamily: 'AvenirMedium',
                  }}>
                  Announcement
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    color: '#687684',
                    fontFamily: 'AvenirMedium',
                  }}>
                  69 People
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#611EBD',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: moderateScale(15),
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
                Join
              </Text>
            </TouchableOpacity>
            <FastImage
              source={require('../image/Group691.png')}
              style={{height: moderateScale(60), width: moderateScale(60)}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Group;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(40),
    // marginHorizontal: moderateScale(7),
    color: '#000',
    fontSize: moderateScale(14),
    paddingHorizontal: moderateScale(10),
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: moderateScale(15),
  },
});
