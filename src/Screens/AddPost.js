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
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../Navigation/AuthProvider';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import {useDisclose} from 'native-base';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import AddRemoveUser from '../comp/AddRemoveUser';
import HeaderWithSearch from '../comp/HeaderWithSearch';

const AddPost = ({route, navigation}) => {
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
  const [postStatus, setPostStatus] = useState('1');
  // const navigation = useNavigation();
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState([]);


  const handleAdd = userId => {
    var id = userId?.id;
    setSelectedUserIds(prevSelectedIds => [...prevSelectedIds, id]);
    setSelectedUserData(selectedUserData => [...selectedUserData, userId])
  };

  const handleRemove = userId => {
    var idx = userId?.id;

    setSelectedUserIds(prevSelectedIds =>
      prevSelectedIds.filter(id => id !== idx),
    );

    var indexToRemove = selectedUserData.findIndex(item => item.id === idx);
    if(indexToRemove !== -1) {
      selectedUserData.splice(indexToRemove, 1);
    }
  };

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
    form.append('text', number.length == 0 ? 'hidetext' : number);
    files.map(item => form.append('images[]', item));

    await axios
      .post(BaseUrl + '/add-post', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(json => {
        if(json) {
          if(json?.status == 200) {
            console.log(json?.data, 'vvvvvvvvvvvv1');
            setLoading(false);
            setFiles([]);
            onChangeNumber('');
            navigation.navigate('Home');
            Snackbar.show({
              text: `${json?.data?.message}`,
              textColor: 'green',
              numberOfLines: 1,
              backgroundColor: '#fff',
            });
          } else {
            setLoading(false);
            Snackbar.show({
              text: `Oops!!, something went wrong`,
              textColor: 'green',
              numberOfLines: 1,
              backgroundColor: '#fff',
            });
          }
        }
      })
      .catch(error => {
        setLoading(false);
        if(error) {
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
          if(response?.status === 200) {
            console.log(response?.data?.users, 'resp');
            setUsers(response?.data?.users);
          }
        });
    } catch(error) {
      console.log(error, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#611EBD', flex: 1}}>

      {/* headers */}
      <HeaderWithSearch navigation={navigation} title={profile?.name} />

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          width: '100%',
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          padding: heightPercentageToDP(2),
          marginTop: heightPercentageToDP(1)
        }}>


        <ScrollView contentContainerStyle={{flex: 1}}>

          <View
            style={{
              backgroundColor: '#E6EEFA',
              padding: moderateScale(20),
              borderRadius: moderateScale(40),
            }}>

            {/* row one */}
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>

                {/* profile picture */}
                <View style={{
                  height: heightPercentageToDP(8),
                  width: heightPercentageToDP(8),
                  overflow: 'hidden',
                }}>
                  <FastImage
                    source={{uri: profile?.avatar}}
                    resizeMode='cover'
                    style={{
                      height: heightPercentageToDP(7.5),
                      width: heightPercentageToDP(7.5),
                      borderRadius: heightPercentageToDP(3.75),
                    }}
                  />
                </View>

                {/* public/friends/group */}
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

                {/* tag peiple */}
                <TouchableOpacity
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

              {/* current selected user */}
              <View style={{
                // alignItems: 'center',
              }}>
                <FlatList
                  contentContainerStyle={{
                    marginTop: heightPercentageToDP(1)
                  }}
                  horizontal={true}
                  data={selectedUserData}
                  renderItem={({item, index}) => {
                    return (
                      <View style={{
                        width: widthPercentageToDP(35),
                        marginLeft: widthPercentageToDP(3),
                      }}>
                        <AddRemoveUser
                          horizontal={true}
                          index={index}
                          item={item}
                          selectedUserIds={selectedUserIds}
                          handleRemove={(val) => {handleRemove(val)}}
                          handleAdd={(val) => {handleAdd(val)}}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>

            {/* public dropdown */}
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

            {/* what's on your head */}
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

            {/* images video and gif */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: moderateScale(10),
                justifyContent: 'space-around',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* images */}
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

                {/* videos */}
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

                {/* gif */}
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

          {/*showing selected imaged/videos  */}
          <View style={{marginTop: moderateScale(20)}}>
            <FlatList
              data={files}
              horizontal
              keyExtractor={(i, j) => j}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginRight: moderateScale(5),
                      borderRadius: moderateScale(10),
                      height: moderateScale(200),
                      width: moderateScale(100),
                    }}>
                    <FastImage
                      source={{uri: item?.uri}}
                      resizeMode='contain'
                      style={{
                        flex: 1,
                        height: moderateScale(200),
                        width: moderateScale(100),
                        borderRadius: moderateScale(10),
                        borderWidth: heightPercentageToDP(0.025),
                        backgroundColor: '#454545'
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
                        // backgroundColor: ' #000000730',
                        backgroundColor: 'red'
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


      {/* tag people modal screen */}
      <Modal
        visible={isOpen}
        onRequestClose={onClose}
        transparent
        animationType='slide'
      >
        <View style={styles.main}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              flex: 1,
            }}
            onPressOut={onClose}
            activeOpacity={1}
          >
            <View style={styles.whiteArea}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}>
                <View style={{width: widthPercentageToDP(100), alignItems: 'center', paddingTop: heightPercentageToDP(2)}}>
                  <View>
                    <TextInput
                      placeholder="Search by name"
                      style={styles.inputActionSheet}
                      placeholderTextColor={'#D1D0D0'}
                      value={search}
                      onChangeText={text => setSearch(text)}
                    />
                  </View>

                  <FlatList
                    contentContainerStyle={{
                      // width: '100%',
                      maxheight: heightPercentageToDP(60),
                      paddingHorizontal: widthPercentageToDP(4)
                    }}
                    data={users}
                    renderItem={({item, index}) => {
                      return (
                        <AddRemoveUser
                          horizontal={false}
                          index={index}
                          item={item}
                          selectedUserIds={selectedUserIds}
                          handleRemove={(val) => {handleRemove(val)}}
                          handleAdd={(val) => {handleAdd(val)}}
                        />
                      );
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default AddPost;
const styles = StyleSheet.create({
  input: {
    marginTop: heightPercentageToDP(1.5),
    color: '#000',
    fontSize: moderateScale(14),
    paddingHorizontal: widthPercentageToDP(4),
    marginBottom: moderateScale(30),
    borderWidth: heightPercentageToDP(0.1),
    borderRadius: heightPercentageToDP(2)
  },
  inputActionSheet: {
    backgroundColor: '#f2f2f2',
    color: '#262626',
    width: widthPercentageToDP(92),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },

  main: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',

  },
  whiteArea: {
    maxHeight: heightPercentageToDP(60),
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: heightPercentageToDP(4),
    borderTopEndRadius: heightPercentageToDP(4),
    width: widthPercentageToDP(100),
    paddingTop: heightPercentageToDP(2),
    paddingBottom: heightPercentageToDP(3),
    alignItems: "center",
  },


});
