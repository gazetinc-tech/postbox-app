/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../Navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import {Actionsheet, useDisclose} from 'native-base';

const AddPost = ({route}) => {
  const sheetRef = useRef(null);
  const [number, onChangeNumber] = useState('');
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const {profile, token} = useSelector(state => state?.userReducer);
  const dispatch = useDispatch();
  const {userToken, BaseUrl} = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [postStatus, setPostStatus] = useState('2');
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const handleFilePicker = async fileType => {
    ImagePicker.openPicker({
      mediaType: fileType,
      width: 300,
      height: 500,
      multiple: true,
      cropping: fileType === 'video' ? false : true,
    }).then(image => {
      console.log(image);
      const newArray = image.map(item => {
        const pathArray = item.path.split('/');
        const fname = pathArray.pop();
        return {
          uri: item.path,
          type: item.mime,
          name: fname,
        };
      });
      setFiles(newArray);
    });
  };
  const AddOutFitType = async () => {
    setLoading(true);
    var form = new FormData();
    const userIdsString = selectedUserIds.join(',');
    form.append('header', postStatus);
    form.append('cust_ids', userIdsString);
    form.append('text', number);
    files.map(item => form.append('images[]', item));
    console?.log(form, 'form', userToken, `${BaseUrl}/add-post`);
    // LOG  {"_parts": [["header", "2"], ["cust_ids", ""], ["text", ""], ["images[]", [Object]]]} form 966|p29yTlQ3emQozzucPgrJXyGqbPuLvAeqOj4vfVTEf61995a6 https://shopninja.in/anurag/postbox/api/user/add-post
    await axios
      .post(BaseUrl + '/add-post', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response?.data, 'vvvvvvvvvvvv');
        setLoading(false);
        if (response) {
          setFiles([]);
          onChangeNumber('');
          navigation.navigate('Home');
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [search]);


  const fetchData = async token => {
    console.log('search:::::::::::::::::::::::::::::::', search)
    setLoading(true);
    const apiUrl = BaseUrl + `/search-users?term=${search}`;
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


  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const handleAdd = userId => {
    setSelectedUserIds(prevSelectedIds => [...prevSelectedIds, userId]);
  };

  const handleRemove = userId => {
    setSelectedUserIds(prevSelectedIds =>
      prevSelectedIds.filter(id => id !== userId),
    );
  };

  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>
      <View
        style={{
          justifyContent: 'space-between',
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <FastImage
            source={require('../image/Menu.png')}
            style={{height: 40, width: 40}}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '400',
              fontFamily: 'Actor-Regular',
              color: '#fff',
            }}>
            {profile?.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          //@ts-ignore
          onPress={() => navigation.navigate('SearchScreen')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={require('../image/search.png')}
            resizeMode={FastImage.resizeMode.stretch}
            style={{height: 45, width: 45}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: '85%',
          zIndex: 1000,
          flex: 1,
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: moderateScale(20),
          marginTop: '10%',
        }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#E6EEFA',
              padding: moderateScale(20),
              borderRadius: moderateScale(40),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <FastImage
                source={{uri: profile?.avatar}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50),
                  borderRadius: moderateScale(50),
                }}
              />
              <TouchableOpacity
                onPress={() => setModal(!modal)}
                style={{
                  backgroundColor: '#E3CFFF',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: moderateScale(5),
                  borderRadius: moderateScale(7.5),
                }}>
                <FastImage
                  source={
                    postStatus === '1'
                      ? require('../image/public.png')
                      : postStatus === '2'
                      ? require('../image/UsersColor.png')
                      : require('../image/UsersThree.png')
                  }
                  style={{
                    height: moderateScale(15),
                    width: moderateScale(15),
                    marginRight: moderateScale(5),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
                <Text
                  style={{
                    color: '#611EBD',
                    fontSize: moderateScale(14),
                    fontFamily: 'AvenirMedium',
                    marginRight: moderateScale(5),
                  }}>
                  {postStatus === '1'
                    ? 'Public'
                    : postStatus === '2'
                    ? 'Friends'
                    : 'Group'}
                </Text>
                <FastImage
                  source={require('../image/CaretDown.png')}
                  style={{
                    height: moderateScale(15),
                    width: moderateScale(15),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </TouchableOpacity>
              <TouchableOpacity
                // disabled
                onPress={onOpen}
                style={{
                  backgroundColor: '#E3CFFF',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: moderateScale(5),
                  borderRadius: moderateScale(7.5),
                }}>
                <Text
                  style={{
                    color: '#611EBD',
                    fontSize: moderateScale(14),
                    fontFamily: 'AvenirMedium',
                    marginRight: moderateScale(5),
                  }}>
                  Tag People
                </Text>
                <FastImage
                  source={require('../image/Tag.png')}
                  style={{
                    height: moderateScale(15),
                    width: moderateScale(15),
                  }}
                  resizeMode={FastImage.resizeMode.stretch}
                />
              </TouchableOpacity>
            </View>
            {modal === true ? (
              <View
                style={{
                  backgroundColor: '#E3CFFF',
                  padding: moderateScale(10),
                  width: moderateScale(125),
                  top: moderateScale(70),
                  borderRadius: moderateScale(10),
                  left: moderateScale(100),
                  position: 'absolute',
                  zIndex: 1000,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                    setPostStatus('1');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: moderateScale(5),
                  }}>
                  <FastImage
                    source={require('../image/public.png')}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <Text
                    style={{
                      color: '#611EBD',
                      fontSize: moderateScale(14),
                      fontFamily: 'AvenirMedium',
                      marginRight: moderateScale(5),
                    }}>
                    Public
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                    setPostStatus('2');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: moderateScale(5),
                  }}>
                  <FastImage
                    source={require('../image/UsersColor.png')}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <Text
                    style={{
                      color: '#611EBD',
                      fontSize: moderateScale(14),
                      fontFamily: 'AvenirMedium',
                      marginRight: moderateScale(5),
                    }}>
                    Friends
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                    setPostStatus('3');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: moderateScale(5),
                  }}>
                  <FastImage
                    source={require('../image/UsersThree.png')}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                  />
                  <Text
                    style={{
                      color: '#611EBD',
                      fontSize: moderateScale(14),
                      fontFamily: 'AvenirMedium',
                      marginRight: moderateScale(5),
                    }}>
                    Group
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              multiline
              numberOfLines={3}
              maxLength={300}
              placeholder="What's on your head?"
              keyboardType="default"
              placeholderTextColor={'#737373'}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: moderateScale(10),
                justifyContent: 'space-around',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => handleFilePicker('image')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={require('../image/AddPohoto.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: '400',
                      fontFamily: 'Actor-Regular',
                      color: '#000',
                      marginRight: moderateScale(20),
                    }}>
                    image
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilePicker('video')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={require('../image/movie_creation.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: '400',
                      fontFamily: 'Actor-Regular',
                      color: '#000',
                      marginRight: moderateScale(20),
                    }}>
                    Videos
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFilePicker('video')}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FastImage
                    source={require('../image/movie_creation.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      height: moderateScale(15),
                      width: moderateScale(15),
                      marginRight: moderateScale(5),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      fontWeight: '400',
                      fontFamily: 'Actor-Regular',
                      color: '#000',
                    }}>
                    Gif
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: moderateScale(20)}}>
            <FlatList
              data={files}
              horizontal
              // numColumns={3}
              keyExtractor={(i, j) => j}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      height: moderateScale(80),
                      width: moderateScale(80),
                      marginRight: moderateScale(5),
                      borderRadius: moderateScale(10),
                    }}>
                    <FastImage
                      source={{uri: item?.uri}}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        height: moderateScale(80),
                        width: moderateScale(80),
                        borderRadius: moderateScale(10),
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const updatedArray = files.filter(
                          i => i?.name !== item?.name,
                        );
                        setFiles(updatedArray);
                      }}
                      style={{
                        position: 'absolute',
                        top: moderateScale(5),
                        right: moderateScale(5),
                        backgroundColor: ' #000000730',
                      }}>
                      <FastImage
                        source={require('../image/cut.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale(15),
                          width: moderateScale(15),
                          borderRadius: moderateScale(10),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          {loading ? (
            <TouchableOpacity
              disabled
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
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                AddOutFitType();
              }}
              style={{
                backgroundColor: '#611EBD',
                marginTop: moderateScale(40),
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
                Upload Post
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <>
            <View style={{width: '95%'}}>
              <TextInput
                placeholder="Search by name"
                style={styles.inputActionSheet}
                placeholderTextColor={'#D1D0D0'}
                value={search}
                onChangeText={text => setSearch(text)}
              />
            </View>

            <Actionsheet.Item
              style={{width: '100%', backgroundColor: '#ffffff'}}>
              <FlatList
                contentContainerStyle={{width: '100%'}}
                data={users}
                renderItem={({item, index}) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: moderateScale(10),
                        borderBottomWidth: moderateScale(2),
                        borderBottomColor: '#E6EEFA',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FastImage
                          source={
                            item?.avatar
                              ? {uri: item?.avatar}
                              : require('../image/SHiV.png')
                          }
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            borderRadius: moderateScale(50),
                            marginRight: moderateScale(10),
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
                      </View>
                      {selectedUserIds.includes(item.id) ? (
                        <TouchableOpacity
                          onPress={() => handleRemove(item.id)}
                          style={{
                            backgroundColor: '#FF0000', // Red color for remove button
                            paddingVertical: moderateScale(5),
                            paddingHorizontal: moderateScale(10),
                            borderRadius: moderateScale(10),
                          }}>
                          <Text>Remove</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleAdd(item.id)}
                          style={{
                            backgroundColor: '#611EBD',
                            paddingVertical: moderateScale(5),
                            paddingHorizontal: moderateScale(10),
                            borderRadius: moderateScale(10),
                          }}>
                          <Text>Add</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            </Actionsheet.Item>
          </>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default AddPost;
const styles = StyleSheet.create({
  input: {
    // height: moderateScale(40),
    margin: moderateScale(10),
    color: '#000',
    fontSize: moderateScale(14),
    padding: moderateScale(10),
    marginBottom: moderateScale(100),
  },
  inputActionSheet: {
    backgroundColor: '#f2f2f2',
    color: '#262626',
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
});
