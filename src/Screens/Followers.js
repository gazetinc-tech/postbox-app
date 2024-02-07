/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../Navigation/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
const Followers = ({userSearch}) => {
  const nav = useNavigation();
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const {BaseUrl} = React.useContext(AuthContext);
  const {token} = useSelector(state => state?.userReducer);
  const [follower, setFollower] = useState([]);
  const getFollowing = id => {
    try {
      axios
        .get(BaseUrl + `/toggle-follow?cust_id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // console.log(response?.data, 'GetUserDetails');
          if (response?.data?.status === 200) {
            getUser(userSearch?.id);
            Snackbar.show({
              text: `${response?.data?.message}`,
              textColor: 'green',
              numberOfLines: 1,
              backgroundColor: '#fff',
            });
          }
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  React.useEffect(() => {
    getUser(userSearch?.id);
  }, []);
  const getUser = id => {
    try {
      axios
        .get(BaseUrl + `/get-followers?user_id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response?.status === 200) {
            console.log(response?.data, 'resp users');
            setFollower(response?.data?.followers);
          }
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      {follower.length > 0 ? (
        <FlatList
          data={follower}
          keyExtractor={(i, j) => j}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={{uri: item?.avatar}}
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
                    <Text
                      style={{
                        fontSize: moderateScale(12),
                        color: '#687684',
                        fontFamily: 'AvenirMedium',
                      }}>
                      {item?.state}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    getFollowing(item?.id);
                  }}
                  style={{
                    backgroundColor: '#611EBD',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      color: '#fff',
                      fontFamily: 'AvenirMedium',
                      paddingHorizontal: moderateScale(25),
                      paddingVertical: moderateScale(6),
                    }}>
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: moderateScale(12),
              color: '#687684',
              fontFamily: 'AvenirMedium',
            }}>
            Followers No Found
          </Text>
        </View>
      )}
    </View>
  );
};

export default Followers;
const styles = StyleSheet.create({
  input: {
    height: moderateScale(50),
    marginBottom: moderateScale(10),
    borderWidth: moderateScale(1),
    padding: moderateScale(10),
    borderColor: '#c4c4c4',
    borderRadius: moderateScale(15),
  },
});
