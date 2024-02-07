/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../Navigation/AuthProvider';

const SearchScreen = ({route}) => {
  const {userToken, BaseUrl} = useContext(AuthContext);
  const nav = useNavigation();
  const [select, SetSelect] = useState('1');
  const [number, onChangeNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [number]);
  const fetchData = async token => {
    setLoading(true);
    const apiUrl = BaseUrl + `/search-users?term=${number}`;
    try {
      axios
        .get(apiUrl, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response?.status === 200) {
            console.log(response?.data?.users, 'resp');
            setUsers(response?.data?.users);
          }
        });
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity style={{}} onPress={() => nav.goBack()}>
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
            backgroundColor: '#E6EEFA',
            paddingHorizontal: moderateScale(10),
            marginHorizontal: moderateScale(40),
            borderRadius: moderateScale(20),
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: moderateScale(20),
          }}>
          <FastImage
            source={require('../image/TagSearch.png')}
            style={{
              height: moderateScale(20),
              width: moderateScale(20),
              marginRight: moderateScale(5),
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Search User"
            keyboardType="default"
            placeholderTextColor={'#000'}
          />
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: moderateScale(4),
          width: '100%',
          borderBottomColor: '#E6EEFA',
        }}></View>

      <FlatList
        data={users}
        keyExtractor={(i, j) => j}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: moderateScale(8),
                padding: moderateScale(5),
                borderBottomWidth: moderateScale(2),
                borderBottomColor: '#E6EEFA',
              }}>
              <TouchableOpacity
                onPress={() =>
                  nav.navigate('Myprofile', {key: 'search', user: item})
                }
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <FastImage
                  source={
                    item?.avatar
                      ? {uri: item?.avatar}
                      : require('../image/SHiV.png')
                  }
                  style={{
                    height: moderateScale(50),
                    width: moderateScale(50),
                    borderRadius: moderateScale(50),
                    marginRight: moderateScale(15),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      color: '#000',
                      fontFamily: 'AvenirMedium',
                    }}>
                    {item?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(40),
    margin: moderateScale(5),
    color: '#000',
    fontSize: moderateScale(14),
    padding: moderateScale(10),
    width: moderateScale(200),
  },
});
