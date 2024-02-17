// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable prettier/prettier */
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useState, useRef } from 'react';
// import FastImage from 'react-native-fast-image';
// import {
//   useNavigation,
//   DrawerActions,
//   useIsFocused,
// } from '@react-navigation/native';
// import { moderateScale } from '../utils/overAllNormalization';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { updateUserDetails } from '../../redux/reducers/userReducer';
// import { useDispatch, useSelector } from 'react-redux';

// export default function CustomDrawer () {
//   const navigation = useNavigation();
//   // const {logout, userToken} = useContext(AuthContext);
//   const dispatch = useDispatch();
//   const { profile } = useSelector( state => state?.userReducer );

//   const [ getUserDetails, setUserDetails ] = useState();
//   const timerRef = useRef( null );
//   const isFocused = useIsFocused();
//   // React.useEffect( () => {
//   //   if ( isFocused ) {
//   //     timerRef.current = setTimeout( () => {
//   //       // GetUserDetails();
//   //       false;
//   //     }, 10 );
//   //     return () => {
//   //       if ( timerRef.current ) {
//   //         clearTimeout( timerRef.current );
//   //       }
//   //     };
//   //   }
//   // }, [ isFocused ] );

//   // React.useEffect( () => {
//   //   if ( !isFocused && timerRef.current ) {
//   //     clearTimeout( timerRef.current );
//   //   }
//   // }, [ isFocused ] );
//   // const GetUserDetails = () => {
//   //   try {
//   //     axios
//   //       .get('https://shopninja.in/anurag/wardrobe/api/user', {
//   //         headers: {
//   //           Authorization: `Bearer ${userToken}`,
//   //           Accept: 'application/json',
//   //           'Content-Type': 'multipart/form-data',
//   //         },
//   //       })
//   //       .then(response => {
//   //         // console.log(response?.data, 'GetUserDetails');
//   //         if (response?.status === 200) {
//   //           // console.log(response?.data?.customer, 'resp');
//   //           setUserDetails(response?.data);
//   //         }
//   //       });
//   //   } catch (error) {
//   //     console.log(error, 'error');
//   //   }
//   // };

//   return (
//     <>
//       <View style={{ flex: 1, borderRadius: 20 }}>
//         <SafeAreaView style={{ flex: 1, borderRadius: 20 }}>
//           <View
//             style={{
//               backgroundColor: '#E6EEFA',
//             }}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#E6EEFA',
//               }}
//               onPress={() => {
//                 navigation.dispatch( DrawerActions.closeDrawer() );
//               }}>
//               <FastImage
//                 source={require( '../image/close.png' )}
//                 resizeMode={FastImage.resizeMode.stretch}
//                 style={{
//                   height: moderateScale( 50 ),
//                   width: moderateScale( 50 ),
//                   margin: moderateScale( 20 ),
//                 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={{ flex: 1, backgroundColor: '#E6EEFA' }}>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate( 'Myprofile' );
//               }}
//               style={{
//                 justifyContent: 'flex-start',
//                 alignSelf: 'center',
//                 flexDirection: 'row',
//                 width: '100%',
//                 alignItems: 'center',
//                 marginTop: '25%',
//                 marginBottom: 50,
//                 paddingHorizontal: 20,
//               }}>
//               {/* <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate('Myprofile');
//                   console.log('hi::')
//                 }}> */}
//               <FastImage
//                 source={{ uri: profile?.avatar }}
//                 resizeMode={FastImage.resizeMode.stretch}
//                 style={{ height: 40, width: 40, borderRadius: 50 }}
//               />
//               {/* </TouchableOpacity> */}
//               <View
//                 style={{
//                   flexDirection: 'column',
//                   marginLeft: moderateScale( 15 ),
//                 }}>
//                 <Text
//                   style={{
//                     color: '#000',
//                     fontSize: 15,
//                     fontFamily: 'AvenirHeavy',
//                   }}>
//                   {profile?.name}
//                 </Text>
//                 <Text
//                   style={{
//                     color: '#000',
//                     fontSize: 11,
//                     fontWeight: '400',
//                     fontFamily: 'Actor-Regular',
//                     textAlign: 'left',
//                   }}>
//                   Verified Profile
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <View
//               style={{
//                 // position: 'absolute',
//                 // zIndex: 10000,
//                 // bottom: 20,
//                 // left: 20,
//               }}>
//               {/* <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginBottom: 25,
//                   }}>
//                   <FastImage
//                     source={require('../image/Account.png')}
//                     resizeMode={FastImage.resizeMode.contain}
//                     style={{height: 25, width: 30, marginRight: 10}}
//                   />
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       fontWeight: '400',
//                       color: '#000',
//                       fontFamily: 'Actor-Regular',
//                     }}>
//                     Account
//                   </Text>
//                 </TouchableOpacity> */}
//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 25,
//                 }}>
//                 <FastImage
//                   source={require( '../image/Account.png' )}
//                   resizeMode={FastImage.resizeMode.contain}
//                   style={{ height: 25, width: 30, marginRight: 10 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000',
//                     fontFamily: 'Actor-Regular',
//                   }}>
//                   Account
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 25,
//                 }}>
//                 <FastImage
//                   source={require( '../image/ChatCircleDots.png' )}
//                   resizeMode={FastImage.resizeMode.contain}
//                   style={{ height: 25, width: 30, marginRight: 10 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000',
//                     fontFamily: 'Actor-Regular',
//                   }}>
//                   Contact Us
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 25,
//                 }}>
//                 <FastImage
//                   source={require( '../image/Question.png' )}
//                   resizeMode={FastImage.resizeMode.contain}
//                   style={{ height: 25, width: 30, marginRight: 10 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000',
//                     fontFamily: 'Actor-Regular',
//                   }}>
//                   Help & Support
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 25,
//                 }}>
//                 <FastImage
//                   source={require( '../image/ShieldWarning.png' )}
//                   resizeMode={FastImage.resizeMode.contain}
//                   style={{ height: 25, width: 30, marginRight: 10 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000',
//                     fontFamily: 'Actor-Regular',
//                   }}>
//                   Privacy Policy
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => {
//                   dispatch(
//                     updateUserDetails( {
//                       isLogin: false,
//                       profile: {},
//                       token: '',
//                     } ),
//                   );
//                 }}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   marginBottom: 25,
//                   marginLeft: 5,
//                 }}>
//                 <FastImage
//                   source={require( '../image/Logout.png' )}
//                   resizeMode={FastImage.resizeMode.stretch}
//                   style={{ height: 25, width: 25, marginRight: 10 }}
//                 />
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     fontWeight: '400',
//                     color: '#000',
//                     fontFamily: 'Actor-Regular',
//                   }}>
//                   Logout
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </SafeAreaView>
//       </View>
//     </>
//   );
// }
