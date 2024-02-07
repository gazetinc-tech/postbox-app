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

const MessageScreen = ({route}) => {
  const nav = useNavigation();
  const [select, SetSelect] = useState('1');
  const [number, onChangeNumber] = useState('');
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          margin: moderateScale(20),
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FastImage
            source={require('../image/SHiV.png')}
            style={{height: moderateScale(40), width: moderateScale(40)}}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: '#000',
                fontSize: moderateScale(16),
                fontFamily: 'AvenirMedium',
              }}>
              Khushi Kapoor
            </Text>
            <Text
              style={{
                color: '#611EBD',
                fontSize: moderateScale(12),
                fontFamily: 'AvenirMedium',
              }}>
              Last seen 69:69 AM
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../image/Line.png')}
            style={{height: moderateScale(40), width: moderateScale(40)}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{backgroundColor: '#E6EEFA', padding: moderateScale(20)}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
            borderBottomRightRadius: moderateScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
            maxWidth: '75%',
            minWidth: '40%',
            padding: moderateScale(20),
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: moderateScale(16),
              fontFamily: 'AvenirMedium',
            }}>
            Hi! How are you?
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#611EBD',
            borderTopLeftRadius: moderateScale(20),
            borderTopRightRadius: moderateScale(20),
            borderBottomLeftRadius: moderateScale(20),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            maxWidth: '75%',
            minWidth: '40%',
            padding: moderateScale(20),
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: moderateScale(16),
              fontFamily: 'AvenirMedium',
            }}>
            I’m good and you?
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E6EEFA',
          paddingVertical: moderateScale(15),
        }}>
        <TextInput
          style={styles.input}
          onChangeText={e => onChangeNumber(e)}
          value={number}
          placeholder="Type youe Message"
          keyboardType="email-address"
        />
        <TouchableOpacity>
          <FastImage
            source={require('../image/SentButton.png')}
            style={{
              height: moderateScale(40),
              width: moderateScale(40),
              marginLeft: moderateScale(5),
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageScreen;
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
