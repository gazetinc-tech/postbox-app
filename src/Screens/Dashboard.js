/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Share,
  FlatList,
  StyleSheet,
  TextInput,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  DrawerActions,
  useIsFocused,
} from '@react-navigation/native';
import { moderateScale } from '../utils/overAllNormalization';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../Navigation/AuthProvider';
import { updateUserDetails } from '../../redux/reducers/userReducer';
import { Button, Actionsheet, useDisclose, Center } from 'native-base';
import { Skeleton } from 'native-base';
import ImageView from 'react-native-image-viewing';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { heightPercentageToDP, heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import VideoPlayer from './VideoPlayer';

function Dashboard ( { navigation } ) {
  const dispatch = useDispatch();

  const [ select, SetSelect ] = useState( '1' );
  const { BaseUrl } = useContext( AuthContext );
  const [ search, setSearch ] = useState( '' );
  const [ visible, setIsVisible ] = useState( false );
  const [ selectedImage, setSelectedImage ] = useState( [] );
  const { profile, token } = useSelector( state => state?.userReducer );
  const [ allPost, setAllPost ] = useState( [] );
  const isFocused = useIsFocused();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [ skeletonLoader, setSkeletonLoader ] = useState( true );
  const [ image, setImage ] = useState( '' );
  const [ mime, setMime ] = useState( '' );
  const [ fname, setFname ] = useState( '' );
  const [ story, setStory ] = useState( [] );
  const [ removedObject, setRemovedObject ] = useState( null );
  const [ uploade, setUploade ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  const [ postSelected, setPostSelected ] = useState( {} );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ scrollDirection, setScrollDirection ] = useState( 'up' );

  const flatListRef = useRef( null );


  const takePhotoFromCamera = () => {
    setUploade( false );
    ImagePicker.openCamera( {
      mediaType: 'photo',
      cropping: true,
    } ).then( img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split( '/' ).pop();
      setMime( img.mime );
      setFname( fName );
      setImage( Uri );
      handelCreateStory( Uri, img.mime, fName );
    } );
  };

  const choosePhotoFromLibrary = () => {
    setUploade( false );
    ImagePicker.openPicker( {
      cropping: true,
    } ).then( img => {
      const Uri = Platform.OS === 'ios' ? img.sourceURL : img.path;
      const fName = Uri.split( '/' ).pop();
      setMime( img.mime );
      setFname( fName );
      setImage( Uri );
      handelCreateStory( Uri, img.mime, fName );
    } );
  };
  const shareContent = async () => {
    try {
      const result = await Share.share( {
        title: 'Post-Box',
        message: 'Check out this awesome Post-Box app!',
        // url: 'https://example.com',
        // subject: 'Share Link',
      } );

      if ( result.action === Share.sharedAction ) {
        if ( result.activityType ) {
          console.log( `Shared via ${ result.activityType }` );
        } else {
          console.log( 'Shared successfully' );
        }
      } else if ( result.action === Share.dismissedAction ) {
        console.log( 'Share sheet dismissed' );
      }
    } catch ( error ) {
      console.error( 'Error sharing:', error.message );
    }
  };
  const getHeaders = () => {
    return {
      Authorization: `Bearer ${ token }`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };
  };
  const handelCreateStory = async ( i, m, f ) => {
    // setLoading(true);
    var form = new FormData();
    form.append( 'cust_ids', '' );
    form.append( 'images[]', {
      uri: i,
      type: m,
      name: f,
    } );
    console.log( 'njsbfhsjd', form );
    await axios
      .post( BaseUrl + '/add-story', form, {
        headers: getHeaders(),
      } )
      .then( response => {
        getStore();
        Snackbar.show( {
          text: `${ response?.data?.message }`,
          textColor: 'green',
          numberOfLines: 1,
          backgroundColor: '#fff',
        } );
      } )
      .catch( error => {
        if ( error ) {
          console?.log( error, 'vvvvvvvvvvvv' );
          Snackbar.show( {
            text: `Something Went Wrong`,
            textColor: 'red',
            numberOfLines: 1,
            backgroundColor: '#fff',
          } );
        }
      } );
  };
  useEffect( () => {
    const fetchData = async () => {
      await getUser();
      await getStore();
      await getPost();
    };

    fetchData();
  }, [] );

  useEffect( () => {
    navigation.addListener( 'focus', () => {
      setRemovedObject( null );
      getStore();
    } );
  }, [ navigation, isFocused ] );

  const getUser = () => {
    try {
      axios
        .get( BaseUrl + '/profile', {
          headers: getHeaders(),
        } )
        .then( response => {
          if ( response?.status === 200 ) {
            dispatch(
              updateUserDetails( {
                profile: response?.data?.user,
              } ),
            );
          }
        } );
    } catch ( error ) {
      console.log( error, 'error' );
    }
  };

  const getPost = () => {
    setLoading( true );
    try {
      axios
        .get( BaseUrl + '/get-all', {
          headers: getHeaders(),
        } )
        .then( response => {
          setLoading( false );
          if ( response?.status === 200 ) {
            setAllPost( response?.data?.posts );
            setSkeletonLoader( false );
            setTimeout( () => {
              setSkeletonLoader( true );
            }, 2000 );
          } else {
            console.error( 'Unexpected status code:', response?.status );
          }
        } )
        .catch( error => {
          setLoading( false );
          console.error( 'Error:', error );
        } );
    } catch ( error ) {
      setLoading( false );
      console.error( 'Caught an exception:', error );
    }
  };

  const getStore = () => {
    try {
      axios
        .get( BaseUrl + '/get-stories', {
          headers: getHeaders(),
        } )
        .then( response => {
          if ( response?.data?.status === 200 ) {
            // setRemovedObject(null);
            const removedObj = response?.data?.stories.find(
              character => character?.user_id === profile?.id,
            );
            const updatedStory = response?.data?.stories.filter(
              character => character?.user_id !== profile?.id,
            );
            setStory( updatedStory );
            const obj = removedObj === null ? null : removedObj;
            setRemovedObject( obj );
          }
        } );
    } catch ( error ) {
      console.log( error, 'error' );
    }
  };
  const handelLike = id => {
    try {
      axios
        .get( BaseUrl + `/toggle-post-like?post_id=${ id }`, {
          headers: getHeaders(),
        } )
        .then( response => {
          if ( response?.data?.status === 200 ) {
            if ( response?.data?.message === 'liked successfully' ) {
              const updatedData = allPost.map( post => {
                if ( post.post_id === id ) {
                  return {
                    ...post,
                    is_liked: true,
                    likes_count: post?.likes_count + 1,
                  };
                }
                return post;
              } );
              setAllPost( updatedData );
            } else {
              const updatedData = allPost.map( post => {
                if ( post.post_id === id ) {
                  return {
                    ...post,
                    is_liked: false,
                    likes_count: post?.likes_count - 1,
                  };
                }
                return post;
              } );
              setAllPost( updatedData );
            }
          }
        } );
    } catch ( error ) {
      console.log( error, 'error' );
    }
  };

  const postComment = async () => {
    console.log( 'comment::::::::::::::::::', token );

    new Promise( ( resolve, reject ) => {
      let formdata = new FormData();
      formdata.append( "post_id", postSelected?.post_id )
      formdata.append( "text", search )
      console.log( 'check in FormData:', formdata )

      fetch( 'https://shopninja.in/anurag/postbox/api/user/add-comment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${ token }`,
        },
        body: formdata
      } )
        .then( ( response ) => {
          if ( response.status === 200 ) {
            return response.json();
            // console.log(response.json(), 'success:::::::::::');
          } else {
            // throw new Error(`HTTP error! Status: ${response.status}`);
            console.log( '::ERROR IN POST comment::' )
            // return response.json();
          }
        } )
        .then( ( json ) => {
          console.log( 'post commment response::::::::::', json );
          setSearch( '' );
          getPost();
          onClose();
        } )
        .catch( ( error ) => {
          console.log( '=== ERROR ===', error );
          // reject(error);
        } );
    } )
  }


  const handleScroll = ( event ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const diff = offsetY - ( this.offsetY || 0 );

    if ( diff > 0 ) {
      setScrollDirection( 'down' );
      console.log( 'down:::::::::::' )
    } else if ( diff < 0 ) {
      setScrollDirection( 'up' );
      console.log( 'up:::::::::::' )
    }

    this.offsetY = offsetY;
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#611EBD' }}>

      {/* top header */}

      <View>
        {/* status bar// header */}

        <View
          style={{
            justifyContent: 'space-between',
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.dispatch( DrawerActions.openDrawer() )}>
            <FastImage
              source={require( '../image/Menu.png' )}
              style={{ height: 40, width: 40 }}
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
            onPress={() => navigation.navigate( 'SearchScreen' )}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              source={require( '../image/search.png' )}
              resizeMode={FastImage.resizeMode.stretch}
              style={{ height: 45, width: 45 }}
            />
          </TouchableOpacity>
        </View>

        {/* you story */}
        {/* <ScrollView

            horizontal
            contentContainerStyle={{ flexDirection: 'row' }}
            showsHorizontalScrollIndicator={false}> */}

        {scrollDirection === 'up' &&
          <>
            <View>
              {removedObject === null ? (
                <TouchableOpacity
                  onPress={() => {
                    setUploade( true );
                  }}>
                  <View
                    style={{
                      paddingHorizontal: moderateScale( 8 ),
                      borderTopRightRadius: moderateScale( 50 ),
                    }}>
                    <View
                      style={{
                        width: moderateScale( 63 ),
                        height: moderateScale( 63 ),
                        backgroundColor: 'white',
                        borderWidth: 1.8,
                        borderRadius: moderateScale( 40 ),
                        borderColor: '#FFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -6,
                          right: -2,
                          zIndex: 999,
                          borderRadius: moderateScale( 20 ),
                        }}>
                        <FastImage
                          source={require( '../image/Plusbutton.png' )}
                          style={{
                            height: moderateScale( 20 ),
                            width: moderateScale( 20 ),
                            borderRadius: moderateScale( 40 ),
                          }}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>

                      <FastImage
                        source={{ uri: profile?.avatar }}
                        style={{
                          height: moderateScale( 60 ),
                          width: moderateScale( 60 ),
                          borderRadius: moderateScale( 40 ),
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: moderateScale( 12 ),
                        fontWeight: '700',
                        // opacity: item?.id == 0 ? 1 : 0.5,
                        color: '#FFF',
                      }}>
                      You
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate( 'Status', removedObject, { key: 'you' } );
                  }}>
                  <View
                    style={{
                      paddingHorizontal: moderateScale( 8 ),
                      borderTopRightRadius: moderateScale( 50 ),
                    }}>
                    <View
                      style={{
                        width: moderateScale( 63 ),
                        height: moderateScale( 63 ),
                        backgroundColor: 'white',
                        borderWidth: 1.8,
                        borderRadius: moderateScale( 40 ),
                        borderColor: '#FFF',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <FastImage
                        source={{ uri: removedObject?.avatar }}
                        style={{
                          height: moderateScale( 60 ),
                          width: moderateScale( 60 ),
                          borderRadius: moderateScale( 40 ),
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    {/* <Text
                  style={{
                    textAlign: 'center',
                    fontSize: moderateScale( 12 ),
                    fontWeight: '700',
                    // opacity: item?.id == 0 ? 1 : 0.5,
                    color: '#FFF',
                  }}>
                  You
                </Text> */}
                  </View>
                </TouchableOpacity>
              )}
              <FlatList
                data={story}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={( { item, index } ) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        navigation.navigate( 'Status', item );
                      }}>
                      <View
                        style={{
                          paddingHorizontal: moderateScale( 8 ),
                        }}>
                        <View
                          style={{
                            width: moderateScale( 63 ),
                            height: moderateScale( 63 ),
                            backgroundColor: 'white',
                            borderWidth: 1.8,
                            borderRadius: moderateScale( 40 ),
                            borderColor: '#FFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <FastImage
                            source={{ uri: item?.avatar }}
                            style={{
                              height: moderateScale( 60 ),
                              width: moderateScale( 60 ),
                              borderRadius: moderateScale( 40 ),
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        </View>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: moderateScale( 12 ),
                            fontWeight: '700',
                            // opacity: item?.id == 0 ? 1 : 0.5,
                            color: '#FFF',
                            width: moderateScale( 60 ),
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
            <View
              style={{
                backgroundColor: '#E6EEFA',
                padding: moderateScale( 20 ),
                marginHorizontal: moderateScale( 20 ),
                marginVertical: moderateScale( 20 ),
                borderRadius: moderateScale( 20 ),
                flexDirection: 'row',
              }}>
              <FastImage
                source={{ uri: profile?.avatar }}
                style={{
                  height: moderateScale( 40 ),
                  width: moderateScale( 40 ),
                  borderRadius: moderateScale( 50 ),
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />
              <View
                style={{ flexDirection: 'column', marginLeft: moderateScale( 10 ) }}>
                <Text
                  style={{
                    fontSize: moderateScale( 16 ),
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
                    marginTop: moderateScale( 10 ),
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        // handleFilePicker('image');
                        navigation.navigate( 'PlusIcon' );
                      }}
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FastImage
                        source={require( '../image/AddPohoto.png' )}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale( 15 ),
                          width: moderateScale( 15 ),
                          marginRight: moderateScale( 5 ),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale( 12 ),
                          fontWeight: '400',
                          fontFamily: 'Actor-Regular',
                          color: '#000',
                          marginRight: moderateScale( 20 ),
                        }}>
                        image
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // handleFilePicker('video');
                        navigation.navigate( 'PlusIcon' );
                      }}
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FastImage
                        source={require( '../image/movie_creation.png' )}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale( 15 ),
                          width: moderateScale( 15 ),
                          marginRight: moderateScale( 5 ),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale( 12 ),
                          fontWeight: '400',
                          fontFamily: 'Actor-Regular',
                          color: '#000',
                          marginRight: moderateScale( 20 ),
                        }}>
                        Videos
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // handleFilePicker('video');
                        navigation.navigate( 'PlusIcon' );
                      }}
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FastImage
                        source={require( '../image/movie_creation.png' )}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale( 15 ),
                          width: moderateScale( 15 ),
                          marginRight: moderateScale( 5 ),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: moderateScale( 12 ),
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
          </>}
      </View>


      {/* feeds zone */}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: moderateScale( 40 ),
          borderTopRightRadius: moderateScale( 40 ),
          padding: moderateScale( 20 ),
        }}>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={'#000000'} />
          </View>
        ) : (
          <>
            {allPost.length > 0 ? (
              <FlatList
                ref={flatListRef}
                onScroll={handleScroll}
                contentContainerStyle={{ paddingBottom: moderateScale( 200 ) }}
                style={{ flex: 1 }}
                data={allPost}
                stickyHeaderIndices={[ 0 ]}
                ListHeaderComponent={
                  <View style={{ backgroundColor: '#ffffff' }}>

                    <View
                      style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => SetSelect( '1' )}
                        style={{
                          paddingVertical: hp( 1 ),
                          width: moderateScale( 100 ),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth:
                            select === '1' ? moderateScale( 1 ) : 0,
                          borderBottomColor:
                            select === '1' ? '#000' : '#c4c4c4',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale( 16 ),
                            color: select === '1' ? '#611EBD' : '#c4c4c4',
                            fontFamily: 'AvenirMedium',
                            paddingBottom: moderateScale( 5 ),
                          }}>
                          Latest
                        </Text>
                      </TouchableOpacity>


                      <TouchableOpacity
                        onPress={() => SetSelect( '2' )}
                        style={{
                          paddingVertical: hp( 1 ),
                          width: moderateScale( 100 ),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth:
                            select === '2' ? moderateScale( 1 ) : 0,
                          borderBottomColor:
                            select === '2' ? '#000' : '#c4c4c4',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale( 16 ),
                            color: select === '2' ? '#611EBD' : '#c4c4c4',
                            fontFamily: 'AvenirMedium',
                            paddingBottom: moderateScale( 5 ),
                          }}>
                          Local
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => SetSelect( '3' )}
                        style={{
                          paddingVertical: hp( 1 ),
                          width: moderateScale( 100 ),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderBottomWidth:
                            select === '3' ? moderateScale( 1 ) : 0,
                          borderBottomColor:
                            select === '3' ? '#000' : '#c4c4c4',
                          flexDirection: 'row',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale( 16 ),
                            color: select === '3' ? '#611EBD' : '#c4c4c4',
                            fontFamily: 'AvenirMedium',
                            paddingBottom: moderateScale( 5 ),
                          }}>
                          Trending
                        </Text>
                        <FastImage
                          style={{
                            height: moderateScale( 20 ),
                            width: moderateScale( 20 ),
                          }}
                          source={require( '../image/TrendUp.png' )}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </TouchableOpacity>
                    </View>
                    {select === '2' && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: moderateScale( 10 ),
                        }}>
                        <FastImage
                          source={require( '../image/MapPin.png' )}
                          style={{
                            height: moderateScale( 20 ),
                            width: moderateScale( 20 ),
                            marginRight: moderateScale( 10 ),
                          }}
                        />
                        <Text
                          style={{
                            fontSize: moderateScale( 14 ),
                            fontFamily: 'AvenirHeavy',
                            color: '#000',
                          }}>
                          Kolkata
                        </Text>
                      </View>
                    )}
                  </View>
                }
                renderItem={( { item, index } ) => {
                  return (
                    <>
                      <View
                        key={index}
                        style={{
                          padding: moderateScale( 20 ),
                          marginTop: moderateScale( 15 ),
                          borderWidth: moderateScale( 2 ),
                          borderColor: '#c4c4c4',
                          borderRadius: moderateScale( 20 ),
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => navigation.navigate( 'OtherProfile', { item: item } )}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Skeleton
                              isLoaded={skeletonLoader}
                              style={{
                                height: moderateScale( 50 ),
                                width: moderateScale( 50 ),
                                borderRadius: moderateScale( 50 ),
                              }}>
                              <FastImage
                                source={{ uri: item?.creater_avatar }}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                  height: moderateScale( 50 ),
                                  width: moderateScale( 50 ),
                                  borderRadius: moderateScale( 50 ),
                                  backgroundColor: '#f2f2f2',
                                }}
                              />
                            </Skeleton>

                            <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: moderateScale( 15 ),
                              }}>
                              <Skeleton
                                isLoaded={skeletonLoader}
                                lines={1}
                                mb={1}
                                w={100}>
                                <Text
                                  style={{
                                    fontSize: moderateScale( 15 ),
                                    fontFamily: 'AvenirHeavy',
                                    color: '#000',
                                  }}>
                                  {item?.creater_name}
                                </Text>
                              </Skeleton>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Skeleton
                                  isLoaded={skeletonLoader}
                                  lines={1}
                                  mb={1}
                                  w={150}>
                                  <Text
                                    style={{
                                      fontSize: moderateScale( 8 ),
                                      fontFamily: 'AvenirHeavy',
                                      color: '#606770',
                                      marginRight: moderateScale( 5 ),
                                    }}>
                                    {item?.time}
                                  </Text>
                                  <FastImage
                                    source={require( '../image/Group.png' )}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={{
                                      height: moderateScale( 9 ),
                                      width: moderateScale( 9 ),
                                    }}
                                  />
                                </Skeleton>
                              </View>
                            </View>
                          </TouchableOpacity>
                          {/* <FastImage
                            source={require('../image/Group11.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                              height: moderateScale(20),
                              width: moderateScale(15),
                            }}
                          /> */}
                        </View>

                        <Skeleton
                          isLoaded={skeletonLoader}
                          lines={1}
                          mb={2}
                          w={100}>
                          <Text
                            style={{
                              fontSize: moderateScale( 12 ),
                              fontFamily: 'AvenirMedium',
                              color: '#000',
                              marginRight: moderateScale( 5 ),
                            }}>
                            {item?.text}
                          </Text>
                        </Skeleton>

                        <FlatList
                          horizontal
                          data={item?.post_images}
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          renderItem={( { item: postData, index } ) => {

                            if ( postData?.type === 'jpg' || postData?.type === 'gif' ) {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    const data = {
                                      uri: postData?.image,
                                    };
                                    setSelectedImage( prevData => [
                                      ...prevData,
                                      data,
                                    ] );
                                    setIsVisible( true );
                                  }}
                                  style={{
                                    height: moderateScale( 170 ),
                                    width: moderateScale( 340 ),
                                    marginTop: moderateScale( 20 ),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}>
                                  <Skeleton
                                    isLoaded={skeletonLoader}
                                    style={{
                                      height: moderateScale( 170 ),
                                      width: moderateScale( 340 ),
                                      marginTop: moderateScale( 20 ),
                                    }}>
                                    <FastImage
                                      source={{ uri: postData?.image }}
                                      style={{
                                        height: '100%',
                                        width: '100%',
                                      }}
                                      resizeMode={FastImage.resizeMode.contain}
                                    />
                                  </Skeleton>
                                </TouchableOpacity>
                              );
                            }
                            else {
                              return (
                                <View style={{
                                  height: hp( 20 ),
                                  width: wp( 80 ),
                                }}>
                                  <VideoPlayer
                                    url={postData?.image}
                                    isPlaying={isPlaying}
                                    onPlay={() => setIsPlaying( true )}
                                    height={20}
                                    width={wp( 80 )}
                                  />
                                </View>
                              )
                            }
                          }}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: moderateScale( 15 ),
                          }}>
                          {item?.is_liked === false ? (
                            <TouchableOpacity
                              onPress={() => {
                                handelLike( item?.post_id );
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <FastImage
                                source={require( '../image/like.png' )}
                                style={{
                                  height: moderateScale( 25 ),
                                  width: moderateScale( 25 ),
                                }}
                                resizeMode={FastImage.resizeMode.stretch}
                              />
                              <Text
                                style={{
                                  fontSize: moderateScale( 14 ),
                                  fontFamily: 'AvenirMedium',
                                  color: '#000',
                                  marginLeft: moderateScale( 5 ),
                                }}>
                                {item?.likes_count}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                handelLike( item?.post_id );
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Image
                                source={require( '../image/ThumbsUp.png' )}
                                style={{
                                  height: moderateScale( 25 ),
                                  width: moderateScale( 25 ),
                                  tintColor: '#611EBD',
                                }}
                                resizeMode="stretch"
                              />
                              <Text
                                style={{
                                  fontSize: moderateScale( 14 ),
                                  fontFamily: 'AvenirMedium',
                                  color: '#000',
                                  marginLeft: moderateScale( 5 ),
                                }}>
                                {item?.likes_count}
                              </Text>
                            </TouchableOpacity>
                          )}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            {/* <TouchableOpacity
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
                            </TouchableOpacity> */}
                            <TouchableOpacity
                              onPress={() => {
                                onOpen();
                                setPostSelected( item );
                              }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: moderateScale( 10 ),
                              }}>
                              <FastImage
                                source={require( '../image/ChatDots.png' )}
                                style={{ height: moderateScale( 30 ), width: 30 }}
                                resizeMode={FastImage.resizeMode.stretch}
                              />
                              <Text
                                style={{
                                  fontSize: moderateScale( 12 ),
                                  fontFamily: 'AvenirMedium',
                                  color: '#000',
                                  marginLeft: moderateScale( 5 ),
                                }}>
                                {item?.comment_count}
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: moderateScale( 10 ),
                              }}
                              onPress={() => {
                                shareContent();
                              }}>
                              <FastImage
                                source={require( '../image/ShareFat.png' )}
                                style={{ height: moderateScale( 30 ), width: 30 }}
                                resizeMode={FastImage.resizeMode.stretch}
                              />
                              <Text
                                style={{
                                  fontSize: moderateScale( 12 ),
                                  fontFamily: 'AvenirMedium',
                                  color: '#000',
                                  marginLeft: moderateScale( 5 ),
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
            ) : (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale( 12 ),
                      color: '#687684',
                      fontFamily: 'AvenirMedium',
                    }}>
                    No Found Post
                  </Text>
                </View>
              </>
            )}
          </>
        )}
      </View>

      {/* modal */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={{ backgroundColor: '#ffffff' }}>
          <Text
            style={{
              fontSize: moderateScale( 18 ),
              fontFamily: 'AvenirMedium',
              color: '#000',
            }}>
            Comments
          </Text>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: moderateScale( 10 ) }}
            data={postSelected?.comments}
            renderItem={( { item, index } ) => {
              return (
                <View
                  style={{
                    marginBottom: moderateScale( 10 ),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: moderateScale( 5 ),
                    }}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate( 'OtherProfile' )}
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <FastImage
                        source={{ uri: item?.user?.avatar }}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                          height: moderateScale( 30 ),
                          width: moderateScale( 30 ),
                          borderRadius: moderateScale( 50 ),
                          backgroundColor: '#f2f2f2',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: moderateScale( 10 ),
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale( 13 ),
                            fontFamily: 'AvenirHeavy',
                            color: '#000',
                          }}>
                          {item?.user?.name}
                        </Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text
                            style={{
                              fontSize: moderateScale( 8 ),
                              fontFamily: 'AvenirHeavy',
                              color: '#606770',
                              marginRight: moderateScale( 5 ),
                            }}>
                            {moment( item?.created_at ).format( 'LLL' )}
                          </Text>
                          <FastImage
                            source={require( '../image/Group.png' )}
                            resizeMode={FastImage.resizeMode.stretch}
                            style={{
                              height: moderateScale( 9 ),
                              width: moderateScale( 9 ),
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: moderateScale( 12 ),
                      fontFamily: 'AvenirMedium',
                      color: '#000',
                      marginRight: moderateScale( 5 ),
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
              source={{ uri: profile?.avatar }}
              style={{
                height: moderateScale( 35 ),
                width: moderateScale( 35 ),
                borderRadius: moderateScale( 50 ),
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <TextInput
              placeholder="Add Comment.... "
              style={styles.inputActionSheet}
              placeholderTextColor={'#D1D0D0'}
              value={search}
              onChangeText={text => setSearch( text )}
            />
            <TouchableOpacity
              onPress={() => { postComment() }}
              disabled={search.length === 0 ? true : false}
              style={{
                width: moderateScale( 25 ),
                height: moderateScale( 25 ),
              }}>
              <Image
                source={require( '../image/send.png' )}
                style={{
                  tintColor: '#262626',
                  width: moderateScale( 25 ),
                  height: moderateScale( 25 ),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Actionsheet.Content>
      </Actionsheet>

      {/* modal */}
      <Actionsheet isOpen={uploade} onClose={() => setUploade( false )}>
        <Actionsheet.Content style={{ width: '100%' }}>
          <Center style={{ width: '100%' }}>
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
        onRequestClose={() => setIsVisible( false )}
      />
    </SafeAreaView>
  );
}

export default Dashboard;
const styles = StyleSheet.create( {
  input: {
    // height: moderateScale(40),
    margin: moderateScale( 10 ),
    color: '#000',
    fontSize: moderateScale( 14 ),
    padding: moderateScale( 10 ),
    marginBottom: moderateScale( 100 ),
  },
  inputActionSheet: {
    backgroundColor: '#FFFFFF',
    color: '#262626',
    paddingHorizontal: moderateScale( 10 ),
    borderRadius: moderateScale( 10 ),
    width: '80%',
  },
  btnCamera: {
    backgroundColor: '#611EBD',
    width: '90%',
    margin: moderateScale( 10 ),
    height: moderateScale( 50 ),
    borderRadius: 10,
  },
  uploadText: {
    color: '#262626',
    fontSize: moderateScale( 25 ),
    fontWeight: '600',
  },
  chooseText: {
    color: '#757474',
    fontSize: moderateScale( 14 ),
    fontWeight: '400',
    marginBottom: moderateScale( 10 ),
  },
  icon: {
    width: moderateScale( 20 ),
    height: moderateScale( 20 ),
    resizeMode: 'contain',
    tintColor: '#ffffff',
  },
  boxIcon: {
    backgroundColor: '#611EBD',
    padding: moderateScale( 8 ),
    position: 'absolute',
    borderRadius: moderateScale( 50 ),
    bottom: 0,
    right: '30%',
  },
} );
