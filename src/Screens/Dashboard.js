/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {moderateScale} from '../utils/overAllNormalization';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../Navigation/AuthProvider';
import {updateUserDetails} from '../../redux/reducers/userReducer';
import {Button, Actionsheet, useDisclose, Center} from 'native-base';
import {Skeleton} from 'native-base';
import ImageView from 'react-native-image-viewing';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import VideoPlayer from './VideoPlayer';
import HeaderWithSearch from '../comp/HeaderWithSearch';
import ShowImageComp from '../comp/ShowImageComp';
import UserInfoComp from '../comp/UserInfoComp';
import LikeCommentShare from '../comp/LikeCommentShare';
import ImageComp from '../comp/ImageComp';
import Share from 'react-native-share';


function Dashboard({navigation}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {BaseUrl} = useContext(AuthContext);
  const {profile, token} = useSelector(state => state?.userReducer);

  const [select, SetSelect] = useState('1');
  const [search, setSearch] = useState('');
  const [visible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [skeletonLoader, setSkeletonLoader] = useState(true);
  const [image, setImage] = useState('');
  const [mime, setMime] = useState('');
  const [fname, setFname] = useState('');
  const [story, setStory] = useState([]);
  const [removedObject, setRemovedObject] = useState(null);
  const [uploade, setUploade] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postSelected, setPostSelected] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');

  const scrollViewRef = useRef(null);

  const scrollToTop = () => {
    console.log('scrollToTop::::::::::::::::::::::::::::::::::::::::::::');
    if(scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     scrollToTop();
  //     return () => {
  //       // Optional cleanup function if needed
  //     };
  //   }, [])
  // );

  useEffect(() => {
    console.log('go tp top:::::::')
    scrollToTop();
  }, [isFocused])

  const flatListRef = useRef(null);

  // primary
  const getHeaders = () => {
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
  };

  const getPost = () => {
    setLoading(true);
    try {
      axios
        .get(BaseUrl + '/get-all', {
          headers: getHeaders(),
        })
        .then(response => {
          setLoading(false);
          if(response?.status === 200) {
            setAllPost(response?.data?.posts);
            setSkeletonLoader(false);
            setTimeout(() => {
              setSkeletonLoader(true);
            }, 2000);
          } else {
            console.error('Unexpected status code:', response?.status);
          }
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
        });
    } catch(error) {
      setLoading(false);
      console.error('Caught an exception:', error);
    }
  };

  // curr user
  const getUser = () => {
    try {
      axios
        .get(BaseUrl + '/profile', {
          headers: getHeaders(),
        })
        .then(response => {
          if(response?.status === 200) {
            dispatch(
              updateUserDetails({
                profile: response?.data?.user,
              }),
            );
          }
        });
    } catch(error) {
      console.log(error, 'error');
    }
  };

  // secondary
  const takePhotoFromCamera = () => {
    setUploade(false);
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    }).then(img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split('/').pop();
      setMime(img.mime);
      setFname(fName);
      setImage(Uri);
      handelCreateStory(Uri, img.mime, fName);
    });
  };

  const choosePhotoFromLibrary = () => {
    setUploade(false);
    ImagePicker.openPicker({
      cropping: true,
    }).then(img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split('/').pop();
      setMime(img.mime);
      setFname(fName);
      setImage(Uri);
      handelCreateStory(Uri, img.mime, fName);
    });
  };

  const shareContent = async (item) => {
    let options = {
      title: 'Post-Box',
      message: `Check out this awesome Post-Box app! post from ${item?.creater_name}`,
      id: item?.post_id,
      subject: 'Share Link',
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
    // try {
    //   const result = await Share.share({
    // title: 'Post-Box',
    // message: `Check out this awesome Post-Box app! post from ${item?.creater_name}`,
    // id: item?.post_id,
    // subject: 'Share Link',
    //   });

    //   if(result.action === Share.sharedAction) {
    //     z
    //     if(result.activityType) {
    //       console.log(`Shared via ${result.activityType}`);
    //     } else {
    //       console.log('Shared successfully');
    //     }
    //   } else if(result.action === Share.dismissedAction) {
    //     console.log('Share sheet dismissed');
    //   }
    // } catch(error) {
    //   console.error('Error sharing:', error.message);
    // }
  };

  const handelCreateStory = async (i, m, f) => {
    // setLoading(true);
    var form = new FormData();
    form.append('cust_ids', '');
    form.append('images[]', {
      uri: i,
      type: m,
      name: f,
    });
    console.log('njsbfhsjd', form);
    await axios
      .post(BaseUrl + '/add-story', form, {
        headers: getHeaders(),
      })
      .then(response => {
        getStory();
        Snackbar.show({
          text: `${response?.data?.message}`,
          textColor: 'green',
          numberOfLines: 1,
          backgroundColor: '#fff',
        });
      })
      .catch(error => {
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

  const getStory = () => {
    try {
      axios
        .get(BaseUrl + '/get-stories', {
          headers: getHeaders(),
        })
        .then(response => {
          if(response?.data?.status === 200) {
            const removedObj = response?.data?.stories.find(
              character => character?.user_id === profile?.id,
            );
            const updatedStory = response?.data?.stories.filter(
              character => character?.user_id !== profile?.id,
            );
            setStory(updatedStory);
            const obj = removedObj === null ? null : removedObj;
            console.log('story:::::::::::::::::::', removedObj, typeof removedObj);
            setRemovedObject(obj);
          }
        });
    } catch(error) {
      console.log(error, 'error');
    }
  };

  const handelLike = id => {
    try {
      axios
        .get(BaseUrl + `/toggle-post-like?post_id=${id}`, {
          headers: getHeaders(),
        })
        .then(response => {
          if(response?.data?.status === 200) {
            if(response?.data?.message === 'liked successfully') {
              const updatedData = allPost.map(post => {
                if(post.post_id === id) {
                  return {
                    ...post,
                    is_liked: true,
                    likes_count: post?.likes_count + 1,
                  };
                }
                return post;
              });
              setAllPost(updatedData);
            } else {
              const updatedData = allPost.map(post => {
                if(post.post_id === id) {
                  return {
                    ...post,
                    is_liked: false,
                    likes_count: post?.likes_count - 1,
                  };
                }
                return post;
              });
              setAllPost(updatedData);
            }
          }
        });
    } catch(error) {
      console.log(error, 'error');
    }
  };

  const postComment = async () => {
    console.log('comment::::::::::::::::::', token);

    new Promise((resolve, reject) => {
      let formdata = new FormData();
      formdata.append("post_id", postSelected?.post_id)
      formdata.append("text", search)
      console.log('check in FormData:', formdata)

      fetch('https://shopninja.in/anurag/postbox/api/user/add-comment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata
      })
        .then((response) => {
          if(response.status === 200) {
            return response.json();
          } else {
            console.log('::ERROR IN POST comment::')
          }
        })
        .then((json) => {
          console.log('post commment response::::::::::', json);
          setSearch('');
          getPost();
          // onClose();
        })
        .catch((error) => {
          console.log('=== ERROR ===', error);
          // reject(error);
        });
    })
  }

  // const handleScroll = (event) => {
  //   const offsetY = event.nativeEvent.contentOffset.y;
  //   const diff = offsetY - (this.offsetY || 0);

  //   if(diff > 0) {
  //     setScrollDirection('down');
  //     console.log('down:::::::::::')
  //   } else if(diff < 0) {
  //     setScrollDirection('up');
  //     console.log('up:::::::::::')
  //   }
  //   this.offsetY = offsetY;
  // };

  useEffect(() => {
    getUser();
    getStory();//story
    getPost();
  }, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#611EBD'}}>

      {/* top header */}
      <HeaderWithSearch navigation={navigation} title={profile?.name} />

      {/* {scrollDirection === 'up' &&
        <>

        </>
      } */}


      {/* feeds zone */}

      <ScrollView
        ref={scrollViewRef}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: moderateScale(40),
          borderTopRightRadius: moderateScale(40),
          // paddingBottom: moderateScale(20),
        }}
      >

        <View
          style={{
            flex: 1,

          }}>
          {loading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={'#000000'} />
            </View>
          ) : (
            <>


              <View style={{backgroundColor: '#611EBD', paddingHorizontal: moderateScale(20)}}>
                <View style={{flexDirection: 'row', alignItems: 'center', }}>

                  {/* story user */}
                  {removedObject === undefined || removedObject === null ? (
                    <TouchableOpacity
                      style={{backgroundColor: '#611EBD'}}
                      onPress={() => {
                        setUploade(true);
                      }}>
                      <View style={{paddingHorizontal: moderateScale(8)}}>

                        <View style={styles.ppOutline}>
                          {/* edit icon */}
                          <View style={styles.addStory}>
                            <FastImage
                              source={require('../image/Plusbutton.png')}
                              style={styles.pen}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </View>

                          {/* pp */}
                          <FastImage
                            source={{uri: profile?.avatar}}
                            style={styles.pp}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                        <Text style={styles.you}>You</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {navigation.navigate('Status', removedObject, {key: 'you'})}}>
                      <View
                        style={{
                          paddingHorizontal: moderateScale(8),
                          borderTopRightRadius: moderateScale(50),
                        }}>
                        <View style={[styles.ppOutline, {overflow: 'hidden', }]}>
                          <FastImage
                            source={{uri: removedObject?.avatar}}
                            style={styles.pp}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}

                  {/* other users posts */}
                  <FlatList
                    data={story}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            navigation.navigate('Status', item);
                          }}>
                          <View
                            style={{
                              paddingHorizontal: moderateScale(8),
                            }}>
                            <View style={[styles.ppOutline, {overflow: 'hidden', }]}>
                              <FastImage
                                source={{uri: item?.avatar}}
                                style={styles.pp}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </View>


                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: moderateScale(12),
                                fontWeight: '700',
                                color: '#FFF',
                                width: moderateScale(60),
                              }}
                              numberOfLines={2}>
                              {item?.username}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>

                {/* whats on your head */}
                <TouchableOpacity
                  onPress={() => {
                    // handleFilePicker('image');
                    navigation.navigate('PlusIcon');
                  }}>
                  <View
                    style={{
                      backgroundColor: '#E6EEFA',
                      padding: moderateScale(20),
                      marginHorizontal: moderateScale(20),
                      marginVertical: moderateScale(20),
                      borderRadius: moderateScale(20),
                      flexDirection: 'row',
                    }}>
                    <FastImage
                      source={{uri: profile?.avatar}}
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        borderRadius: moderateScale(50),
                      }}
                      resizeMode={FastImage.resizeMode.stretch}
                    />
                    <View
                      style={{flexDirection: 'column', marginLeft: moderateScale(10)}}>
                      <Text
                        style={{
                          fontSize: moderateScale(16),
                          fontWeight: '400',
                          fontFamily: 'Actor-Regular',
                          color: '#000',
                        }}>
                        What's on your head?
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: moderateScale(10),
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() => {
                              // handleFilePicker('image');
                              navigation.navigate('PlusIcon');
                            }}
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
                            onPress={() => {
                              // handleFilePicker('video');
                              navigation.navigate('PlusIcon');
                            }}
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
                            onPress={() => {
                              // handleFilePicker('video');
                              navigation.navigate('PlusIcon');
                            }}
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
                              Attach
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>


              {/* {allPost.length > 0 ? ( */}
              {allPost !== undefined && allPost?.length > 0 ? (
                <>
                  <FlatList
                    ref={flatListRef}
                    contentContainerStyle={{
                      paddingBottom: moderateScale(200),
                      paddingHorizontal: moderateScale(20),
                      width: wp(100),
                    }}
                    data={allPost}
                    stickyHeaderIndices={[0]}
                    ListHeaderComponent={
                      <View style={{backgroundColor: '#ffffff'}}>

                        <View
                          style={{
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => SetSelect('1')}
                            style={{
                              paddingVertical: hp(1),
                              width: moderateScale(100),
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderBottomWidth:
                                select === '1' ? moderateScale(1) : 0,
                              borderBottomColor:
                                select === '1' ? '#000' : '#c4c4c4',
                            }}>
                            <Text
                              style={{
                                fontSize: moderateScale(16),
                                color: select === '1' ? '#611EBD' : '#c4c4c4',
                                fontFamily: 'AvenirMedium',
                                paddingBottom: moderateScale(5),
                              }}>
                              Latest
                            </Text>
                          </TouchableOpacity>


                          <TouchableOpacity
                            onPress={() => SetSelect('2')}
                            style={{
                              paddingVertical: hp(1),
                              width: moderateScale(100),
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderBottomWidth:
                                select === '2' ? moderateScale(1) : 0,
                              borderBottomColor:
                                select === '2' ? '#000' : '#c4c4c4',
                            }}>
                            <Text
                              style={{
                                fontSize: moderateScale(16),
                                color: select === '2' ? '#611EBD' : '#c4c4c4',
                                fontFamily: 'AvenirMedium',
                                paddingBottom: moderateScale(5),
                              }}>
                              Local
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => SetSelect('3')}
                            style={{
                              paddingVertical: hp(1),
                              width: moderateScale(100),
                              justifyContent: 'center',
                              alignItems: 'center',
                              borderBottomWidth:
                                select === '3' ? moderateScale(1) : 0,
                              borderBottomColor:
                                select === '3' ? '#000' : '#c4c4c4',
                              flexDirection: 'row',
                              alignSelf: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: moderateScale(16),
                                color: select === '3' ? '#611EBD' : '#c4c4c4',
                                fontFamily: 'AvenirMedium',
                                paddingBottom: moderateScale(5),
                              }}>
                              Trending
                            </Text>
                            <FastImage
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20),
                              }}
                              source={require('../image/TrendUp.png')}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </TouchableOpacity>
                        </View>
                        {select === '2' && (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: moderateScale(10),
                            }}>
                            <FastImage
                              source={require('../image/MapPin.png')}
                              style={{
                                height: moderateScale(20),
                                width: moderateScale(20),
                                marginRight: moderateScale(10),
                              }}
                            />
                            <Text
                              style={{
                                fontSize: moderateScale(14),
                                fontFamily: 'AvenirHeavy',
                                color: '#000',
                              }}>
                              Kolkata
                            </Text>
                          </View>
                        )}
                      </View>
                    }
                    renderItem={({item, index}) => {
                      return (
                        <View key={index}
                          style={{
                            // padding: moderateScale(20),
                            marginTop: moderateScale(15),
                            borderWidth: moderateScale(2),
                            borderColor: '#c4c4c4',
                            borderRadius: moderateScale(20),
                          }}>

                          <UserInfoComp
                            navigation={navigation}
                            item={item}
                            skeletonLoader={skeletonLoader}
                          />


                          {/* post images/video rendering */}
                          <FlatList
                            horizontal
                            data={item?.post_images}
                            pagingEnabled
                            showsHorizontalScrollIndicator={true}
                            renderItem={({item: postData, index}) => {
                              if(postData?.type === 'jpg' || postData?.type === 'gif' || postData?.type === 'png') {
                                return (
                                  <View style={{}}>
                                    <ShowImageComp
                                      onPress={() => {
                                        const data = {
                                          uri: postData?.image,
                                        };
                                        setSelectedImage(prevData => [
                                          ...prevData,
                                          data,
                                        ]);
                                        setIsVisible(true);
                                      }}
                                      postData={postData}
                                      skeletonLoader={skeletonLoader}
                                    />
                                  </View>
                                );
                              }
                              else {
                                return (
                                  <View style={{
                                    height: hp(20),
                                    width: wp(80),
                                  }}>
                                    <VideoPlayer
                                      url={postData?.image}
                                      isPlaying={isPlaying}
                                      onPlay={() => setIsPlaying(true)}
                                      height={20}
                                      width={wp(80)}
                                    />
                                  </View>
                                )
                              }
                            }}
                          />

                          <LikeCommentShare
                            item={item}
                            handelLike={handelLike}
                            shareContent={(val) => {shareContent(val)}}
                            onOpen={() => {[setPostSelected([]), setPostSelected(item), onOpen()]}}
                          />

                        </View>
                      );
                    }}
                  />
                </>
              ) : (
                // no post found
                <>
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
                      No Found Post
                    </Text>
                  </View>
                </>
              )}

              {/* <TouchableOpacity onPress={scrollToTop} style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'red'
              }}>
                <ImageComp
                  source={require('../image/up.png')}
                  height={3}
                  width={hp(3)}
                  mode={'contain'}
                  style={{undefined}}
                />
              </TouchableOpacity> */}
            </>
          )}
        </View>


        {/*comment modal */}
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

                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: hp(1.5)}}>
                  <Text
                    style={{

                      fontSize: moderateScale(18),
                      fontFamily: 'AvenirMedium',
                      color: '#000',
                      // textDecorationStyle:'underline'
                    }}>
                    Comments
                  </Text>
                </View>


                <FlatList
                  contentContainerStyle={{paddingHorizontal: moderateScale(10)}}
                  data={postSelected?.comments}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          marginBottom: moderateScale(10),
                          borderBottomWidth: hp(0.022),
                          paddingBottom: hp(1),
                          borderBlockColor: '#E8E8E8'
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
                              source={{uri: item?.user?.avatar}}
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
                                {item?.user?.name}
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
                                  {moment(item?.created_at).format('LLL')}
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


                {/* comment and send */}
                <View
                  style={{
                    width: '95%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: hp(1.5)
                  }}>
                  <FastImage
                    source={{uri: profile?.avatar}}
                    style={{
                      height: moderateScale(35),
                      width: moderateScale(35),
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
                  <TouchableOpacity
                    onPress={() => {[onClose(), postComment()]}}
                    disabled={search.length === 0 ? true : false}
                    style={{
                      width: moderateScale(25),
                      height: moderateScale(25),
                    }}>
                    <Image
                      source={require('../image/send.png')}
                      style={{
                        tintColor: '#262626',
                        width: moderateScale(25),
                        height: moderateScale(25),
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>

            </TouchableOpacity>
          </View>
        </Modal>

        {/*choose story picture modal */}
        <Actionsheet isOpen={uploade} onClose={() => setUploade(false)}>
          <Actionsheet.Content style={{width: '100%'}}>
            <Center style={{width: '100%'}}>
              <Text style={styles.uploadText}>Upload Photo</Text>
              <Text style={styles.chooseText}>Choose your Story Picture </Text>
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

        <ImageView
          images={selectedImage}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;
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
    backgroundColor: '#FFFFFF',
    color: '#262626',
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    width: '80%',
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
  addStory: {
    position: 'absolute',
    bottom: hp(0),
    right: wp(-1),
    zIndex: 999,
    borderRadius: moderateScale(10),
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pen: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(40),
  },
  pp: {
    height: hp(7.5),
    width: hp(7.5),
    borderRadius: hp(3.75),
  },
  you: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#FFF',
  },
  ppOutline: {
    height: hp(7.5),
    width: hp(7.5),
    borderRadius: hp(3.75),
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  main: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-end',

  },
  whiteArea: {
    paddingHorizontal: wp(4),
    maxHeight: hp(60),
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: hp(4),
    borderTopEndRadius: hp(4),
    width: wp(100),
    paddingTop: hp(2),
    paddingBottom: hp(3),
    // alignItems: "center",
  },

});
