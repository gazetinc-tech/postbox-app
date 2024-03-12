import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {moderateScale} from '../utils/overAllNormalization';
import FastImage from 'react-native-fast-image';

export default function LikeCommentShare({item, handelLike, shareContent, onOpen}) {

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginVertical: moderateScale(15),
				paddingHorizontal: moderateScale(20),
			}}>

			{/* like unlike */}
			<TouchableOpacity
				onPress={() => {
					handelLike(item?.post_id);
				}}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>

				<FastImage
					source={item?.is_liked === false ? require('../image/like.png') : require('../image/ThumbsUp.png')}
					style={{
						height: moderateScale(25),
						width: moderateScale(25),
					}}
					resizeMode={FastImage.resizeMode.contain}
				/>

				<Text
					style={{
						fontSize: moderateScale(14),
						fontFamily: 'AvenirMedium',
						color: '#000',
						marginLeft: moderateScale(5),
					}}>
					{item?.likes_count}
				</Text>
			</TouchableOpacity>

			{/* bootom row like comment share */}
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
				}}>

				{/* comment */}
				<TouchableOpacity
					onPress={() => {
						onOpen();
					}}
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
						{item?.comment_count}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginRight: moderateScale(10),
					}}
					onPress={() => {
						console.log('Press::::::::: item', item);
						shareContent(item);
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
						{item?.shares}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
