import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale} from '../utils/overAllNormalization';
import { useNavigation } from '@react-navigation/native';
import VideoPlayer from './VideoPlayer';
import {useSelector} from 'react-redux';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
// import {FlatList} from 'react-native-gesture-handler';

const OtherProfile = ({route}) => {
  const nav = useNavigation();
  const item = route?.params?.item;
  const user_id = item?.user_id;
  
  const {token} = useSelector(state => state?.userReducer);
  const [jpgAndGifImages, setJpgAndGifImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [select, SetSelect] = useState('1');
  const [selectedUserData, setSelectedUserData] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewableItem, setViewableItem] = useState(null);

  const onViewableItemsChanged = ({ viewableItems }) => {
    // viewableItems is an array containing information about currently visible items
    if (viewableItems.length > 0) {
      setViewableItem(viewableItems[0].item);
    } else {
      setViewableItem(null);
    }
  };

  useEffect(() => {
    getUserData();
    getUserPost();
  }, [user_id])

  // get user details:::
  const getUserData = async ()=>{
    new Promise((resolve, reject) => {
      fetch(`https://shopninja.in/anurag/postbox/api/user/others-profile?id=${user_id}`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  console.log('::ERROR IN get other profile::')
              }
          })
          .then((json) => {
              console.log('get other profile response::::::::::', json);
              setSelectedUserData(json);
          })
          .catch((error) => {
              console.log('=== ERROR ===', error);
          });
      })
  }

  // follow user
  const followUser =(id)=>{
    console.log('isFollowing', id);
    new Promise((resolve, reject) => {
      fetch(`https://shopninja.in/anurag/postbox/api/user/toggle-post-like?post_id=${id}`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  console.log('::ERROR IN followUser::')
              }
          })
          .then((json) => {
              console.log('followUser response::::::::::', json);
              getUserData();
          })
          .catch((error) => {
              console.log('=== ERROR ===', error);
          });
      })
  }


  // get user posts
  const getUserPost =()=>{
    console.log('user_id', user_id);
    new Promise((resolve, reject) => {
      fetch(`https://shopninja.in/anurag/postbox/api/user/get-user-posts?id=${user_id}`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
          .then((response) => {
              if (response.status === 200) {
                  return response.json();
              } else {
                  console.log('::ERROR IN getUserPost::')
              }
          })
          .then((json) => {
              console.log('getUserPost response::::::::::', json?.posts);
              var newImageArray = [];
              json?.posts.forEach(post => {
                if (post.post_images && post.post_images.length > 0) {
                  // If post has post_images, add the first image object to the new array
                  newImageArray.push(post.post_images[0]);
                }
              });
              console.log('userPoost::::::::::',newImageArray);

              if(newImageArray && newImageArray.length > 0){
                const jpgAndGif = newImageArray.filter(image => image.type === 'jpg' || image.type === 'gif');
                const others = newImageArray.filter(image => image.type == 'mp4');
                setJpgAndGifImages(jpgAndGif);
                setVideos(others);
              }
              setUserPost(newImageArray)
          })
          .catch((error) => {
              console.log('=== ERROR userPoost ===', error);
          });
      })
  }
  


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
          source={{ uri:selectedUserData?.user?.avatar}}
          style={{
            height: moderateScale(100),
            width: moderateScale(100),
            borderRadius:moderateScale(50),
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
            <TouchableOpacity  onPress={() => nav.navigate('FollowPage')} style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'AvenirHeavy',
                  fontSize: moderateScale(15),
                  color: '#000',
                }}>
                {selectedUserData?.user?.followers}
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
                {selectedUserData?.user?.followings}
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
            {selectedUserData?.user?.name}
          </Text>
          <Text
            style={{
              fontFamily: 'AvenirMedium',
              fontSize: moderateScale(13),
              color: '#000',
              textAlign: 'center',
              margin: moderateScale(15),
            }}>
                        {selectedUserData?.user?.bio}
          </Text>
          <View style={{justifyContent:"center", alignItems:"center", flexDirection:"row",}}>
          <TouchableOpacity
            onPress={() => followUser(selectedUserData?.user?.id)}
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
              {selectedUserData?.user?.is_following === true ? 'Following' : 'Follow' }
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

            <FlatList
              data={select === '1'? userPost : select === '2' ? jpgAndGifImages : select === '3' && videos}
              keyExtractor={(i, j) => j}
              numColumns={3}
              contentContainerStyle={{ alignItems:"center",justifyContent:'space-evenly', marginTop:hp(1.5), maxHeight:hp(50)}}
              renderItem={({item, index}) => {
               if(item?.type === 'jpg' || item?.type === 'gif'){
                return (
                  <View style={{
                   height:hp(10),
                   width:hp(10),
                   margin:hp(1)
                  }}>                
                      <FastImage
                      source={{ uri: item?.image }}
                      style={{ height:hp(10),
                        width:hp(10)}}
                      resizeMode={FastImage.resizeMode.stretch}
                      />
                  </View>
                )
               }else{ 
                return(
                    <View style={{
                      height:hp(10),
                      width:hp(10), 
                      margin:hp(1), 
                    }}>
                        <VideoPlayer
                        url={item?.image}
                        isPlaying={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        height={10}
                        width={hp(10)}
                        />
                    </View>
                )
               }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OtherProfile;
const styles = StyleSheet.create({});


