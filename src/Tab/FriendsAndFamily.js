import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale} from '../utils/overAllNormalization';
import Header from '../comp/Header';
import ProfileCard from '../Screens/home/ProfileCard';
import {heightPercentageToDP, widthPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';


export default function FriendsAndFamily({navigation}) {
	const isFocused = useIsFocused();
	const BaseUrl = 'https://shopninja.in/anurag/postbox/api/user';
	const {profile, token} = useSelector(state => state?.userReducer);


	const [userToken, setUserToken] = useState(null);
	const [loading, setLoading] = useState(true);
	const [allPost, setAllPost] = useState([]);


	const getToken = async () => {
		await AsyncStorage.getItem('userToken').then(value => {
			if(value !== null) {
				setUserToken(value);
				getContactPosts();
			}
		});
	};

	useEffect(() => {
		getToken();
	}, [isFocused]);


	const getContactPosts = async () => {
		fetch(`https://shopninja.in/anurag/postbox/api/user/contacts-posts`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${userToken}`,
			},
		})
			.then((response) => {
				if(response.status === 200) {
					return response;
				} else {
					return response;
				}
			})
			.then((json) => {
				console.log('get getContactPosts::::::::::', json);
				setLoading(false);
				setAllPost(json?.followers)
			})
			.catch((error) => {
				console.log('=== ERROR getContactPosts ===', error);
			});

	}


	return (
		<View style={{
			flex: 1,
		}}>
			<Header
				navigation={navigation}
				label={'Friends And Family'}
			/>




			{/* feeds zone */}
			{/* <View
				style={{
					flex: 1,
					backgroundColor: '#fff',
				}}>
				{loading ? (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size={'large'} color={'#000000'} />
					</View>
				) : (
					<>
						<View style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-evenly',
						}}>

							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => { setSelected( 0 ) }}>
								<LinearGradient
									style={{
										height: heightPercentageToDP( 6 ),
										width: widthPercentageToDP( 50 ),
										justifyContent: 'center',
										alignItems: 'center'
									}}
									colors={[ "#7521FF", "#611EBD" ]}
									start={{ x: -0.6, y: 1 }}
									end={{ x: 1, y: 1 }}
								>
									<Text style={{
										color: '#FFFFFF',
										fontWeight: selected === 0 ? '700' : '500',
										fontSize: selected === 0 ? heightPercentageToDP( 2 ) : heightPercentageToDP( 1.2 ),
									}}>Followers ({followersData.length})</Text>
								</LinearGradient>
							</TouchableOpacity>


							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => { setSelected( 1 ) }}>
								<LinearGradient
									style={{
										height: heightPercentageToDP( 6 ),
										width: widthPercentageToDP( 50 ),
										justifyContent: 'center',
										alignItems: 'center'
									}}
									colors={[ "#7521FF", "#611EBD" ]}
									start={{ x: -0.6, y: 1 }}
									end={{ x: 1, y: 1 }}
								>
									<Text style={{
										color: '#FFFFFF',
										fontWeight: selected === 1 ? '700' : '500',
										fontSize: selected === 1 ? heightPercentageToDP( 2 ) : heightPercentageToDP( 1.2 ),
									}}>Following ({followingData.length})</Text>
								</LinearGradient>
							</TouchableOpacity>
						</View>




						{selected === 0 &&
							<View style={{ flex: 1 }}>
								{followersData.length > 0 ? (
									<FlatList
										contentContainerStyle={{ paddingBottom: moderateScale( 200 ) }}
										style={{ flex: 1 }}
										data={followersData}
										renderItem={( { item, index } ) => {
											return (
												<View
													key={index}
													style={{}}>
													<ProfileCard
														data={item}
														onPress={() => navigation.navigate( 'OtherProfile', { item: item } )}
													/>
												</View>
											);
										}}
									/>
								) :
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
											alignItems: 'center',
											// backgroundColor:'red'
										}}>
										<Text
											style={{
												fontSize: moderateScale( 12 ),
												color: '#687684',
												fontFamily: 'AvenirMedium',
											}}>{selected === 0 ? 'No Followers Found' : 'No one Following'}
										</Text>
									</View>
								}
							</View>
						}


						{selected === 1 &&
							<View style={{ flex: 1 }}>
								{followingData.length > 0 ? (
									<FlatList
										contentContainerStyle={{ paddingBottom: moderateScale( 200 ) }}
										style={{ flex: 1 }}
										data={followingData}
										renderItem={( { item, index } ) => {
											return (
												<View
													key={index}
													style={{}}>
													<ProfileCard
														data={item}
														onPress={() => navigation.navigate( 'OtherProfile', { item: item } )}
													/>

												</View>
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
												// backgroundColor:'red'
											}}>
											<Text
												style={{
													fontSize: moderateScale( 12 ),
													color: '#687684',
													fontFamily: 'AvenirMedium',
												}}>{selected === 0 ? 'No Followers Found' : 'No one Following'}
											</Text>
										</View>
									</>
								)}

							</View>
						}
					</>
				)}
			</View> */}


		</View>
	);
}
