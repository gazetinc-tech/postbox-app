/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Share,
  FlatList,
  TextInput,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../Navigation/AuthProvider';
import {updateUserDetails} from '../../redux/reducers/userReducer';
import {useIsFocused} from '@react-navigation/native';
import {Actionsheet, ScrollView, useDisclose} from 'native-base';
import Snackbar from 'react-native-snackbar';

const Myprofile = ({route}) => {
  const data = route?.params?.key;
  const userSearch = route?.params?.user;
  const [key, setKey] = useState(data ? data : '');
  const nav = useNavigation();
  const [select, SetSelect] = useState('1');
  const navigation = useNavigation();
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const {BaseUrl} = React.useContext(AuthContext);
  const {token} = useSelector(state => state?.userReducer);
  const [profileData, setProfileData] = useState({});
  const [allPost, setAllPost] = React.useState([]);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [search, setSearch] = React.useState('');
  const screenWidth = Dimensions.get('window').width;
  const [loading, setLoading] = useState(false);
  const shareContent = async () => {
    try {
      const result = await Share.share({
        title: 'Post-Box',
        message: 'Check out this awesome Post-Box app!',
        // url: 'https://example.com',
        // subject: 'Share Link',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share sheet dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  React.useEffect(() => {
    if (key === '') {
      getUser();
    } else {
      getOtherUser(userSearch?.id);
    }
  }, [focus]);
  const getUser = () => {
    setLoading(true);
    try {
      axios
        .get(BaseUrl + '/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          // console.log(response?.data, 'GetUserDetails');
          setLoading(false);

          if (response?.status === 200) {
            // console.log(response?.data?.user, 'resp');
            dispatch(
              updateUserDetails({
                profile: response?.data?.user,
              }),
            );
            setProfileData(response?.data?.user);
            getPost(response?.data?.user?.id);
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
    }
  };
  const getOtherUser = id => {
    setLoading(true);
    try {
      axios
        .get(BaseUrl + `/others-profile?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          setLoading(false);
          console.log(response?.data, 'GetUserDetails');
          if (response?.status === 200) {
            console.log(response?.data?.user, 'resp');
            setProfileData(response?.data?.user);
            getPost(response?.data?.user?.id);
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
    }
  };
  const getFollowing = id => {
    // setLoading(true);
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
          setLoading(false);
          if (response?.data?.status === 200) {
            getOtherUser(userSearch?.id);
            Snackbar.show({
              text: `${response?.data?.message}`,
              textColor: 'green',
              numberOfLines: 1,
              backgroundColor: '#fff',
            });
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error, 'error');
    }
  };
  const getPost = id => {
    try {
      axios
        .get(BaseUrl + `/get-user-posts?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          if (response?.status === 200) {
            // console.log(response?.data, 'resp');
            setAllPost(response?.data?.posts);
          }
        });
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={{padding: moderateScale(20)}}>
        <FastImage
          source={require('../image/Allowleft.png')}
          style={{
            height: moderateScale(50),
            width: moderateScale(50),
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#000000'} />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              backgroundColor: '#E6EEFA',
              width: '90%',
              height: '100%',
              marginTop: '15%',
              borderTopLeftRadius: moderateScale(40),
              borderTopRightRadius: moderateScale(40),
              //   padding: moderateScale(20),
              alignSelf: 'center',
            }}>
            <FastImage
              source={{uri: profileData?.avatar}}
              style={{
                height: moderateScale(100),
                width: moderateScale(100),
                alignSelf: 'center',
                marginTop: moderateScale(-50),
                zIndex: 10000,
                borderRadius: moderateScale(50),
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
            <View
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
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate('FollowPage', {
                      user: profileData,
                    });
                  }}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: moderateScale(25),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'AvenirHeavy',
                      fontSize: moderateScale(15),
                      color: '#000',
                    }}>
                    {profileData?.followers}
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
                <TouchableOpacity
                  onPress={() => {
                    nav.navigate('FollowPage', {
                      user: profileData,
                    });
                  }}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: moderateScale(25),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'AvenirHeavy',
                      fontSize: moderateScale(15),
                      color: '#000',
                    }}>
                    {profileData?.followings}
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
                {profileData?.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'AvenirMedium',
                  fontSize: moderateScale(13),
                  color: '#000',
                  textAlign: 'left',
                  margin: moderateScale(15),
                }}>
                {profileData?.bio}
              </Text>

              <View>
                {key === 'search' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        getFollowing(profileData?.id);
                      }}
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
                        {profileData?.is_following === false
                          ? 'Follow'
                          : 'Unfollow'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => nav.navigate('EditProfile')}
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
                        Message
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => nav.navigate('EditProfile')}
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
                      Edit
                    </Text>
                  </TouchableOpacity>
                )}
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
            </View>
            <FlatList
              contentContainerStyle={{paddingBottom: moderateScale(50)}}
              style={{flex: 1}}
              data={allPost}
              renderItem={({item, index}) => {
                return (
                  <>
                    <View
                      key={index}
                      style={{
                        padding: moderateScale(20),
                        marginTop: moderateScale(15),
                        borderWidth: moderateScale(2),
                        borderColor: '#c4c4c4',
                        margin: 10,
                        borderRadius: moderateScale(20),
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          // onPress={() => navigation.navigate('OtherProfile')}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FastImage
                            source={{uri: item?.creater_avatar}}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                              height: moderateScale(50),
                              width: moderateScale(50),
                              borderRadius: moderateScale(50),
                              backgroundColor: '#f2f2f2',
                            }}
                          />
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: moderateScale(15),
                            }}>
                            <Text
                              style={{
                                fontSize: moderateScale(15),
                                fontFamily: 'AvenirHeavy',
                                color: '#000',
                              }}>
                              {item?.creater_name}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontSize: moderateScale(8),
                                  fontFamily: 'AvenirHeavy',
                                  color: '#606770',
                                  marginRight: moderateScale(5),
                                }}>
                                {item?.time}
                              </Text>
                              <FastImage
                                source={require('../image/Group.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                  height: moderateScale(9),
                                  width: moderateScale(9),
                                }}
                              />
                            </View>
                          </View>
                        </View>
                        <FastImage
                          source={require('../image/Group11.png')}
                          resizeMode={FastImage.resizeMode.contain}
                          style={{
                            height: moderateScale(20),
                            width: moderateScale(15),
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          fontSize: moderateScale(12),
                          fontFamily: 'AvenirMedium',
                          color: '#000',
                          marginRight: moderateScale(5),
                        }}>
                        {item?.text}
                      </Text>
                      <FlatList
                        horizontal
                        data={item?.post_images}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item: postData, i}) => {
                          return (
                            <View
                              style={{
                                height: moderateScale(170),
                                width: screenWidth * 0.75,
                                marginTop: moderateScale(20),
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Image
                                source={{uri: postData?.image}}
                                style={{
                                  height: '100%',
                                  width: '100%',
                                }}
                                // resizeMode={FastImage.resizeMode.contain}
                                resizeMode="contain"
                              />
                            </View>
                          );
                        }}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: moderateScale(15),
                        }}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FastImage
                            source={require('../image/ThumbsUp.png')}
                            style={{height: moderateScale(30), width: 30}}
                            resizeMode={FastImage.resizeMode.stretch}
                          />
                          <Text
                            style={{
                              fontSize: moderateScale(12),
                              fontFamily: 'AvenirMedium',
                              color: '#000',
                              marginLeft: moderateScale(5),
                            }}>
                            1
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: moderateScale(10),
                            }}>
                            <FastImage
                              source={require('../image/Eye.png')}
                              style={{height: moderateScale(30), width: 30}}
                              resizeMode={FastImage.resizeMode.stretch}
                            />
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                fontFamily: 'AvenirMedium',
                                color: '#000',
                                marginLeft: moderateScale(5),
                              }}>
                              1
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={onOpen}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: moderateScale(10),
                            }}>
                            <FastImage
                              source={require('../image/ChatDots.png')}
                              style={{height: moderateScale(30), width: 30}}
                              resizeMode={FastImage.resizeMode.stretch}
                            />
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                fontFamily: 'AvenirMedium',
                                color: '#000',
                                marginLeft: moderateScale(5),
                              }}>
                              0
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginRight: moderateScale(10),
                            }}
                            onPress={() => {
                              shareContent();
                            }}>
                            <FastImage
                              source={require('../image/ShareFat.png')}
                              style={{height: moderateScale(30), width: 30}}
                              resizeMode={FastImage.resizeMode.stretch}
                            />
                            <Text
                              style={{
                                fontSize: moderateScale(12),
                                fontFamily: 'AvenirMedium',
                                color: '#000',
                                marginLeft: moderateScale(5),
                              }}>
                              1
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{backgroundColor: '#ffffff'}}>
          <Text
            style={{
              fontSize: moderateScale(18),
              fontFamily: 'AvenirMedium',
              color: '#000',
            }}>
            Comments
          </Text>
          <FlatList
            contentContainerStyle={{paddingHorizontal: moderateScale(10)}}
            data={allPost}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginBottom: moderateScale(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: moderateScale(5),
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('OtherProfile')}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FastImage
                        source={{uri: item?.creater_avatar}}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale(30),
                          width: moderateScale(30),
                          borderRadius: moderateScale(50),
                          backgroundColor: '#f2f2f2',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: moderateScale(10),
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(13),
                            fontFamily: 'AvenirHeavy',
                            color: '#000',
                          }}>
                          {item?.creater_name}
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: moderateScale(8),
                              fontFamily: 'AvenirHeavy',
                              color: '#606770',
                              marginRight: moderateScale(5),
                            }}>
                            {item?.time}
                          </Text>
                          <FastImage
                            source={require('../image/Group.png')}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={{
                              height: moderateScale(9),
                              width: moderateScale(9),
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontFamily: 'AvenirMedium',
                      color: '#000',
                      marginRight: moderateScale(5),
                    }}>
                    {item?.text}
                  </Text>
                </View>
              );
            }}
          />
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <FastImage
              source={{uri: profileData?.avatar}}
              style={{
                height: moderateScale(40),
                width: moderateScale(40),
                borderRadius: moderateScale(50),
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <TextInput
              placeholder="Add Comment.... "
              style={styles.inputActionSheet}
              placeholderTextColor={'#D1D0D0'}
              value={search}
              onChangeText={text => setSearch(text)}
            />
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default Myprofile;
const styles = StyleSheet.create({
  inputActionSheet: {
    backgroundColor: '#FFFFFF',
    color: '#262626',
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    width: '88%',
  },
});
