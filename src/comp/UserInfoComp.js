import {Skeleton} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from '../utils/overAllNormalization';
import FastImage from 'react-native-fast-image';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function UserInfoComp({navigation, item, skeletonLoader, }) {
	return (
		<View style={{
			paddingHorizontal: moderateScale(20),
			paddingTop: moderateScale(20),
		}}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<TouchableOpacity
					onPress={() => navigation.navigate('OtherProfile', {item: item})}
					style={{
						flexDirection: 'row',
						alignItems: 'center',
					}}>
					<Skeleton
						isLoaded={skeletonLoader}
						style={{
							height: moderateScale(50),
							width: moderateScale(50),
							borderRadius: moderateScale(50),
						}}>
						<FastImage
							source={{uri: item?.creater_avatar}}
							resizeMode={FastImage.resizeMode.cover}
							style={{
								height: moderateScale(50),
								width: moderateScale(50),
								borderRadius: moderateScale(50),
								backgroundColor: '#f2f2f2',
							}}
						/>
					</Skeleton>

					{/* name */}
					<View
						style={{
							flexDirection: 'column',
							marginLeft: moderateScale(15),
						}}>
						<Skeleton
							isLoaded={skeletonLoader}
							lines={1}
							mb={1}
							w={100}>
							<Text
								style={{
									fontSize: moderateScale(15),
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
							</Skeleton>
						</View>
					</View>
				</TouchableOpacity>
			</View>

			{/* post text */}
			<Skeleton
				isLoaded={skeletonLoader}
				lines={1}
				mb={2}
				w={100}>
				<Text
					style={{
						fontSize: moderateScale(12),
						fontFamily: 'AvenirMedium',
						color: '#000',
						marginRight: moderateScale(5),
						marginVertical: heightPercentageToDP(1.5)
					}}>
					{item?.text == 'hidetext' ? '' : item.text}
				</Text>
			</Skeleton>
		</View>
	);
}
