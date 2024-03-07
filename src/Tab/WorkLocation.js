import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Image} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale} from '../utils/overAllNormalization';
import Header from '../comp/Header';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import LoaderFs from '../comp/Loader'
import UserInfoComp from '../comp/UserInfoComp';
import ShowImageComp from '../comp/ShowImageComp';
import VideoPlayer from '../Screens/VideoPlayer';
import LikeCommentShare from '../comp/LikeCommentShare';
import {useDisclose, useToken} from 'native-base';
import FastImage from 'react-native-fast-image';

import ImageView from 'react-native-image-viewing';






export default function WorkLocation({navigation}) {
	const isFocused = useIsFocused();
	const BaseUrl = 'https://shopninja.in/anurag/postbox/api/user';
	const {profile, token} = useSelector(state => state?.userReducer);


	const [userToken, setUserToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [allPost, setAllPost] = useState([]);
	const [location, setLocation] = useState('');
	const [search, setSearch] = useState('');
	const [visible, setIsVisible] = useState(false);
	const [selectedImage, setSelectedImage] = useState([]);
	const [skeletonLoader, setSkeletonLoader] = useState(true);
	const [postSelected, setPostSelected] = useState({});
	const [isPlaying, setIsPlaying] = useState(false);
	const {isOpen, onOpen, onClose} = useDisclose();
	const flatListRef = useRef(null);

	const getToken = async () => {
		await AsyncStorage.getItem('userToken').then(value => {
			if(value !== null) {
				setUserToken(value);
			}
		});
	};

	useEffect(() => {
		getToken();
	}, [isFocused])


	useEffect(() => {
		// console.log('userLocation:::::::::::::::::::', profile);
		if(profile) {
			var location = profile?.city
			setLocation(location)
			fetchData(location);
		}
	}, [userToken]);

	// primary
	const getHeaders = () => {
		return {
			Authorization: `Bearer ${userToken}`,
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		};
	};


	const fetchData = async (location) => {
		setLoading(true);
		const apiUrl = BaseUrl + `/search-location-posts?term=${location}`;

		fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((response) => {
				if(response.status === 200) {
					return response.json();
				} else {
					return response.json();
				}
			})
			.then((json) => {
				if(json?.status === 200) {
					setLoading(false);
					// console.log(json?.relatedPosts, ':::::uniqueDataArray');
					setAllPost(json?.relatedPosts);
				}
			})
			.catch((error) => {
				console.log('=== ERROR followers ===', error);
			});
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

	const shareContent = async (item) => {
		console.log('item::::::::::::x', item)
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

	return (
		<View style={{flex: 1, }}>
			<Header
				navigation={navigation}
				label={'Friends And Family'}
			/>

			<View style={{flex: 1}}>
				{loading ? (
					<LoaderFs />
				) : (
					<>
						{allPost !== undefined && allPost?.length > 0 ? (
							<>
								<FlatList
									// ref={flatListRef}
									contentContainerStyle={{
										paddingBottom: moderateScale(200),
										paddingHorizontal: moderateScale(20),
										width: widthPercentageToDP(100),
									}}
									data={allPost}
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
														if(postData.endsWith(".jpg") || postData.endsWith(".gif") || postData.endsWith(".png")) {
															return (
																<View style={{}}>
																	<ShowImageComp
																		onPress={() => {
																			const data = {
																				uri: postData?.image ? postData?.image : postData,
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
																	height: heightPercentageToDP(20),
																	width: widthPercentageToDP(80),
																}}>
																	<VideoPlayer
																		url={postData?.image ? postData?.image : postData}
																		isPlaying={isPlaying}
																		onPlay={() => setIsPlaying(true)}
																		height={20}
																		width={widthPercentageToDP(80)}
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

							<View style={{alignItems: 'center', justifyContent: 'center', marginBottom: heightPercentageToDP(1.5)}}>
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
												borderBottomWidth: heightPercentageToDP(0.022),
												paddingBottom: heightPercentageToDP(1),
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
									marginTop: heightPercentageToDP(1.5)
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

			{/* selected Image */}
			<ImageView
				images={selectedImage}
				imageIndex={0}
				visible={visible}
				onRequestClose={() => setIsVisible(false)}
			/>
		</View>
	);
}


const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: '#000000aa',
		justifyContent: 'flex-end',
	},
})